module.exports = function (sequelize, DataTypes) {

    var Class = sequelize.define("Post", {
        role: {
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
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Class;
};
