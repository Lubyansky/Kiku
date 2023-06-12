<template>
  <div class = "management" v-if = "(permission.canEditArticles || permission.canAddArticles) && !isBanned">
    <div class = "management__container">
      <h1 class = "management__title">Управление статьями</h1>
      <site-button class = "management__add-article" v-if = "permission.canAddArticles" @click = "AddArticle">Добавить статью</site-button>
      <articles-list :articles="articles" :query="query" :loading="loading" @search="ChangeQuery"/>
    </div>
  </div>
  <div class="observer" ref="observer"></div>
</template>

<script>
import articlesMixin from "@/mixins/articlesMixin"
import { mapActions, mapState } from 'vuex'

export default {
    mixins: [articlesMixin],
    data(){
        return {
            loading: false
        }
    },
    computed:{
        ...mapState({
            user_id: state => state.user.body.id,
            isBanned: state => state.user.body.is_banned,
            user_id: state => state.user.body.id,
            permission: state => state.permission,
            isLogin: state => state.user.isLogin,
            colors: state => state.settings.colors
        })
    },
    methods:{
        ...mapActions({
            GetArticlesToChange: 'user/GetArticlesToChange'
        }),
        async AddArticle(){
            this.$router.push({path: '/articles/change'})
        },
        /*async loadArticles(){
            this.loading = true
            this.GetArticlesToChange(this.user_id).then(value => {
                const dataArticles = value
                const articles = []

                dataArticles.rows.forEach(article =>{
                    this.Decrease(article).then(res => {
                        var _article = res
                        if(this.isHidden){
                            _article.isHidden = true
                        }
                        else _article.isHidden = false
                        _article.isHidden = true
                        articles.push(_article)
                    })
                })

                this.articles = this.temp_articles = articles
            }).finally(this.loading = false)
        }*/
    },
    async created(){
        if(!(this.permission.canEditArticles || this.permission.canAddArticles) || this.isBanned){
            this.$router.push('/')
        }
        this.resource = "/users/" + this.user_id + "/articles/change"
        await this.loadArticles()
        window.scrollTo(0, 0)
    },
    /*async mounted(){
        if(this.isLogin){
            this.loadArticles()
        }
    }*/
}
</script>

<style scoped>
    .management{
        margin-top:80px;
        background-color: v-bind("colors.complementary ? colors.complementary : '#FFF6F6'");
        height: 100%;
    }

    .management__container{
        max-width: 1020px;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        height: 100%;

        display: flex;
        align-items: center;
        flex-flow: column;

        background-color: v-bind("colors.background? colors.background: '#FFFFFF'");
    }

    .management__title{
        margin-left: auto;
        margin-right: auto;
        margin-top: 66px;
        margin-bottom: 65px;
        font-size: 32px;
        text-align: center;
    }

    .management__add-article{
        margin-bottom: 65px;
    }
</style>