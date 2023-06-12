<template>
  <header class = "header" id="header">
    <nav class = "header-container">
        <div class = "burger-menu" @click="isShowMenu ? SetShowMenu(false) : SetShowMenu(true)">
            <div class = "burger-menu__line"></div>
            <div class = "burger-menu__line"></div>
            <div class = "burger-menu__line"></div>
        </div>
        <img class = "header__logo" src = "@/assets/images/logo.svg" alt="Лого">
        <div class="nav__links">
            <a class = "nav__link" href = "/">Главная</a>
            <a class = "nav__link" 
                @click="PeriodsMenuIsOpen ? PeriodsMenuIsOpen = false : PeriodsMenuIsOpen = true" 
                v-click-outside="PeriodsMenuClickOutside"
            >
                Периоды
            </a>
            <a class = "nav__link" href = "/articles">Материалы</a>
        </div>
        <div class="nav__buttons">
            <div class = "desktop-button">
                <button v-if="isLogin" class = "nav__link" @click="isShowMenu ? SetShowMenu(false) : SetShowMenu(true)" :title = "name">{{nameShorthand}}</button>
                <login-button v-else @click="SetShowAuthModal(true)"></login-button>
            </div>
            <search-button class="search-button" @click="isShowSearch ? SetShowSearch(false) : SetShowSearch(true)"></search-button>
        </div>
    </nav>
    <nav class = "history-menu" v-show="PeriodsMenuIsOpen">
        <a class = "history-menu__link link_black" v-for="tag in tags" :key=tag :href="'/articles?tags='+tag.id">&nbsp;&nbsp;·&nbsp;{{tag.title}}</a>
    </nav>
  </header> 
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import vClickOutside from 'click-outside-vue3'

export default {
    name: 'site-header',
    directives: {
        clickOutside: vClickOutside.directive
    },
    data(){
        return{
            PeriodsMenuIsOpen: false
        }
    },
    computed: {
        ...mapState({
            tags: state => state.tags,
            colors: state => state.settings.colors,
            isLogin: state => state.user.isLogin,
            user: state => state.user.body,
            isShowSearch: state => state.showSearch,
            isShowMenu: state => state.showMenu,
        }),
        name: function(){
            if(this.isLogin){
                return this.user.name ? this.user.name : this.user.username
            }
        },
        nameShorthand: function(){
            if(this.name && this.name.length > 8){
                return this.name.substring(0, 7) + "..."
            }
            else{
                return this.name
            }
        }
    },
    methods: {
        ...mapMutations({
            SetShowAuthModal: 'setShowAuthModal',
            SetShowMenu: 'setShowMenu',
            SetShowSearch: 'setShowSearch'
        }),
        PeriodsMenuClickOutside() {
            if(this.PeriodsMenuIsOpen)
                this.PeriodsMenuIsOpen = false
        },
    }
}

</script>

<style>
    .header {
        padding-top: 15px;
        position: fixed;
        display: flex;
        justify-self: center;
        flex-flow: column;
        top: 0;
        left: 0;
        
        width: 100%;
        z-index: 1000;

        background-color: v-bind("colors.main ? colors.main: '#8D0909'");
        background-position: center;
        background-size: 100vw;
        background-repeat: no-repeat;
    }

    .header-container {
        /*border-bottom: solid 1px #000000;*/
        position: relative;
        padding: 0px 50px 10px;
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        grid-gap: 20px 20px;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 65px;
    }

    .burger-menu {
        display: none;
        flex-wrap: wrap;

        top: 13.5px;
        left: 50px;

        z-index: 11111;

        width: 20px;
        height: 36px;
    }

    .burger-menu__line {
        position: relative;
        content: "";
        top:1px;
        width: 20px;
        height: 2px;
        margin-top: 4.5px;
        margin-bottom: 4.5px;
        background-color: #fff;
    }

    .header__logo {
        width: 145px;
        height: 50px;
    }

    .link_white {
        color:#ffffff;
        text-decoration: none;

        position: relative;

        font-weight: normal;
        font-size: 20px;
        line-height: 23px;

        transition: color .1s ease-in-out;
    }
    .nav__links{
        width: 100%;
        display: flex;
        flex-flow: row;
        justify-content: space-between;
    }
    .nav__link {
        height: 23px;
        
        color:#ffffff;
        text-decoration: none;

        position: relative;

        display: flex;
        align-items: center;

        font-weight: normal;
        font-size: 20px;
        line-height: 23px;
        text-align: center;

        transition: color .1s ease-in-out;
    }


    .nav__link::after{
        content: "";
        width: 100%;
        height: 1px;
        display: none;

        background-color: v-bind("colors.accent ? colors.accent: '#DCA600'");

        position: absolute;
        bottom: -2px;
        left: 0;
        z-index: 1;
    }

    .nav__link:hover {
        color: v-bind("colors.accent ? colors.accent: '#DCA600'");
    }

    .nav__link:hover::after {
        display: block;
    }

    .nav__buttons{
        position: relative;
        display: flex;
        flex-flow: row;
        justify-content: end;
        align-items: center;
    }
    
    .search-button{
        margin-left: 30px;
    }

    .history-menu{
        position: absolute;
        display: flex;

        top: 80px;
        left: 0px;
        
        padding-top: 10px;
        padding-bottom: 15px;
        padding-left: 210px;
        padding-right: 210px;

        /*max-width: 1180px;*/
        width: 100%;
        height: auto;

        z-index: 9999;
        justify-content: center;
        flex-flow: wrap;

        background: v-bind("colors.complementary ? colors.complementary : '#FFF6F6'");
        background-size: 100%;

        text-align: center;
        font-size: 20px;
        color: #000000;

        box-shadow: 0px 4px 4px rgba(141, 9, 9, 0.25);
    }
    .history-menu::after{
        display: none;
        content: "";
        position: absolute;
        top: 80px;
        left:0px;
        width: 100%;
        height: 2px;
        background-color: v-bind("colors.main ? colors.main: '#8D0909'");
    }
    .link_black {
        color:#000000;
        text-decoration: none;
    }	

    .history-menu__link {
        line-height: 30px;
    }

    .history-menu__link:hover {
        color: v-bind("colors.accent ? colors.accent: '#DCA600'");
    }

    @media (max-width: 1476px) {
        .history-menu{
            padding-left: 105px;
            padding-right: 105px;
        }
    }
    @media (max-width: 1266px) {
        .history-menu{
            height:105px
        }
        .history-menu::after{
            top: 105px;
        }
    }

    @media (max-width: 992px) {
        .header{
            padding-top:0;
        }
        .header-container{
            height: 80px;
            padding-bottom:0;
        }
        .header__logo {
            margin-left: auto;
            margin-right: auto;
        }
        .history-menu{
            display: none;
        }
        .burger-menu {
            display: flex;
            margin-top: 9px;
        }
        .desktop-button{
            display: none;
        }
        .nav__links{
            display: none;
        }
        .nav__link{
            padding-top: 24px;
            width: 100%;
            height: 75px;
            width: 100vw;
            font-size: 24px;
        }
        .nav__link:hover::after {
            display: none;
        }
        /*.nav__link::before{
            content: "";
            position: absolute;
            top: 0px;
            left: 0px;
        
            width: 100vw;
            height: 2px;
        
            background-color: #A5A5A5;
        
            z-index: 50;
        }*/
    }

    @media (max-width: 768px) {
        .burger-menu {
            left: 15px;
        }
        .header-container {
            padding-left: 15px;
            padding-right: 15px;
        }
        .burger__menu {
            margin-top: 13px;
        }
    }

    @media (max-width: 576px) {
        .nav__link{
            padding-top: 12.5px;
            height: 50px;
            font-size: 20px;
        }
        .nav__link::before{
            top: 0px;
        }
    }
    @media (max-width: 360px) {
        .header__logo {
            opacity: 0;
        }
    }
</style>