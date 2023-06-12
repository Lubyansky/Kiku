<template>
    <form class = "profile__edit-password" @submit.prevent="EditPass">
        <div class = "profile__edit-password-title">Введите старый пароль</div>
        <input class = "profile__edit-password-input" type = "password" v-model="form.oldPass">
        <div class = "profile__edit-password-title">Введите новый пароль</div>
        <input class = "profile__edit-password-input" type = "password" v-model="form.newPass">
        <div class = "profile__edit-password-title">Повторно введите новый пароль</div>
        <input class = "profile__edit-password-input" type = "password" v-model="form.reNewPass">
    </form>
    <div class = "profile__control">
        <div class="profile__control-main">
            <site-button @click = "Close">Закрыть</site-button>
            <site-button @click="EditPass">Сохранить</site-button>
        </div>
    </div>
    <div v-if="error" class = "profile__edit-password-error">{{error}}</div>
    <div v-if = "success" class = "edit-password-success">{{success}}</div>
</template>

<script>
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'

export default {
    name: 'profile-edit-pass',
    emits: ['repass'],
    data(){
        return {
            form:{
                oldPass: '',
                newPass: '',
                reNewPass: '',
            },
            error: '',
            success: ''
        }
    },
    methods: {
        ...mapActions({
            EditPassword: 'user/EditPass',
        }),
        Close(){
            this.form = {
                oldPass: '',
                newPass: '',
                reNewPass: '',
            }
            this.error = ''
            this.success = ''
            this.$emit('repass')
        },
        async EditPass(){
            this.error = ''
            const {...input} = this.form
            if(!input.oldPass){
                this.error = "Введите старый пароль"
                return;
            }
            if(!input.newPass){
                this.error = "Введите новый пароль"
                return;
            }
            if(input.newPass.search('^[a-zA-Z0-9]+$')){
                this.error = "Для пароля допускаются только буквы латинского алфавита и цифры"
                return;
            }
            if(input.oldPass === input.newPass){
                this.error = "Старый и новый пароли должны отличаться"
                return;
            }
            if(input.newPass.length < 4 || input.newPass.length > 10 ){
                this.error = "Пароль должен быть от 4 до 10 символов"
                return;
            }
            if(!input.reNewPass){
                this.error = "Введите повторный пароль"
                return;
            }
            if(input.newPass != input.reNewPass){
                this.error = "Новые пароли не совпадают"
                return;
            }
            const err = this.EditPassword(input)
            err.then(value => {
                this.error = value
                if(value){
                    return
                }
                else{
                    this.success = "Пароль успешно изменен"
                    this.Close()
                }
            })
        },
    }
}
</script>

<style>
    .edit-password-success{
        margin-top: 40px;
        margin-bottom: 60px;
        font-size: 18px;
        line-height: 20px;
        color: #1d6923;
    }
</style>