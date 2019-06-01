const db = require("../models");
const users = require("./users.json");
const opponents = require("./opponents.json");
const classes = require("./classes.json");
const currentUser = require("./currentUser.json");
const FORCE = process.argv[2] === "true";

db.sequelize.sync({ force: true }).then(function () {
    return db.Class.bulkCreate(classes);
}).then(function () {
    return db.Opponent.bulkCreate(opponents);
}).then(function () {
    return db.User.bulkCreate(users);
}).then(function () {
    return db.CurrentUser.bulkCreate(currentUser);
}).then(function () {
    db.sequelize.close();
});