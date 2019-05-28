const db = require("../models");
const players = require("./players.json");
const opponents = require("./opponents.json");

db.sequelize.sync({ force: true }).then(function () {
    return db.Player.bulkCreate(players);
}).then(function () {
    return db.Opponent.bulkCreate(opponents);
}).then(function () {
    db.sequelize.close();
});