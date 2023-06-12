<template>
    <form  class = "login__form" v-click-outside="ClickOutside" @submit.prevent="isTurn ? Registration() : Login()">
        <div class = "login__form-title">{{title}}</div>
        <div class = "login__form-username">Имя пользователя  {{isTurn ? '(от 4 до 10 символов)' : ''}}</div>
        <input class = "username__input" id = "usernameInput" type="text" v-model="form.username">
        <div class = "login__form-password" >Пароль {{isTurn ? '(от 4 до 10 символов)' : ''}}</div>
        <input class = "password__input" id = "passwordInput" type="password" v-model="form.password">
        <div class = "login__form-password" v-if = "isTurn" >Повторите пароль</div>
        <input class = "password__input" v-if = "isTurn" id = "repasswordInput" type="password" v-model="form.repassword">
        <button v-if="!isTurn" class = "login__button" id = "buttonLogin" type = "submit" @click.prevent="Login">Войти</button>
        <button v-else class = "login__button" :style="{width: widthSubmitButton}" id = "buttonRegist" type = "submit"  @click.prevent="Registration">Зарегистрироваться</button>
        <div class = login__error v-if = "error != ''">{{error}}</div>
        <a class = "login__form-regist" @click="TurnForm">{{turnText}}</a>
    </form>
</template>

<script>
import menuMixin from "@/mixins/menuMixin"
import {mapActions, mapState, mapMutations} from 'vuex'
import vClickOutside from 'click-outside-vue3'

export default {
    name: 'authorization',
    mixins: [menuMixin],
    directives: {
        clickOutside: vClickOutside.directive
    },
    data (){
        return{
            error: '',
            form: {
                username: '',
                password: '',
                repassword: ''
            },
            isTurn: false,
            turnText: 'Регистрация',
            widthSubmitButton: '100px',
            title: 'Войти'
        }
    },
    computed: {
        ...mapState({
            URL: state => state.URL,
            colors: state => state.settings.colors
        }),
    },
    methods: {
        ...mapMutations({
            SetShowAuthModal: 'setShowAuthModal',
        }),
        ...mapActions({
            registration: 'user/Registration',
            login: 'user/Login',
        }),
        async Registration(){
            this.error = ''

            const {...input} = this.form

            const error = this.RegistrationValidation(input)

            if(error){
                this.error = error
                return
            }

            this.error = await this.registration(input)

            if(!this.error){
                this.form = {
                    username: '',
                    password: '',
                    repassword: ''
                }
                this.SetShowAuthModal(false)
            }
        },
        async Login(){
            this.error = ''
            const {...input} = this.form
            const error = this.LoginValidation(input)

            if(error){
                this.error = error
                return
            }
            this.error = await this.login(input)

            if(!this.error){
                this.form = {
                    username: '',
                    password: '',
                    repassword: ''
                }
                this.SetShowAuthModal(false)
            }
        },
        async TurnForm(){
            if(this.isTurn){
                this.isTurn = false
                this.turnText = "Регистрация"
                this.widthSubmitButton = '100px'
                this.form = {
                    username: '',
                    password: '',
                    repassword: ''
                }
                this.error = ''
                this.title = 'Войти'
            }
            else {
                this.isTurn = true
                this.turnText = "Уже зарегестрированны?"
                this.widthSubmitButton = '220px'
                this.form = {
                    username: '',
                    password: '',
                    repassword: ''
                }
                this.error = ''
                this.title = 'Регистрация'
            }
        },
        ClickOutside() {
            this.SetShowAuthModal(false)
        },
    }
}
</script>

<style scoped>
    input{
        color: v-bind("colors.complementary ? colors.complementary : '#FFF6F6'");
        background-color: v-bind("colors.main ? colors.main: '#8D0909'");
        border: 2px solid v-bind("colors.complementary ? colors.complementary : '#FFF6F6'");
        padding-left: 4px;
    }
    input:focus {
        border: solid 2px #DCA600;
        outline: none;
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active  {
        box-shadow: 0 0 0 30px #8D0909 inset !important;
        -webkit-text-fill-color: #FFFFFF;
    }
    .login__form{
        position: relative;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
    
        width: 300px;
        height: 100%;
        background-color: v-bind("colors.main ? colors.main: '#8D0909'");
        z-index: 100;
        color: v-bind("colors.complementary ? colors.complementary : '#FFF6F6'");
    }
    .login__form-title{
        margin-top: 32px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 26px;
        font-size: 20px;
    }
    .login__form-username{
        margin-left: 20px;
    }

    .username__input{
        margin-top: 9px;
        margin-left: 20px;
        margin-right: 20px;

        width: calc(100% + -40px);
        height: 24px;

        padding-left: 4px;

        color: #ffffff;
        background-color: v-bind("colors.main ? colors.main: '#8D0909'");
        border: 2px solid v-bind("colors.complementary ? colors.complementary : '#FFF6F6'");
    }
    .username__input:focus {
        border: solid 2px #DCA600;
        outline: none;
    }

    .login__form-password{
        margin-top: 16px;
        margin-left: 20px;
    }

    .password__input{
        margin-top: 9px;
        margin-left: 20px;
        margin-right: 20px; 
        width: calc(100% + -40px);
        height: 24px;
        color: #ffffff;
        background-color: v-bind("colors.main ? colors.main: '#8D0909'");
        border: 1px solid v-bind("colors.complementary ? colors.complementary : '#FFF6F6'");
    }

    .login__button{
        position: relative;
        margin-left: auto;
        margin-right: auto;
        margin-top: 28px;
        margin-bottom: 18px;
        width: 100px;
        height: 32px;
        border: 1px solid v-bind("colors.complementary ? colors.complementary : '#FFF6F6'");
        color: #ffffff;
        cursor: pointer;
    }

    .login__error{
        margin-left: auto;
        margin-right: auto;
        max-width: 280px;
        text-align: center;
        font-size: 14px;
        color: #FCBD00;
    }

    .login__form-regist{
        margin-top: 16px;
        margin-bottom: 16px;
        margin-left: auto;
        margin-right: auto;
        font-size: 16px;
        cursor: pointer;
        color: #FFFFFF;
    }
</style>