<template>
    <div class = "article-control">
      <save-button v-if = "isLogin && !isBanned" :isActive = "isSave" @click="Save" title="Сохранить"></save-button>
      <edit-article-button v-if = "isLogin && !isBanned && (permission.canEditArticles || author_id === user_id)" title="Редактировать" @click="Edit"></edit-article-button>
      <cover-button v-if = "isFoldable" :isUncover = "isHidden" @click="Cover()" title="Свернуть/развернуть"/>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'

export default {
    name: 'article-control',
    props: {
        isSave: {
            type: Boolean
        },
        isHidden: {
            type: Boolean
        },
        isFoldable: {
            type: Boolean
        },
        author_id:{
            type: Number
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
        permission: state => state.permission,
        isLogin: state => state.user.isLogin,
        user_id: state => state.user.body.id,
        isBanned: state => state.user.body.is_banned,
        colors: state => state.settings.colors
      }),
      ...mapGetters({
        isHavePermission: 'user/IsHavePermission'
      })
    },
    methods:{
        ...mapMutations({
            setArticleEdit: 'setArticleEdit'
        }),
        ...mapActions({
            
        }),
        async Save(){
            this.$emit('SaveArticle', this.isSave)
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
        },
        async Cover(){
            this.$emit('CoverArticle', this.isHidden)
        }
    }
}
</script>

<style scoped>
    .article-control{
        display: inline-flex;
        justify-content: space-between;
    }
</style>