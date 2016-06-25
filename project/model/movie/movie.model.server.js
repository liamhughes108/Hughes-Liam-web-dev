module.exports = function () {

    var mongoose = require("mongoose");
    var MovieSchema = require("./movie.schema.server")();
    var Movie = mongoose.model("Movie", MovieSchema);

    var api = {
        findMoviesByList: findMoviesByList,
        deleteMovie: deleteMovie
    };
    return api;

    function findMoviesByList(lid) {
        return Movie.find({_list: lid});
    }

    function deleteMovie(mid) {
        return Movie.remove({_id: mid});
    }
};