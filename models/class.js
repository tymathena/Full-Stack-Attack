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
    Class.associate = function (models) {

        Class.hasMany(models.User, {});

    };

        return Class;
    };
