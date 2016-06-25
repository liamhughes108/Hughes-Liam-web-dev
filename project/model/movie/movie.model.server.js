module.exports = function () {

    var mongoose = require("mongoose");
    var MovieSchema = require("./movie.schema.server")();
    var Movie = mongoose.model("Movie", MovieSchema);

    var api = {
        createMovie: createMovie,
        findMoviesByList: findMoviesByList,
        deleteMovie: deleteMovie
    };
    return api;

    function createMovie(lid, movie) {
        movie._list = lid;
        return Movie.create(movie);
    }

    function findMoviesByList(lid) {
        return Movie.find({_list: lid});
    }

    function deleteMovie(mid) {
        return Movie.remove({_id: mid});
    }
};