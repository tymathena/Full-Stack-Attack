var db = require("../models");
const path = require("path")

let currentUserInfo;

module.exports = function (app) {

    //POST route to create a new user
    app.post("/api/user", function (req, res) {
        console.log("adding this user:", req.body);
        db.User.create(req.body)
            .then(function (dbUser) {
                res.json(dbUser);
            });
    });


    // GET route to see if the person logging in is a user already or not
    app.get("/api/user/:id", function (req, res) {
        console.log("gets a current user", req.body)
        db.User.findOne({
            where: {
                id: req.params.id,
            }
        }).then(function (user) {
            res.json(user);
        })
    });

    // PUT route to set currentUserInfo variable on the back end to use in currentUser get route below
    app.put("/api/currentUser", function (req, res) {
        // FIXME this only works for one user at a time, multiple browser tab will fail
        console.log('setting the current user', req.body);
        currentUserInfo = req.body;
        res.json({
            status: true,
            message: "Update success!"
        })
    });

    // GET route to get the currentUserInfo and send correct user and class that were picked to the dom
    app.get("/api/currentUser", function (req, res) {
        // FIXME this only works for one user at a time, multiple browser tab will fail
        db.User.findOne({
            where: {
                id: currentUserInfo.userId,
            }
        }).then(function (userData) {
            db.Class.findOne({
                where: {
                    id: currentUserInfo.classId,
                }
            }).then(function (classData) {
                // merge the user data and class data so that the game can play
                res.json({
                    // take from user info
                    id: userData.dataValues.id,
                    name: userData.dataValues.name,
                    commits: userData.dataValues.commits,
                    lives: userData.dataValues.lives,
                    special: userData.dataValues.special,

                    // take from class info
                    classId: classData.dataValues.id,
                    role: classData.dataValues.role,
                    hp: classData.dataValues.hp,
                    ap: classData.dataValues.ap,
                    dp: classData.dataValues.dp,
                    image: classData.dataValues.image,
                    description: classData.dataValues.description,
                    attackImage: classData.dataValues.attackImage,
                });
            })
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

    // GET route to generate classes at start page
    app.get("/api/class/", function (req, res) {
        console.log("gets a class:" + req.body)
        db.Class.findAll()
            .then(function (userClass) {
                res.json(userClass);
            })
    });
}
