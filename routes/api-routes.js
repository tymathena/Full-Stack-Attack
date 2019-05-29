
var db = require("../models");

///GET to Users to findOne character from your username/password if using your 

//GET to opponent findOne for opponent

//POST to user to create a player


//


module.exports = function (app) {

    app.post("/api/user", function (req, res) {
        console.log("post for new user creation" + req.body);
        db.User.create(req.body)
            .then(function (dbUser) {
                res.json(dbUser);
            });
    });
//
    app.get("/api/users/", function (req, res) {
        console.log("gets a user" + req.body)
        db.User.findOne({
            where: {
                name: req.body.name,
                password: req.body.password
            }
        }).then(function (user) {
            res.json(user);
        })

    });
//
    app.get("/api/opponent/", function (req, res) {
        console.log("gets an opponent");
        db.Opponent.findAll({})
        .then(function (dbOpp) {
            res.json(dbOpp);
        })

    });
}
