<template>
    <h1 class = "article__title">{{title}}{{title && description ? ':' : ''}}<br>{{description}}</h1>
    <div class = "article__paragraph" v-for = "item in content" :key="item">
        <h2 v-if="item.title" class = "paragraph__title">{{item.title}}</h2>
        <div class = "paragraph__text" v-for = "paragraph in item.paragraphs" :key="paragraph">
          <br><p>{{paragraph.body}}</p>
        </div>
        <div class = "article__picture" v-if="item.picture.url">
            <img class = "article__picture-image" :src="item.picture.url" alt = "Изображение">
            <div class = "picture-image__signature">{{item.picture.desc}}</div>
            <div class = "picture-image__copyright">{{item.picture.copyright}}</div>
        </div>
    </div>
</template>
  
<script>
import {mapState} from 'vuex'

export default {
    name: 'article-content',
    props: {
        title: {
            type: String
        },
        description: {
            type: String
        },
        content: {
            type: Array
        }
    },
    computed: {
      ...mapState({
        colors: state => state.settings.colors
      }),
    }
}
</script>
  
<style scoped>

    .article__title{
        padding-top: 50px;
        padding-bottom: 24px;
        margin-left: auto;
        margin-right: auto;

        max-width: 660px;

        font-family: Alice;
        font-style: normal;
        font-weight: normal;
        font-size: 50px;
        line-height: 57px;
        text-align: center;

        color: #000000;
    }

    .article__paragraph{
        margin-left: auto;
        margin-right: auto;
        padding-top: 22.5px;
        padding-bottom: 22.5px;
        max-width: 660px;
    }

    .paragraph__title{
        padding-bottom: 5px;

        font-family: Alice;
        font-style: normal;
        font-weight: normal;
        font-size: 26px;
        line-height: 30px;

        text-align: left;

        color: #000000;
    }
    .paragraph__text{

        width: 100%;
        height: 100%;

        font-size: 18px;
        line-height: 21px;
        text-align: justify;
    }

    .article__picture{
        margin-left: auto;
        margin-right: auto;
        max-width: 660px;
    }

    .article__picture-image{
        margin-top: 40px;
        width: 100%;
        height: 100%;
        max-height: 100vh;

        background-position:center;
        background-size: cover;
        background-repeat: no-repeat;

        outline: 2px solid #A5A5A5;
        box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.25);
    }
    .picture-image__signature{
        padding-top: 10px;
        font-size: 13px;
        line-height: 15px;
    }

    .picture-image__copyright{
        position: relative;
        padding-top: 3px;
        padding-bottom: 5px;
        font-size: 13px;
        line-height: 15px;
        color: #A5A5A5;
    }

    .picture-image__copyright::after{
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        top: 23px;
        left:0;
        background-color: #A5A5A5;
    }

    @media (max-width: 992px){
        .article__title{
            margin-left: auto;
            margin-right: auto;
        
            font-family: Alice;
            font-style: normal;
            font-weight: normal;
            text-align: center;
        
            color: #000000;
        }

        .article__paragraph{
            padding-top: 15px;
            padding-bottom: 15px;
            padding-left: 15px;
            padding-right: 15px;
        }

        .paragraph__title{
            padding-bottom: 12px;
        
            font-family: Alice;
            font-style: normal;
            font-weight: normal;
            font-size: 20px;
            line-height: 23px;
        
            text-align: left;
        
            color: #000000;
        }
        .paragraph__text{
    
            font-size: 16px;
            line-height: 18px;
        }
        
        .article__picture{
            padding-top: 30px;
            padding-bottom:15px;
            padding-left: 15px;
            padding-right: 15px;
        
            margin-left: auto;
            margin-right: auto;
            max-width: 660px;
        }
        
        .article__picture-image{
            width: calc(100vw - 32px);
            height: 100%;

            background-position:center;
            background-size: cover;
            background-repeat: no-repeat;
        
            outline: 2px solid #A5A5A5;
        }
        .picture-image__signature{
            padding-top: 5px;
            font-size: 12px;
            line-height: 14px;
            text-align: center;
        }
        
        .picture-image__copyright{
            position: relative;
            padding-top: 3px;
            padding-bottom: 5px;
            font-size: 12px;
            line-height: 14px;
            text-align: center;
        }
        
        .picture-image__copyright::after{
            content: "";
            position: absolute;
            width: 100%;
            height: 1px;
            top: 23px;
            left:0;
            background-color: #A5A5A5;
        }
    }

    @media (max-width: 768px){
      .article__title{
        max-width: 360px;

        font-size: 34px;
        line-height: 35px;
      }
    }

    @media (max-width: 576px){
      .article__title{
        font-size: 27px;
        line-height: 31px;
      }
    }
</style>