module.exports = function (sequelize, DataTypes) {

    const User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 16]
            },
            defaultValue: "name"
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 16]
            },
            defaultValue: "pw"
        },
        commits: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        lives: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 5
        }
    });
    User.associate = function(models) {
        User.belongsTo(models.Class, {
            foreignKey: {
                allowNull: false, 
                defaultValue: 1
            }
        });
    };    
    return User;
};