<template>
    <site-views class = "article__info-views">Просмотры: {{views}}</site-views>
    <site-comments class="article__info-comments">Комментарии: {{comments}}</site-comments>
</template>

<script>
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'

export default {
  name: 'article-info',
    props: {
        views: {
            type: Number
        },
        comments: {
            type: Number
        }
    },
}
</script>

<style scoped>
    .article__info-views{
        margin-top:12px;
        width: 50%;
    }
    .article__info-comments{
        margin-top:12px;
        width: 50%;
    }

    @media(max-width: 1024px){
        .article__info-views{
            margin-top:0px;
            width: 50%;
        }
        .article__info-comments{
            margin-top:0px;
            width: 50%;
        }
    }

    @media(max-width: 576px){
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