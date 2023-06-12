<template>
  <div class = "profile" v-cloak>
    <h2 class = "user_is_banned" v-if = "user && (user.is_banned && !permission.canBan)">
        Пользователь заблокирован
    </h2>
    <div class = "profile__container" v-else-if = "user" :class="{padding : user.id != user_id}">
        <h1 class = "profile__title">Профиль</h1>
        <profile-content v-if="!isEdit && !isRepass" 
            :user="user" 
            :isEdit="isEdit" 
            :isRepass="isRepass"
            :isDelete="isDelete"
            @edit="ChangeEdit" 
            @repass="ChangeRepass"
            @delete="ShowModal"
        />
        <profile-edit v-if = "isEdit" 
            :user="user" 
            :permission="permission"
            @edit="ChangeEdit" 
        />
        <profile-edit-pass v-if = "!isEdit && isRepass"
            @repass="ChangeRepass"
        />

      <div class = "profile__saved-article" v-if = "user.id == user_id && !isEdit && !isRepass" ref = "saved_articles">
        <h2 class = "profile__saved-article-title">Сохраненные статьи</h2>
        <div class = "profile__saved-article-list" v-show="articles.length || query">
            <articles-list :articles="articles" :query="query" :loading="loading" @search="ChangeQuery"/>
        </div>
        <div v-show="currentPage == 1 && articles.length == 0 && !query" class = "profile__saved-article-error">
            <div class = "profile__saved-article-error-tittle">Cтатей нет.</div>
            <a href="/articles"><site-button>Добавить?</site-button></a>
        </div>
      </div>

    </div>
    <div v-else class = "profile__content_none">Пользователь не найден</div>
  </div>
  <div class="observer" ref="observer"></div>
  <site-modal v-if="isDelete">
    <modal-delete @close="CloseModal" @execute="Delete" />
  </site-modal>
</template>

<script>
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
import articlesMixin from "@/mixins/articlesMixin"

export default {
    mixins: [articlesMixin],
    data(){
        return{
            user: {},
            isRepass: false,
            isEdit: false,
            isDelete: false
        }
    },
    computed: {
        ...mapState({
            permission: state => state.permission,
            user_id: state => state.user.body.id,
            colors: state => state.settings.colors
        }),
        ...mapGetters({
            isHavePermission: 'user/IsHavePermission'
        })
    },
    methods: {
        ...mapActions({
            GetUser: 'user/GetUser',
            DeleteUser: 'user/DeleteUser'
        }),
        ChangeEdit(){
            if(this.isEdit){
                this.isEdit = false
                this.$router.push({path: this.$route.path})
            }
            else{
                this.isEdit = true
                this.SrollToTop()
            }
        },
        ChangeRepass(){
            if(this.isRepass){
                this.isRepass = false
                this.$router.push({path: this.$route.path})
            }
            else{
                this.isRepass = true
                this.SrollToTop()
            }
        },
        ShowModal(){
            this.isRepass = false
            this.isEdit = false
            this.isDelete = true
        },
        CloseModal(){
            this.isDelete = false
            this.$router.push({path: this.$route.path})
        },
        async Delete(){
            this.$router.push({path: '/'})
            this.DeleteUser(this.user.id)
        },
        async SrollToTop(){
            window.scrollTo(0, 0)
        },
        async ScrollToSavedArticles(){
            let ref = this.$refs.saved_articles
            let top = window.scrollY + ref.getBoundingClientRect().y - 120;
            window.scrollTo(0, top)
        },
        async GetUserProfile(){
            this.loading = true

            this.GetUser(this.$route.params.id)
            .then(res =>{
                this.user = res
            })
            .then(async () => {
                if(this.user.id == this.user_id){
                    this.resource = "/users/" + this.user_id +  "/articles/saved"
                    await this.loadArticles()
                }
            })
            .catch(e => {console.log(e)})
            .finally(async () => {
                this.loading = false
                if(this.$route.hash == "#saved-articles" && this.$refs.saved_articles){
                    await this.ScrollToSavedArticles()
                }
                else{
                    this.SrollToTop()
                }
            })
        }
    },
    async mounted() {
        this.GetUserProfile()
    },
    async beforeUpdate(){
        if(this.$route.hash == "#saved-articles" && this.$refs.saved_articles && !this.isRepass && !this.isEdit && !this.isDelete){
            await this.ScrollToSavedArticles()
        }
        if(this.$route.params.id != this.user.id){
            this.GetUserProfile()
        }
    }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style>
    .profile{
        margin-top:80px;
        background-color: v-bind("colors.complementary ? colors.complementary : '#FFF6F6'");
        height: 100%;
        position: relative;
        scroll-behavior: smooth;
    }

    .profile__container{
        max-width: 1020px;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        height: 100%;

        display: flex;
        align-items: center;
        flex-flow: column;

        background-color: v-bind("colors.background? colors.background: '#FFFFFF'");
    }

    .profile__title{
        margin-left: auto;
        margin-right: auto;
        margin-top: 66px;
        font-size: 32px;
    }

    .profile__content{
        margin-top: 100px;
        padding-left: 15px;
        padding-right: 15px;
        position: relative;
        display:grid;
        grid-template-columns: 33.33% 33.33% 33.33%;
        grid-template-rows: 166px 166px;
        width: 100%;
        max-width: 938px;
        font-size: 20px;
    }

    .profile__content::after{
        position: absolute;
        content: "";
        top:calc(50% + -50px);
        left:0px;
        width: 100%;
        height: 1px;
        background-color: #A5A5A5;
    }
    .type1{
        text-align: start;
    }
    .type2{
        text-align: center;
    }
    .type3{
        text-align: end;
    }
    
    .profile__control{
        width: 100%;
        display: flex;
        flex-flow: column;
        align-items: center;
    }
    .profile__control-main{
        margin-bottom: 80px;
        display: flex;
        height: 50px;
        justify-items: center;
    }
    .profile__control-save{
        margin-bottom: 80px;
    }
    .profile__edit-password{
        padding-top: 40px;
        padding-left: 15px;
        padding-right: 15px;
        padding-bottom: 40px;
        max-width: 400px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column;
        justify-content: center;

        font-size: 20px;
        line-height: 22px;
    }
    .profile__edit-password-title{
        margin-top: 30px;
    }
    .profile__edit-password-input{
        margin-top: 8px;
    }
    .profile__edit-password-error{
        align-self: center;
        margin-bottom: 80px;
        font-size: 18px;
        line-height: 20px;
        color:v-bind("colors.main? colors.main: '#8D0909'");
        text-align: center;
    }
    .profile__edit-user-error{
        align-self: center;
        margin-bottom: 80px;
        font-size: 18px;
        line-height: 20px;
        color:v-bind("colors.main? colors.main: '#8D0909'");
        text-align: center;
    }
    .profile__saved-article{
        width: 100%;
    }
    .profile__saved-article-title{
        margin-left: 15px;
        margin-right: 15px;
        margin-bottom: 66px;
        font-size: 32px;
        text-align: center;
    }
    .profile__saved-article-list{
        
    }
    .profile__saved-article-error{
        margin-bottom: 135px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column;
        align-items: center;
    }
    .profile__saved-article-error-tittle{
        margin-bottom: 66px;
        font-size: 24px;
        text-align: center;
    }
    .profile__saved-article-error-link{
        width: 170px;
        height: 50px;
        font-size: 20px;
        color: v-bind("colors.accent? colors.accent: '#DCA600'");
        border: 1px solid v-bind("colors.accent? colors.accent: '#DCA600'");
        box-shadow: 4px 4px 4px v-bind("colors.accent? colors.accent + '66': '#DCA600' + '66'");
    }
    .profile__saved-article-error-link:hover{
        color: v-bind("colors.main? colors.main: '#8D0909'");
        border: 1px solid v-bind("colors.main? colors.main: '#8D0909'");
        box-shadow: 4px 4px 4px v-bind("colors.main? colors.main+'40': '#8D0909'+'40'");
    }
    .profile__content_none{
        font-size: 32px;
        text-align: center;
        padding-top: 260px;
        padding-bottom:240px
    }
    .user_is_banned{
        padding-top: 160px;
        padding-bottom: 240px;
        color:v-bind("colors.main? colors.main: '#8D0909'");
        font-size: 32px;
        text-align: center;
    }

    .padding{ 
        padding-bottom: 50px;
    }
    @media(max-width: 836px){
        .profile__control-main{
            display: flex;
            flex-flow: column;
            height: 100%;
            /*
            justify-items: center;*/
        }
        .button {
            margin-top: 20px;
        }

        .profile__content{
            margin-top: 36px;
            /*padding-left: 15px;
            padding-right: 15px;*/
            display:flex;
            flex-flow: column;

        }
        .profile__content::after{
            display: none;
        }
        .type1{
            text-align: center;
        }
        .type2{
            text-align: center;
        }
        .type3{
            text-align: center;
        }
        .profile__item-title{
            margin-top: 36px;
        }
        .profile__item-value{
            margin-top: 12px;
            font-size: 24px;
        }
        .profile__control{
            margin-top: 36px;
        }
    }

    /*@media(max-width: 576px){
        .profile__content{
            margin-top: 36px;
            display:flex;
            flex-flow: column;

        }
        .profile__content::after{
            display: none;
        }
        .type1{
            text-align: center;
        }
        .type2{
            text-align: center;
        }
        .type3{
            text-align: center;
        }
        .profile__item-title{
            margin-top: 36px;
        }
        .profile__item-value{
            margin-top: 12px;
            font-size: 24px;
        }
        .profile__control{
            margin-top: 36px;
        }
    }*/

</style>