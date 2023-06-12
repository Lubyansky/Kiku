import {createStore} from "vuex";
import {userModule} from "@/store/userModule";

export default createStore({
    state: () =>  ({
        settings:{
            name: 'Kiku',
            socials: {
                email: 'kiku@alwaysdata.net'
            },
            colors: {
                main: '#8D0909', //8D0909
                complementary: '#FFF6F6', //FFF6F6
                accent: '#DCA600', //DCA600
                background: '#FFFFFF', //FFFFFF
                detail: '#A4A4A4',
                secondaryDetail: '#AEAEAE'
            },
            currentYear: 2023
        },
        URL:{
            /*BASE: `http://kiku.alwaysdata.net/`,
            API: `http://kiku.alwaysdata.net/api`,
            USER: `http://kiku.alwaysdata.net/user`,
            AUTH: `http://kiku.alwaysdata.net/auth`,*/
            BASE: `http://localhost:5500/`,
            API: `http://localhost:5500/api`,
            USER: `http://localhost:5500/user`,
            AUTH: `http://localhost:5500/auth`
        },
        tags:[
            {id: 'tag1', title:'Доисторическая Япония'},
            {id: 'tag2', title:'Эра родовой аристократии'},
            {id: 'tag3', title:'Эра военной аристократии'},
            {id: 'tag4', title:'Эпоха воюющих провинций'},
            {id: 'tag5', title:'Сёгунат Токугава'},
            {id: 'tag6', title:'Модернизация'},
            {id: 'tag7', title:'Япония в качестве\nВеликой Державы'},
            {id: 'tag8', title:'Современность'}
        ],
        roles: [
            {
                id: 'user',
                display: "Пользователь",
                rights: {
                    canEditComments: false,
                    canAddArticles: false,
                    canEditArticles: false,
                    canAssignRoles: false,
                    canEditUsers: false,
                    canDeleteUsers: false,
                    canBan: false,
                    canOpenAdminPanel: false
                }
            },
            {
                id: 'author',
                display: "Автор",
                rights:{
                    canEditComments: false,
                    canAddArticles: true,
                    canEditArticles: false,
                    canAssignRoles: false,
                    canEditUsers: false,
                    canDeleteUsers: false,
                    canBan: false,
                    canOpenAdminPanel: false
                }
                
            },
            {
                id: 'moderator',
                display: "Модератор",
                rights:{
                    canEditComments: true,
                    canAddArticles: false,
                    canEditArticles: true,
                    canAssignRoles: false,
                    canEditUsers: false,
                    canDeleteUsers: false,
                    canBan: true,
                    canOpenAdminPanel: false
                }
            },
            {
                id: 'admin',
                display: "Администратор",
                rights:{
                    canEditComments: true,
                    canAddArticles: true,
                    canEditArticles: true,
                    canAssignRoles: true,
                    canEditUsers: true,
                    canDeleteUsers: true,
                    canBan: true,
                    canOpenAdminPanel: true
                }
            },
        ],
        article_edit: {
            article: {},
            isEdit: false
        },
        permission:{
            canEditComments: false,
            canAddArticles: false,
            canEditArticles: false,
            canAssignRoles: false,
            canEditUsers: false,
            canDeleteUsers: false,
            canBan: false,
            canOpenAdminPanel: false
        },
        saved_articles: [],
        articles: {
            isHidden: true,
        },
        widthWindow: 0,
        showAuthModal: false,
        showMenu: false,
        showSearch: false
    }),
    getters: {
        getSavedArticles(state){
            return state.saved_articles
        }
    },
    mutations:{
        setIsHidden(state, value){
            state.articles.isHidden = value
        },
        setArticleEdit(state, value){
            state.article_edit = value
        },
        setWidthWindow(state, value){
            state.widthWindow = value
        },
        setShowAuthModal(state, value){
            state.showAuthModal = value
        },
        setShowMenu(state, value){
            state.showMenu = value
        },
        setShowSearch(state, value){
            state.showSearch = value
        }
    },
    modules: {
        user: userModule
    }
})
