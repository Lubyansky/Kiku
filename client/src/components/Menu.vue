<template>
    <div class="menu-mask">
        <div class="menu-container" v-click-outside="ClickOutside">
            <div class = menu>
                <div v-show="isLogin" class = "menu__username" :title = "fullName ? fullName: ''">
                    {{fullNameShorthand}}
                </div>
                <a class = "menu__link mobile" @click.prevent="FollowLink('/')">Главная</a>
                <a class = "menu__link mobile" @click.prevent="FollowLink('/articles')">Материалы</a>
                <button v-show="!isLogin" @click.prevent="SetShowAuthModal(true)" class="menu__logout mobile">Войти</button>
                <a v-show="isLogin" class = "menu__link" @click.prevent="FollowLink('/profile/' + user.id)">Профиль</a>
                <a v-show="isLogin" class = "menu__link" @click.prevent="FollowLink('/profile/'+ user.id + '#saved-articles')">Сохранённые статьи</a>
                <a v-show="isLogin" class = "menu__link" @click.prevent="FollowLink('/articles/management')" v-if = "(permission.canAddArticles || permission.canEditArticles) && !isBanned">Управление материалами</a>
                <a v-show="isLogin" class = "menu__link" v-if = "permission.canOpenAdminPanel && !isBanned">Панель администратора [В процессе]</a>
                <button v-show="isLogin" class = "menu__logout" @click.prevent="Logout" id = "buttonLogout" type = "submit">Выйти</button>
            </div>
        </div>
    </div>
</template>

<script>
import vClickOutside from 'click-outside-vue3'
import {mapGetters, mapState, mapMutations, mapActions} from 'vuex'

export default {
    name: 'site-menu',
    directives: {
        clickOutside: vClickOutside.directive
    },
    computed: {
        ...mapState({
            isLogin: state => state.user.isLogin,
            user: state => state.user.body,
            permission: state => state.permission,
            isBanned: state => state.user.body.is_banned,
            colors: state => state.settings.colors
        }),
        ...mapGetters({
            isHavePermission: 'user/IsHavePermission'
        }),
        fullName: function () {
            if(this.isLogin){
                const firstName = this.user.name ? this.user.name : this.user.username
                const secondName = this.user.surname && this.user.name ? this.user.surname : ''
                var result = ''
                if(secondName){
                    result += firstName + " " + secondName
                }
                else {
                    result += firstName
                }
                return result
            }  
        },
        fullNameShorthand: function(){
            if(this.fullName && this.fullName.length > 19){
                return this.fullName.substring(0, 18) + "..."
            }
            else{
                return this.fullName
            }
        }
    },
    methods: {
        ...mapMutations({
            SetShowMenu: 'setShowMenu',
            SetShowAuthModal: 'setShowAuthModal'
        }),
        ...mapActions({
            logout: 'user/Logout'
        }),
        ClickOutside() {
            this.SetShowMenu(false)
        },
        FollowLink(link){
            this.$router.push(link)
            this.ClickOutside()
        },
        async Logout(){
            this.logout()
            if(this.$route.name == 'article_management' || this.$route.name == 'article_editing' || this.$route.name == 'profile'){
                this.$router.push('/')
            }
            this.SetShowMenu(false)
        }
    }
}
</script>

<style scoped>
    .menu-mask {
        position: fixed;
        z-index: 9998;
        top: 80px;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        display: table;
    }
    .menu-container {
        position: fixed;
        width: 100%;
        background-color: rgba(255, 255, 255, 1);
    }
    .menu{
        display: flex;
        flex-flow: column;
        align-items: center;
        width: 100%;
        font-size: 20px;
    }
    .menu__username{
        position: relative;
        padding-top: 22px;
        padding-bottom: 22px;
        text-align: center;
        width: 100%;
        border-bottom: solid 1px #000000;
    }
    .menu__link{
        position: relative;
        padding-top: 22px;
        padding-bottom: 22px;
        text-align: center;
        width: 100%;
        height: 100%;
        cursor: pointer;
        color: #000000;
        text-decoration: none;
        border-bottom: solid 1px #000000;
    }
    .menu__link:hover{
        color:#ffffff;
        background-color: v-bind("colors.main ? colors.main: '#8D0909'");
    }
    .menu__logout {
        position: relative;
        padding-top: 23px;
        padding-bottom: 22px;
        width: 100%;
        cursor: pointer;
        border-bottom: solid 1px #000000;
    }
    .menu__logout:hover{
        color:#ffffff;
        background-color: v-bind("colors.main ? colors.main: '#8D0909'");
    }
    .mobile{
        display: none;
    }
    @media (max-width: 992px) {
        .mobile{
            display: block;
        }
    }
</style>
