<template>
    <a v-if = "isHidden" class = "article__container_hidden link_black">
      <div class = "article-item__content_hidden">
        <h3 class = "article-item__title_hidden">{{article.info.title}}</h3>
        <div class = "article-item__desc_hidden">{{article.info.description}}</div>
      </div>
      <div class = "article-item__info_hidden">
        <site-views>{{article.info.views}}</site-views>
      </div>
    </a>
    <a v-else class = "article__container link_black">
      <img class = "article-item__picture" width="478" height="268" :src = "article.info.preview" alt="Изображение">
      <div class = "article-item__content">
        <h3 class = "article-item__title">{{article.info.title}}</h3>
        <div class = "article-item__desc">{{article.info.description}}</div>
      </div>
      <div class = "article-item__info">
        <div class = "article__info-tag">{{tags.find(tag => tag.id === article.info.tag).title}}</div>
        <site-views class = "article__info-views">Просмотры: {{article.info.views}}</site-views>
        <site-comments class="article__info-comments">Комментарии: {{article.info.comments_count}}</site-comments>
      </div>
    </a>
</template>

<script>
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'

export default {
    name: 'article-item-content',
    props: {
        isHidden: {
            type: Boolean
        },
        article: {
            type: Object
        }
    },
    data(){
        return{

        }
    },
    computed: {
      ...mapState({
        tags: state => state.tags,
        colors: state => state.settings.colors
      }),
      ...mapGetters({
        isHavePermission: 'user/IsHavePermission'
      })
    },
    methods:{
        ...mapMutations({
            
        }),
        ...mapActions({
            
        }),
    }
}
</script>

<style scoped>
    .article__container{
        display: grid;
        grid-template: 
                "picture . ." 23px
                "picture content content" auto
                "picture info info" 50px / 478px auto 91px;
    }

    .article__container_hidden{
        display: flex;
        flex-flow: column;
        align-items: center;
    }

    .article__container:hover{
        color: v-bind("colors.accent ? colors.accent: '#DCA600'");
        /*outline: 3px solid #DCA600;*/
    }

    .article__container_hidden:hover{
        color: v-bind("colors.accent ? colors.accent: '#DCA600'");
    }

    .article-item:hover .article-item__picture{
        outline-color: v-bind("colors.accent ? colors.accent: '#DCA600'");
    }

    .article-item__picture{
        grid-area: picture;
        width: 478px;
        height: 268px;

        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;

        outline: 2px solid #000000;
        box-shadow: 4px 2px 6px 2px rgba(0, 0, 0, 0.25);

        transition: all 0.3s;
    }
    .article-item__content{
        grid-area: content;
        padding-left:43px;
        max-width: 464px;
    }

    .article-item__content_hidden{
        max-width: calc(100% + -75px + -50px + -40px); /*вычитаем длину просмотров и длину блока управление, последние значение отступы*/
    }

    .article-item__title{
        font-size: 32px;
        line-height: 37px;

        color: v-bind("colors.main ? colors.main: '#8D0909'");
    }
    .article-item__title_hidden{
        font-size: 32px;
        line-height: 37px;
        text-align: center;
        color: v-bind("colors.main ? colors.main: '#8D0909'");
    }

    .article-item__desc{
        padding-top: 18px;
        font-size: 20px;
        line-height: 23px;
    }

    .article-item__desc:first-letter{
        text-transform: uppercase;
    }

    .article-item__desc_hidden{
        padding-top: 24px;
        font-size: 20px;
        line-height: 23px;
        text-align: center;
    }

    .article-item__desc_hidden:first-letter{
        text-transform: uppercase;
    }

    .article-item__info{
        grid-area: info;
        display: flex;
        flex-flow: wrap;
        justify-content: space-between;
        padding-left:43px;
        max-width: 464px;
        color:#A5A5A5;
    }

    .article-item__info_hidden{
        position: absolute;
        left: 0px;
        top:0px;
        width: 100%;
        display: inline;
        color: #000000;
    }

    .article__info-tag{
        width: 100%;
        color:v-bind("colors.accent ? colors.accent: '#DCA600'");
    }
    .article__info-views{
        margin-top:12px;
        width: 50%;
    }
    .article__info-comments{
        margin-top:12px;
        width: 50%;
    }

    @media(max-width: 1024px){
        .article__container{
            display: flex;
            flex-flow: column;
            align-items: center;
        } 
        .article-item__content{
            padding-left:0px;
            max-width: 100%;
        }
         .article-item__title{
            padding-top: 24px;
            text-align: center;
        }
        .article-item__desc{
            padding-top: 24px;
            text-align: center;
        }
        .article-item__info{
            padding-top: 24px;
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            padding-left:0px;
            max-width: 100%;
        }

        .article__info-tag{
            padding-bottom: 12px;
            width: 100%;
            text-align: center;
        }
        .article__info-views{
            margin-top:0px;
            width: 50%;
        }
        .article__info-comments{
            margin-top:0px;
            width: 50%;
        }
    }

    @media(max-width: 786px){
        .article__container{
            padding-top: 35px;
        }
    }

    @media(max-width: 576px){
        .article-item__content_hidden{
            margin-top: 50px;
            max-width: calc(100%);
        }

        .article-item__title{
            font-size: 24px;
            line-height: 26px;

            color: v-bind("colors.main ? colors.main: '#8D0909'");
        }
        .article-item__title_hidden{
            font-size: 24px;
            line-height: 26px;
            text-align: center;
            color: v-bind("colors.main ? colors.main: '#8D0909'");
        }
        .article__info-views{
            padding-bottom: 12px;
            width: 100%;
            justify-content: center;
        }
        .article__info-comments{
            width: 100%;
            justify-content: center;
        }
    }

</style>