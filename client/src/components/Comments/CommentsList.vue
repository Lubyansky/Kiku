<template>
  <div class = "article__comments">
    <comment-form 
      :article_id = "article_id" 
       @add = "AddComment" 
    />
    <div class = "article__comment" v-for = "(comment, index) in comments" :key="index">
      <comment-item 
        :comment = "comment" 
        :index = "index"
        :currEdit = "currEdit"
        @editComment = "EditComment" 
        @deleteComment = "DeleteComment" 
        @editControl = "EditControl"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
    name: 'comments-list',
    props:{
        comments:{
            type: Array
        },
        article_id:{
            type: Number
        },
        author_id:{
            type: Number
        }
    },
    data(){
        return {
            currEdit: -1
        }
    },
    computed:{
        ...mapState({
            user: state => state.user.body
        }),
        ...mapGetters({
            Roles: 'user/RolesWithoutAuthor'
        })
    },
    methods:{
        async AddComment(data){
            var roles
            await this.Roles(this.user.roles).then(res => {
                roles = res
            })
            console.log(this.author_id, this.user.id)
            if(this.author_id === this.user.id){
                if(roles){
                    roles += ", "
                }
                roles += "Автор"
            }

            const newComment = {
                id: data.id,
                text: data.text,
                username: this.user.username,
                name: this.user.name,
                surname: this.user.surname,
                user_id: this.user.id,
                comment_id: data.id,
                date_of_writing: new Date(data.createdAt).toLocaleDateString(),
                roles: roles
            }
            this.comments.unshift(newComment)
        },
        async EditComment(comment_index, text){
            this.comments[comment_index].text = text
        },
        async DeleteComment(comment_index){
            this.comments.splice(comment_index, 1)
        },
        async EditControl(index, flag) {
            if(!flag){
                this.currEdit = -1
            }
            else {
                this.currEdit = index
            }
        }
    }
}
</script>

<style scoped>
    .article__comments{
        margin-top: 22px;
        margin-left: auto;
        margin-right: auto;
        height: 100%;
        width: 100%;
        max-width: 660px;
        display: flex;
        flex-flow: column;
    }
    .article__comment{
        padding-top: 20px;
        position: relative;
        max-width: calc(100vw + -40px);
        width: 100%;
        height: 100%;
        margin-left: auto;
        margin-right: auto;
    }

    .article__comment::after{
        left: 0;
        top: calc(100% + -1px);
        position: absolute;
        content: '';
        background-color: #A5A5A5;
        width: 100%;
        height: 1px;
    }
</style>