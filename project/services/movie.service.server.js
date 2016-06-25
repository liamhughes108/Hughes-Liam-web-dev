module.exports = function (app, models) {

    var movieModel = models.movieModel;

    app.post('/api/list/:lid/movie', createMovie)
    app.get('/api/list/:lid/movie', findMoviesByList);
    app.delete('/api/movie/:mid', deleteMovie);

    function createMovie(req, res) {
        var lid = req.params.lid;
        var newMovie = req.body;

        movieModel
            .createMovie(lid, newMovie)
            .then(
                function (movie) {
                    res.json(movie);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }
    
    function findMoviesByList(req, res) {
        var lid = req.params.lid;

        movieModel
            .findMoviesByList(lid)
            .then(
                function (movies) {
                    res.json(movies);
                },
                function (error) {
                    res.status(404).send(error);
                }
            );
    }

    function deleteMovie(req, res) {
        var mid = req.params.mid;

        movieModel
            .deleteMovie(mid)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to remove movie with ID: " + mid);
                }
            );
    }
};