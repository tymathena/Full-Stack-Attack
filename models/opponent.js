module.exports = function (sequelize, DataTypes) {

    var Opponent = sequelize.define("Post", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ap: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dp: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: DataTypes.string,
            allowNull: false
        },
        description: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Opponent;
};