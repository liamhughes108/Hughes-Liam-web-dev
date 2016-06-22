var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function (app, models) {

    var userModel = models.userModel;

    app.post('/api/login', passport.authenticate('wam'), login);
    app.post('/api/logout', logout);
    app.post('/api/register', register);
    app.post("/api/user", createUser);
    app.get('/api/loggedin', loggedin);
    app.get("/api/user", getUsers);
    app.get("/api/user?username=username", findUserByUsername);
    app.get("/api/user?username=username&password=password", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", authenticate, deleteUser);

    passport.use('wam', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function authenticate(req, res, next) {
        console.log(req.user);
        console.log(req.isAuthenticated());
        if (req.isAuthenticated()) {
            next();
        } else {
            res.send(403);
        }
    }

    function login(req, res) {
        var user = req.user;
        console.log(user);
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res) {
        if (req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    function register(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user) {
                        res.status(400).send("Username already exists");
                        return;
                    } else {
                        req.body.password = bcrypt.hashSync(password);
                        return userModel
                            .createUser(req.body);
                    }
                    console.log(user);
                    res.send(200);
                },
                function (error) {
                    res.status(400).send(error);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                console.log(user);
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (error) {
                    res.status(400).send(error);
                }
            )
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function localStrategy(username, password, done) {
        console.log(username);

        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    console.log(user);
                    if (user && bcrypt.compareSync(password, user.password)) {
                        console.log("user");
                        console.log(done);
                        done(null, user);
                    } else {
                        console.log("false");
                        done(null, false);
                    }
                },
                function (err) {
                    console.log(err);
                    if (err) {
                        done(err);
                    }
                }
            );
    }

    function createUser(req, res) {
        var newUser = req.body;

        userModel
            .createUser(newUser)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.status(400).send("Username " + newUser.username + " is already in use");
                }
            );
    }

    function getUsers(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];
        if (username && password) {
            findUserByCredentials(username, password, res);
        } else if (username) {
            findUserByUsername(username, res);
        } else {
            res.send(users);
        }
    }

    function findUserById(req, res) {
        var userId = req.params.userId;

        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    res.send(user);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.status(403).send("User not found");
                }
            );
    }

    function findUserByCredentials(username, password, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.status(403).send("Unable to login");
                }
            );
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;

        userModel
            .updateUser(id, newUser)
            .then(
                function (user) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to update user with ID: " + id);
                }
            );
    }

    function deleteUser(req, res) {
        var id = req.params.userId;

        userModel
            .deleteUser(id)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to remove user with ID: " + id);
                }
            );
    }
}