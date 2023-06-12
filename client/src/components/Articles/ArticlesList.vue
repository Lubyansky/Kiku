<template>
  <div class = "article__search">
    <h4 class = "article__search-title">Введите название или описание статьи для поиска</h4>
    <site-input type="text" :value = "query" @input = "$emit('search', $event.target.value)"/>
  </div>
  <div class = "container__loader" v-if = "loading && !articles.length">
    <div class = "loader"></div>
  </div>
  <div class = "articles__container" v-else-if="articles.length">
    <div class = "articles__content">
      <div class = "article" v-for="article in articles" :key="article">
        <article-item :article = "article"/>
      </div>
    </div>
    <cover-all-button @click="CoverAll" :isCoverAll="isHidden" />
  </div>
  <div v-else class = "no_articles">Статьи не найдены</div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
    name: 'articles-list',
    emits: [
        'search'
    ],
    props:{
        articles: {
            type: Array
        },
        query: {
            type: String
        },
        loading: {
            type: Boolean
        }
    },
    data(){
      return{}
    },
    computed:{
      ...mapState({
        isHidden: state => state.articles.isHidden
      })
    },
    methods: {
      ...mapMutations({
        setIsHidden: 'setIsHidden'
      }),
      async CoverAll(){
        if(this.isHidden){
          this.articles.forEach(article => {
            article.isHidden = false
          })
          this.setIsHidden(false)
        }
        else{
          this.articles.forEach(article => {
            article.isHidden = true
          })
          this.setIsHidden(true)
        }
      }
    }
}
</script>

<style scoped>
    .article__search{
        width: 100%;
        padding-left: 42px;
        padding-right: 42px;
        margin-bottom: 42px;
    }
    .article__search-title{
        margin-bottom: 10px;
        text-align: center;
    }
    .no_articles{
        font-size: 24px;
        text-align: center;
        padding-top: 80px;
        padding-bottom: 120px;
    }
    .articles__container{
      padding-left: 42px;
      padding-right: 17px;
      padding-bottom: 80px;
      position: relative;
      display: inline-flex;
      justify-content: center;
    }
    .articles__content{
        max-width: 942px;
        width: 100%;
        max-height: 100%;
    }
    .article{
        width: 100%;
        position: relative;
        padding-bottom: 132px;

        transition: color 0.3s;
    }
    .article::after{
        position: absolute;
        content: "";
        width: 100%;
        height: 1px;
        top: calc(100% + -70px);
        background-color: #000000;
    }

    .uncover_all{
      margin-top: 1px;
    }

    @media(max-width: 640px){

      .articles__container{
        padding-left: 15px;
        padding-right: 0px;
        padding-bottom: 50px;
      }

       .article__search{
        padding-left: 15px;
        padding-right: 15px;
      }
    }
    @media(max-width: 568px){
        .article{
          width: 100%;
          position: relative;
          padding-bottom: 92px;

          transition: color 0.3s;
      }
      .article::after{
          position: absolute;
          content: "";
          width: 100%;
          height: 1px;
          top: calc(100% + -55px);
          background-color: #000000;
      }
    }
</style>