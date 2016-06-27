var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function (app, models) {

    var pUserModel = models.pUserModel;

    app.post('/api/p/login', passport.authenticate('wam'), login);
    app.post('/api/p/logout', logout);
    app.post('/api/p/register', register);
    app.post("/api/p/puser", createUser);
    app.get('/api/p/loggedin', loggedin);
    app.get("/api/p/puser", getUsers);
    app.get("/api/p/puser/:userId", findUserById);
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/project/index.html#/user',
            failureRedirect: '/project/index.html#/login'
        }));
    app.put("/api/p/puser/:userId", updateUser);
    app.put("/api/p/puser/:uid/friend/:fid/add", addFriend);
    app.put("/api/p/puser/:uid/friend/:fid/delete", deleteFriend);
    app.delete("/api/p/puser/:userId", authenticate, deleteUser);

    passport.use('wam', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID + '',
        clientSecret : process.env.GOOGLE_CLIENT_SECRET + '',
        callbackURL  : process.env.GOOGLE_CALLBACK_URL + ''
    };

    passport.use('google', new GoogleStrategy(googleConfig, googleStrategy));

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

        pUserModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user) {
                        console.log(user);
                        res.status(400).send("Username already exists");
                        return;
                    } else {
                        req.body.password = bcrypt.hashSync(password);
                        return pUserModel
                            .createUser(req.body);
                    }
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
        pUserModel
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

        pUserModel
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

    function googleStrategy(token, refreshToken, profile, done) {
        pUserModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return pUserModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function createUser(req, res) {
        var newUser = req.body;

        pUserModel
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

        pUserModel
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
        pUserModel
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
        pUserModel
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

        pUserModel
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

        pUserModel
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

    function addFriend(req, res) {
        var uid = req.params.uid;
        var fid = req.params.fid;
        var username = req.query["username"];
        
        pUserModel
            .addFriend(uid, fid, username)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to add Friend");
                }
            );
    }

    function deleteFriend(req, res) {
        var uid = req.params.uid;
        var fid = req.params.fid;

        pUserModel
            .deleteFriend(uid, fid)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to delete Friend");
                }
            );
    }
};