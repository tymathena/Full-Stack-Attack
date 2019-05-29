module.exports = function (sequelize, DataTypes) {

    const User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 16]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 16]
            }
        },
        commits: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });
    User.associate = function(models) {
        User.hasMany(models.Class, {
        });
    };    
    return User;
};