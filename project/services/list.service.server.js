module.exports = function (app, models) {

    var listModel = models.listModel;

    app.get('/api/user/:uid/list', findMyListsByUser);
    app.get('/api/list/:lid', findListById);
    app.get('/api/user/:uid/list/shared', findSharedListsByUser)
    app.put('/api/list/:lid', updateList);
    app.put('/api/list/:lid/share', shareList);
    app.put('/api/list/:lid/unshare', unshareList);
    app.post('/api/user/:uid/list', createList);
    app.delete('/api/list/:lid', deleteList);

    function findMyListsByUser(req, res) {
        var uid = req.params.uid;
        
        listModel
            .findMyListsByUser(uid)
            .then(
                function (lists) {
                    res.json(lists);
                },
                function (error) {
                    res.status(404).send(error);
                }
            );
    }

    function findListById(req, res) {
        var lid = req.params.lid;

        listModel
            .findListById(lid)
            .then(
                function (list) {
                    res.json(list);
                },
                function (error) {
                    res.status(404).send(error);
                }
            );
    }

    function findSharedListsByUser(req, res) {
        var uid = req.params.uid;

        listModel
            .findSharedListsByUser(uid)
            .then(
                function (lists) {
                    res.json(lists);
                },
                function (error) {
                    res.status(404).send(error);
                }
            );
    }

    function updateList(req, res) {
        var lid = req.params.lid;
        var newList = req.body;

        listModel
            .updateList(lid, newList)
            .then(
                function (list) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to update list with ID: " + lid);
                }
            );
    }

    function createList(req, res) {
        var uid = req.params.uid;
        var newList = req.body;
        
        listModel
            .createList(uid, newList)
            .then(
                function (list) {
                    res.json(list);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function deleteList(req, res) {
        var lid = req.params.lid;

        listModel
            .deleteList(lid)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to remove list with ID: " + lid);
                }
            );
    }
    
    function shareList(req, res) {
        var lid = req.params.lid;
        
        listModel
            .shareList(lid)
            .then(
                function (list) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to share list with ID: " + lid);
                }
            );
    }

    function unshareList(req, res) {
        var lid = req.params.lid;

        listModel
            .unshareList(lid)
            .then(
                function (list) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to unshare list with ID: " + lid);
                }
            );
    }
};