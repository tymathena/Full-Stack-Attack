module.exports = function (sequelize, DataTypes) {

    const CurrentUser = sequelize.define("CurrentUser", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 16]
            },
            defaultValue: "name"
        },
        commits: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        lives: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "oh dear"
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 100
        },
        ap: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 7
        },
        dp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 5
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "oh dear"
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "oh dear"
        },
        attackImage: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "oh dear"
        }
    });
    return CurrentUser;
};