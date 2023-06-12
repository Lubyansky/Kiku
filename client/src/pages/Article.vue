<template>
  <div class = "article" v-cloak>
    <div class = "container__loader" v-if = "loading" style = "padding-top: 180px; padding-bottom:240px">
      <div class = "loader"></div>
    </div>
    <div class = "article__content" v-else-if = "isLoad">
      <div class = "article__info">
        <div class = "info__info">
          <site-views>{{article.info.views}}</site-views>
          <article-control 
            @SaveArticle = "Save" 

            :isSave = "isSave"
            :isFoldable = "false"
            :author_id = "article.author.author_id"
            :article ="{info: article.info, content: article.content, sources: article.sources}"
          />
        </div>
        <div class = "info__article">
          {{article.info.date_of_creation}} · {{tag}}
        </div>
        <div class = "info__author">
          <div>Автор: <a :href="'/profile/' + article.author.author_id" title = "Перейти в профиль" >{{article.author.name?article.author.name:article.author.username}} {{article.author.surname&&article.author.name?article.author.surname:''}}</a></div>
        </div>
      </div>
      <article-content 
        :title="article.info.title" 
        :description="article.info.description" 
        :content="article.content"
      />
      <article-sources :sources="article.sources"/>
			<article-share/>
      <comments-list 
        :article_id = "article.info.article_id" 
        :author_id = "article.author.author_id"
        :comments = "comments"
      />
    </div>
    <div class = "article__content_none" v-else>Статья не найдена</div>
    <div class="observer" ref="observer"></div>
  </div>
</template>

<script>
import axios from "axios"
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
import articleMixin from "@/mixins/articleMixin"
import commentsMixin from "@/mixins/commentsMixin"

export default {
    mixins: [articleMixin, commentsMixin],
    data(){
      return{
          article: null,
          loading: true,
          isLoad: false,
          isSave: false
        }
    },
    computed: {
      ...mapState({
        tags: state => state.tags,
        URL: state => state.URL,
        saved_articles: state => state.user.body.saved_articles,
        isLogin: state => state.user.isLogin,
        colors: state => state.settings.colors
      }),
      ...mapGetters({
        isHavePermission: 'user/IsHavePermission'
      }),
      tag: function (){
        return this.tags.find(tag => tag.id === this.article.info.tag).title
      }
    },
    methods: {
      ...mapMutations({
        setArticleEdit: 'setArticleEdit'
      }),
      ...mapActions({
        DeleteSavedArticle: 'user/DeleteSavedArticle',
        SaveArticle: 'user/SaveArticle',
      }),
      async Save(isSave){
        if(isSave){
          this.isSave = false
          this.DeleteSavedArticle(this.article.info.article_id)
        }
        else {
          this.isSave = true
          this.SaveArticle(this.article.info.article_id)
        }
      },
      async Edit(){
        this.setArticleEdit({
          article: {
            info: this.article.info,
            content: this.article.content,  
            sources: this.article.sources
          },
          isEdit: true
        })
        this.$router.push({name: 'article_editing'})
      }
    },
    async created() {
      this.loading = true
      const article_url = (this.URL.API + "/articles/" + this.$route.params.id)
      await axios.get(article_url, { withCredentials: true }).then(res => {
        this.Decrease(res.data).then(res =>{
          console.log(res)
          this.article = res
        })
        .catch(e => console.log(e))
        this.isLoad = true
      })
      .catch(
        e => console.log(e)
      )
      .finally(e => {
          this.loading = false
      })
  
      if(!this.article){
        return
      }
      this.isLoad = true

      if(this.isLogin && this.saved_articles && this.saved_articles.includes(this.article.info.article_id)){
        this.isSave = true
      }
      else{
         this.isSave = false
      }
      await this.loadComments()
    }
}
</script>

<style>
    a{
      text-decoration: none;
      color:#000000;
    } 
    .article{
        background-color: v-bind("colors.complementary ? colors.complementary : '#FFF6F6'");
    }
    .article__content{
        max-width: 1020px;
        padding-top:80px;
        margin-left: auto;
        margin-right: auto;
        padding-bottom: 105px;

        width: 100%;
        height: 100%;

        background-color: v-bind("colors.background? colors.background: '#FFFFFF'");
    }

    .article__content_none{
        font-size: 32px;
        text-align: center;
        padding-top: 180px;
        padding-bottom:240px
    }

    .article__info{
        margin-top: 80px;
        margin-left: auto;
        margin-right: auto;

        display: flex;
        justify-content: center;
        flex-flow: column;

        position: relative;

        border-top: solid 1px #000000;
        border-bottom: solid 1px #000000;
    }

    .info__info{
        padding-top:15px;
        padding-left: 15px;
        padding-right: 15px;
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
    }

    .info__article{
        padding-top: 44px;
        padding-left: 15px;
        padding-right: 15px;
        font-size: 32px;
        line-height: 37px;
        text-align: center;
        color: #232323;
    }

    .info__author{
        padding-top: 44px;
        padding-bottom: 56px;
        font-size: 26px;
        line-height: 30px;
        text-align: center;
        text-decoration: none;
        color: #232323;
    }

    @media (max-width: 992px){
        .article{
            background-color: v-bind("colors.complementary ? colors.complementary : '#FFF6F6'");
        }
    }

    @media (max-width: 768px){
        .info__article{
            padding-top: 22px;
            font-size: 22px;
            line-height: 25px;
            text-align: center;
            color: #000000;
        }
        
        .info__author{
            padding-top: 19px;
            padding-bottom: 33px;
            font-size: 18px;
            line-height: 21px;
            text-align: center;
            color: #000000;
        }
             
    }

</style>