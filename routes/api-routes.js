
var db = require("../models");
const path = require("path")

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
    app.get("/api/user/:name", function (req, res) {
        console.log("gets a user" + req.body)
        db.User.findOne({
            where: {
                name: req.params.name,
            }
        }).then(function (user) {
            res.json(user);
        })
    });

    app.get("/api/user/:id", function (req, res) {
        console.log("gets a current user" + req.body)
        db.User.findOne({
            where: {
                id: req.params.id,
            }
        }).then(function (user) {
            res.json(user);
        })
    });
        // sets currentuser in current user table
    app.put("/api/currentUser/:id", function (req, res) {
        db.CurrentUser.update(
          req.body,
        {
          where: {
            id: req.params.id
          }
        }).then(function() {
          
          res.json({message: "Update success!"})
        }).catch(function(err) {
          res.json({error: err})
        })
      });

      app.get("/api/currentUser/:id", function (req, res) {
        console.log("gets a current user" + req.body)
        db.CurrentUser.findOne({
            where: {
                id: req.params.id,
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

    //route to snag player pictures
    app.get("/api/images/user/:pictureType", function (req, res) {
        
        const pictureAttribute = req.params.pictureType === "image" ? "image" : "attackImage";
        console.log(req.body);

        db.Class.findOne({
            where: {
                role: req.body.role
            }
        }).then(function (userClass) {
            console.log(userClass[pictureAttribute]);
            res.end(path.join(__dirname, userClass[pictureAttribute]));
        })

    })


    //route to snag opponent pictures
    app.get("/api/images/opponent/", function (req, res) {
        
        console.log(req.body);

        db.Opponent.findOne({
            where: {
                name: req.body.name
            }
        }).then(function (opp) {
            console.log(opp.image);
            res.end(path.join(__dirname, opp.image));
        })

    })
}
