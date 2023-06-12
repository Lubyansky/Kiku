<template >
    <div class = "license">
      <div class = "container__loader" v-if = "loading" style = "padding-top: 180px; padding-bottom:240px">
        <div class = "loader"></div>
      </div>
      <div class = "license__container" v-else>
        <!--h1 class = "license__title">Пользовательское соглашение и правила использования веб-сайта {{name}} в&nbsp;сети&nbsp;интернет</h1-->
        <article-content 
            :title="null" 
            :description="fullname" 
            :content="content"
        />
      </div>
    </div>
</template>
  
<script>
import {mapState} from 'vuex'

export default {
    data(){
        return{
            loading: true,
            content: ""
        }
    },
    computed:{
        ...mapState({
            colors: state => state.settings.colors,
            name: state => state.settings.name,
        }),
        fullname: function () {
            return 'Пользовательское соглашение и правила использования веб\u2011сайта ' + this.name + ' в\u00A0сети\u00A0интернет'
        }
    },
    async mounted(){
        
        this.loading = false
    }
}
</script>
  
<style>
    .license{
        margin-top:80px;
        background-color: v-bind("colors.complementary ? colors.complementary : '#FFF6F6'");
        height: 100%;
    }
    .license__container{
        max-width: 1020px;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;

        background-color: v-bind("colors.background? colors.background: '#FFFFFF'");

        padding-bottom: 140px;
    }
    .license__title{
        max-width: 660px;
        padding-top:60px;
        padding-bottom:60px;
        font-style: normal;
        font-weight: normal;
        font-size: 32px;
        line-height: 34px;
        text-align: center;
    }  
</style>