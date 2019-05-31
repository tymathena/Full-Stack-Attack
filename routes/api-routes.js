
var db = require("../models");

module.exports = function (app) {
    //POST route to create a new user
    app.post("/api/user", function (req, res) {
        console.log("adding this user:" + req.body);
        db.User.create(req.body)
            .then(function (dbUser) {
                res.json(dbUser);
            });
    });

    //GET route to get a single user from DB
    app.get("/api/user/", function (req, res) {
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

    //GET route to get all opponents from database
    app.get("/api/opponent/", function (req, res) {
        console.log("gets an opponent");
        db.Opponent.findAll({})
            .then(function (dbOpp) {
                res.json(dbOpp);
            })

    });

    //UPDATE route if user wishes to update something 
    app.put("/api/user", function (req, res) {
        db.User.update({
            name: req.body.name,
            password: req.body.password,
            role: req.body.role
        }, {
                where: {
                    name: req.body.name,
                    password: req.body.password
                }
            })
            .then(function (dbUpdate) {
                res.json(dbUpdate);
            });
    });

    //DELETE route if we want to delete a user
    app.delete("/api/user/:id", function (req, res) {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(function (dbDelete) {
                res.json(dbDelete);
            });
    });

    app.get("/api/class/", function (req, res) {
        console.log("gets a class:" + req.body)
        db.Class.findAll()
        .then(function (userClass) {
            res.json(userClass);
        })
    });

}
