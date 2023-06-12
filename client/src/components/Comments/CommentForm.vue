<template>
  <form class = "add__comment" @submit.prevent="AddComment">
    <div class = "comment__title">Комментарии</div>
    <textarea class = "comment__input-add" 
        :class="{ 'comment__input-add_error': isError}"
        contenteditable ="true"
        :placeholder="isLogin ? placeholder : 'Войдите чтобы оставить комментарий'" 
        autocomplete="off" 
        v-model="formAdd.text"
        :disabled = "isBanned || !isLogin ? 'disabled' : null"
    >
    </textarea>
    <site-button v-if = "isLogin" type = "submit" :disabled = "!canAdd">Добавить</site-button>
  </form>
</template>

<script>
import axios from "axios";
import { mapState } from 'vuex';

export default {
    name: 'comment-form',
    props:{
        article_id: {}
    },
    data(){
        return {
            formAdd: {
                text: ''
            },
            placeholder: 'Оставьте комментарий',
            isError: false
        }
    },
    computed: {
        ...mapState({
            isBanned: state => state.user.body.is_banned,
            isLogin: state => state.user.isLogin,
            URL: state => state.URL
        }),
        canAdd() {
            if(this.formAdd.text.trim() && this.isLogin && !this.isBanned){
                return true
            }
        }
    },
    methods:{
        async AddComment(){
            this.isError = false
            this.placeholder = 'Оставьте комментарий'
            const {...comment} = this.formAdd
            this.formAdd.text = ''
            if(comment.text.length > 1000){
                this.placeholder = "Длина комментария не должна превышать 1000 символов"
                this.isError = true
                return
            }
            comment.article_id = this.article_id
            const url = (this.URL.API + `/comments`)
            try{
                var data = []
                await axios.post(url, comment, { withCredentials: true })
                .then(res=>{
                    data = res.data
                    this.$emit('add', data)
                })
            }
            catch(e){
                console.log(e)
            }
        }
    },
}
</script>

<style scoped>
    .add__comment{
        display: flex;
        flex-flow: column;
        align-items: center;
        margin-bottom: 56px;
    }

    .comment__title{
        font-size: 28px;
        line-height: 32px;
        text-align: center;
    }

    .comment__input-add{
        resize: none;
        max-width: calc(100vw + -40px);
        width: 100%;
        height: 200px;
        margin-top: 48px;
        margin-bottom: 20px;
        padding-top: 9px;
        padding-left: 11px;
        padding-right: 11px;
        padding-bottom: 9px;
        font-size: 16x;
        line-height: 18px;
        color: #000000;
        border: 1px solid #000000;
        outline: 1px solid #000000;
        text-align: justify;
        white-space: pre-wrap;
    }
    .comment__input-add::placeholder {
        padding-left: 0px;
        color: #C4C4C4;
    }
    .comment__input-add_error{
        border: 1px solid #8D0909;
        outline: 1px solid #8D0909;
    }
    .comment__input-add_error::placeholder {
        padding-left: 0px;
        color: #000000;
    }
</style>