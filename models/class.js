module.exports = function (sequelize, DataTypes) {

    const Class = sequelize.define("Class", {
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
    Class.associate = function (models) {

        Class.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

        return Class;
    };
