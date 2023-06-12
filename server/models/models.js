const Sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = Sequelize.define(
    'user',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        username: {type: DataTypes.STRING, allowNull: false, unique: true},
        name: {type: DataTypes.STRING, allowNull: true},
        surname: {type: DataTypes.STRING, allowNull: true},
        password: {type: DataTypes.STRING, allowNull: false},
        roles: {type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false, defaultValue: ['user']},
        saved_articles: {type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: true, defaultValue: []},
        is_banned: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    },
    {
        paranoid: true,
    }
)

const Token = Sequelize.define('token', {
    token: {type: DataTypes.TEXT}
})

const Article = Sequelize.define('article', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    tag: {type: DataTypes.STRING, allowNull: false},
    preview: {type: DataTypes.TEXT, allowNull: false},
    titles: {type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false},
    paragraphs: {type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: false},
    pictures: {type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: true},
    sources: {type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: true},
    views: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0}
})

const Email = Sequelize.define('email', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, allowNull: true, unique: true},
})

const Comment = Sequelize.define('comment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.TEXT, allowNull: false}
})

User.hasOne(Token, {
    as: 'user_token',
    foreignKey: {
        name: 'user_id',
        allowNull: false,
    }
})
Token.belongsTo(User, {
    as: 'user_token',
    foreignKey: {
        name: 'user_id',
        allowNull: false,
    }
})

Article.belongsTo(User, {
    foreignKey: {
        name: 'author_id',
        allowNull: false,
    }
})

Article.hasMany(Comment, {
    foreignKey: {
        name: 'article_id',
        allowNull: false,
    }
})

Comment.belongsTo(Article, {foreignKey: {
    name: 'article_id',
    allowNull: false,
}})

User.hasMany(Comment, {
    foreignKey: {
        name: 'user_id',
        allowNull: false,
    }
})

Comment.belongsTo(User, {foreignKey: {
    name: 'user_id',
    allowNull: false
}})

User.belongsTo(Email, {foreignKey: {
    name: 'email_id',
    allowNull: true,
    unique: true
}})


module.exports = {
    User,
    Token,
    Article,
    Email,
    Comment
}
