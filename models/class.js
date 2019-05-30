module.exports = function (sequelize, DataTypes) {

    const Class = sequelize.define("Class", {
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "oh dear"
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        ap: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        dp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
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
        }
    });
    Class.associate = function (models) {

        Class.hasMany(models.User, {});

    };

        return Class;
    };
