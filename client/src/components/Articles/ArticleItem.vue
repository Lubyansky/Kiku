<template>
    <article-item-content 
        :href = "'/articles/' + article.info.article_id"
        :isHidden = "article.isHidden"
        :article ="{info: article.info, content: article.content, sources: article.sources}"
    />
    <article-control class = "control__position"
        @SaveArticle = "Save" 
        @CoverArticle = "Cover"

        :isSave = "article.isSave"
        :isHidden = "article.isHidden"
        :isFoldable = "true"
        :author_id = "article.author.author_id"
        :article ="{info: article.info, content: article.content, sources: article.sources}"
    />
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: 'article-item',
    props: {
        article: {
            type: Object
        }
    },
    data(){
        return{
            canEditArticles: false
        }
    },
    methods:{
        ...mapActions({
            DeleteSavedArticle: 'user/DeleteSavedArticle',
            SaveArticle: 'user/SaveArticle'
        }),
        async Save(isSave){
            if(isSave){
                this.article.isSave = false
                this.DeleteSavedArticle(this.article.info.article_id)
            }
            else {
                this.article.isSave = true
                this.SaveArticle(this.article.info.article_id)
            }
        },
        async Cover(isHidden){
            if(isHidden){
                this.article.isHidden = false
            }
            else{
                this.article.isHidden = true
            }
        },
    }
}
</script>

<style scoped>

    .control__position{
        position: absolute;
        top: 0;
        right: 0;
    }

</style>