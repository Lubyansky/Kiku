class savedArticlesService {

    changeSavedArticles(user, article_id){
        const saved_articles = user.saved_articles

        if(saved_articles.includes(article_id)){
             saved_articles.splice(saved_articles.findIndex(i => i === article_id), 1)
        }
        else{
            saved_articles.push(article_id)
        }
        return saved_articles
    }
    
    /*async getSavedArticles(user_id){
        const user = await db.query(`SELECT fk_saved_articles_id
                FROM public."Users"
                WHERE user_id = $1`, [user_id])
        const saved_articles = user.rows[0].fk_saved_articles_id
        var query = `SELECT * FROM public."Articles" WHERE `
        if(saved_articles && saved_articles.length > 0){
            var tempQuery = ``
            saved_articles.forEach(id =>{
                if(tempQuery){
                    tempQuery += ` OR `
                }
                tempQuery += `article_id = ${id}`
            })
            query += tempQuery
        }
        else query += 'NULL'
        query += ` ORDER BY tag;`
        var articles = await db.query(query)
        articles = await commentsService.attachComments(articles, true)
        return articles.rows
    }*/
}

module.exports = new savedArticlesService();