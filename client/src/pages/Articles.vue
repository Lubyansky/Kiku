<template>
	<div class = "articles">
    <div class = "articles__container" id="articles">
      <h1 class = "articles__title">Материалы</h1>
      <nav class = "articles__tags"> 
        <site-tag 
          v-for="(tag, index) in tags" 
          :key="tag.id" 
          :isPressed = "tag.isPressed"
          @click="tagPress(index, tag.id)"
        >
          {{tag.title}}
        </site-tag>
      </nav>
      <h5 style="margin-top:10px; text-align: center;">Нажмите на тег чтобы добавить/убрать сортировку по периоду (жёлтый тег — активный)</h5>
      <h2 class = "articles__found-articles">Найденые статьи</h2>
      <div class = "articles__list">
         <articles-list :articles="articles" :query="query" :loading="loading" @search="ChangeQuery"/>
         <div class="observer" ref="observer"></div>
      </div>
    </div>
	</div>
</template>

<script>
import articlesMixin from "@/mixins/articlesMixin"
import { mapState } from 'vuex';

export default {
    mixins: [articlesMixin],
    data(){
      return{
        tags: []
      }
    },
    computed:{
      ...mapState({
        Tags: state => state.tags,
        colors: state => state.settings.colors
      })
    },
    async created(){
      const tags = this.$route.query.tags
      this.tags = this.Tags
      this.tags.forEach(tag=>{
        if(tags && tags.includes(tag.id)){
          tag.isPressed = true
        }
        else{
          tag.isPressed = false
        }
      })
      await this.loadArticles()
    },
    methods: {
      async tagPress(index){
        this.currentPage = 1
        if(!this.tags[index].isPressed){
          this.tags[index].isPressed = true
        }
        else {
          this.tags[index].isPressed = false
        }
        this.updateURL()
      },
      updateURL(){
        const pushedTags = []
        this.tags.forEach(tag=>{
          if(tag.isPressed){
            pushedTags.push(tag.id)
          }
        })
        const query = { ...this.$route.query, tags: pushedTags };
        this.$router.replace({ query });
      }
    },
    watch: {
      tags(){
        const pushedTags = []
        this.tags.forEach(tag=>{
          if(tag.isPressed){
            pushedTags.push(tag.id)
          }
        })
        const query = { ...this.$route.query, tags: pushedTags };
        this.$router.replace({ query });
      }
    }
}

</script>

<style scopes>
    .articles{
        margin-top:80px;
        background-color: v-bind("colors.complementary ? colors.complementary : '#FFF6F6'");
        height: 100%;
    }
    .articles__container{
        max-width: 1020px;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        height: 100%;

        background-color: v-bind("colors.background? colors.background: '#FFFFFF'");
    }
    .articles__title{
        padding-top:60px;
        padding-bottom:60px;
        font-style: normal;
        font-weight: normal;
        font-size: 50px;
        line-height: 57px;
        text-align: center;
    }

    .articles__tags{
        max-height: 300px;
        position: relative;
        display: flex;
        overflow-y: auto;
        justify-content: center;
        flex-flow: wrap;
        padding: 20px 0px;
        border-top: solid 1px #000000;
        border-bottom: solid 1px #000000;
    }

    .articles__found-articles{
        padding-top:72px;
        padding-bottom:67px;
        font-style: normal;
        font-weight: normal;
        font-size: 38px;
        line-height: 48px;
        text-align: center;
    }

    .articles__list-container{
      width: 100%;
    }

    .container__loader{
        padding-bottom: 120px;
    }

    @media (max-width: 1082px) {
        .articles__container{
            background-color: v-bind("colors.complementary ? colors.complementary : '#FFF6F6'");
        }
    }

    @media (max-width: 992px){
        .articles__container{
            padding-left:15px;
            padding-right:15px;
        }
        .articles__title{
            padding-top:30px;
            padding-bottom:30px;
            font-size: 32px;
            line-height: 37px;
        }
        .articles__tags{
            max-width: 591px;
            margin-left: auto;
            margin-right: auto;
        }
        .articles__tags::before{
            top:-4px;
            width: 100vw;
        }
        
        .articles__tags::after{
            top:calc(100% + 4px);
            width: 100vw;
        }
        
        .tags__tag{
            margin-top:4px;
            margin-left: 3.5px;
            margin-right: 3.5px;
            margin-bottom:4px;
        
            width: 135px;
            height: 36px;
        
            font-size: 12px;
            line-height: 14px;
        }

        .articles__found-articles{
            padding-top:41px;
            padding-bottom:33px;
            font-size: 24px;
            line-height: 27px;
        }
    }

    @media (max-width: 576px){
      .articles__title {
        padding-top: 20px;
        padding-bottom: 20px;
      }
    }
</style>