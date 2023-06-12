<template >
  <div class = "admin_panel">
    <div class = "container__loader" v-if = "loading" style = "padding-top: 180px; padding-bottom:240px">
      <div class = "loader"></div>
    </div>
    <div class = "admin_panel__container" v-else-if = "this.permission.canOpenAdminPanel || !this.isBanned">
      <h1 class = "admin_panel__title">Панель администратора</h1>
      <div class = "admin_panel__content">

        <div style="width: 100%;">

          <div class="admin_panel__list">
            <div class = "admin_panel__list_header">
              <h2 class="admin_panel__list_title">Основные настройки</h2>
              <button class = "admin_panel__button-cover" :class="{button__uncover: hidden_lists.find(el => el.name == 'main').value}" @click="CoverHidden('main')" title="Свернуть/развернуть"></button>
            </div>
            <div class="admin_panel__list_container" v-if="hidden_lists.find(el => el.name == 'main').value != true">
              <div class = "admin_panel__item">
                <h3 class="admin_panel__item_title">Название сайта</h3>
                <div class = "admin_panel__item_content">
                  <site-input class = "admin_panel__item__input"
                    placeholder="Введите название сайта" 
                    type="text" 
                    :value = "formEditAppearance.name"
                    @input = "formEditAppearance.name = $event.target.value"
                    :maxlength="9"
                  />
                </div>
              </div>

              <div class = "admin_panel__item">
                <h3 class="admin_panel__item_title">Логотип</h3>
                <div class = "admin_panel__item_content">
                  <site-input class = "admin_panel__item__input"
                    placeholder="ЗАГЛУШКА" 
                    type="text" 
                    :value = "formEditAppearance.logo"
                    @input = "formEditAppearance.logo = $event.target.value"
                    :maxlength="9"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="admin_panel__list">
            <div class = "admin_panel__list_header">
              <h2 class="admin_panel__list_title">Настройка цветовой гаммы</h2>
              <button class = "admin_panel__button-cover" :class="{button__uncover: hidden_lists.find(el => el.name == 'colors').value}" @click="CoverHidden('colors')" title="Свернуть/развернуть"></button>
            </div>
            <div class="admin_panel__list_container" v-if="hidden_lists.find(el => el.name == 'colors').value != true">

              <div class = "admin_panel__item">
                <h3 class="admin_panel__item_title">Основной цвет</h3>
                <div class = "admin_panel__item_content">
                  <div class="admin_panel__item__print_color" :style="{'background-color': formEditAppearance.colors.main}"></div>
                  <site-input class = "admin_panel__item__input"
                    placeholder="Введите цвет в форматe HEX" 
                    type="text" 
                    :value = "formEditAppearance.colors.main"
                    @input = "formEditAppearance.colors.main = $event.target.value"
                    :maxlength="9"
                  />
                </div>
              </div>

              <div class = "admin_panel__item">
                <h3 class="admin_panel__item_title">Дополнительный цвет</h3>
                <div class = "admin_panel__item_content">
                  <div class="admin_panel__item__print_color" :style="{'background-color': formEditAppearance.colors.complementary}"></div>
                  <site-input class = "admin_panel__item__input"
                    placeholder="Введите цвет в форматe HEX" 
                    type="text" 
                    :value = "formEditAppearance.colors.complementary"
                    @input = "formEditAppearance.colors.complementary = $event.target.value"
                    :maxlength="9"
                  />
                </div>
              </div>

              <div class = "admin_panel__item">
                <h3 class="admin_panel__item_title">Акцентирующий цвет</h3>
                <div class="admin_panel__item_content">
                  <div class="admin_panel__item__print_color" :style="{'background-color': formEditAppearance.colors.accent}"></div>
                  <site-input class = "admin_panel__item__input"
                    placeholder="Введите цвет в форматe HEX" 
                    type="text" 
                    :value = "formEditAppearance.colors.accent"
                    @input = "formEditAppearance.colors.accent = $event.target.value"
                    :maxlength="9"
                  />
                </div>
              </div>

              <div class = "admin_panel__item">
                <h3 class="admin_panel__item_title">Цвет фона</h3>
                <div class = "admin_panel__item_content">
                  <div class="admin_panel__item__print_color" :style="{'background-color': formEditAppearance.colors.background}"></div>
                  <site-input class = "admin_panel__item__input"
                    placeholder="Введите цвет в форматe HEX" 
                    type="text" 
                    :value = "formEditAppearance.colors.background"
                    @input = "formEditAppearance.colors.background = $event.target.value"
                    :maxlength="9"
                  />
                </div>
              </div>

              <div class = "admin_panel__item">
                <h3 class="admin_panel__item_title">Цвет деталей</h3>
                <div class = "admin_panel__item_content">
                  <div class="admin_panel__item__print_color" :style="{'background-color': formEditAppearance.colors.detail}"></div>
                  <site-input class = "admin_panel__item__input"
                    placeholder="Введите цвет в форматe HEX" 
                    type="text" 
                    :value = "formEditAppearance.colors.detail"
                    @input = "formEditAppearance.colors.detail = $event.target.value"
                    :maxlength="9"
                  />
                </div>
              </div>

              <div class = "admin_panel__item">
                <h3 class="admin_panel__item_title">Цвет вторичных деталей</h3>
                <div class = "admin_panel__item_content">
                  <div class="admin_panel__item__print_color" :style="{'background-color': formEditAppearance.colors.secondaryDetail}"></div>
                  <site-input class = "admin_panel__item__input"
                    placeholder="Введите цвет в форматe HEX" 
                    type="text" 
                    :value = "formEditAppearance.colors.secondaryDetail"
                    @input = "formEditAppearance.colors.secondaryDetail = $event.target.value"
                    :maxlength="9"
                  />
                </div>
              </div>
     
            </div>
          </div>

          <div class="admin_panel__list">
            <div class = "admin_panel__list_header">
              <h2 class="admin_panel__list_title">Социальные сети и почта</h2>
              <button class = "admin_panel__button-cover" :class="{button__uncover: hidden_lists.find(el => el.name == 'socials').value}" @click="CoverHidden('socials')" title="Свернуть/развернуть"></button>
            </div>
            <div class="admin_panel__list_container" v-if="hidden_lists.find(el => el.name == 'socials').value != true">
              <div class = "admin_panel__item">
                <h3 class="admin_panel__item_title">Почтовый адрес</h3>
                <div class = "admin_panel__item_content">
                  <site-input class = "admin_panel__item__input"
                    placeholder="Введите название сайта" 
                    type="text" 
                    :value = "formEditAppearance.mail"
                    @input = "formEditAppearance.mail = $event.target.value"
                    :maxlength="9"
                  />
                </div>
              </div>


            </div>
          </div>
        </div>

        <cover-all-button class ="button-position" @click="CoverAll" :isCoverAll="isHidden"></cover-all-button>
      
      </div> 
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    data(){
      return{
          loading: true,
          formEditAppearance: {
              name: "Kiku",
              logo: "",
              colors: {
                  main: '#8D0909',
                  complementary: '#FFF6F6',
                  accent: '#DCA600',
                  background: '#FFFFFF',
                  detail: '#A4A4A4',
                  secondaryDetail: '#AEAEAE',
              },
              socials: {
                  vk: "",
                  odnoklassniki: "",
                  telegram: ""
              },
              mail: "kiku@mail.com"
          },
          hidden_lists:[
              { name: "main", value: true },
              { name: "colors", value: true },
              { name: "socials", value: true }
          ],
          isHidden: true
      }
    },
    computed:{
        ...mapState({
            isBanned: state => state.user.body.is_banned,
            user_id: state => state.user.body.user_id,
            permission: state => state.permission,
            isLogin: state => state.user.isLogin,
            colors: state => state.settings.colors
        })
    },
    created(){
        if(!(this.permission.canOpenAdminPanel) || this.isBanned){
            this.$router.push('/')
        }
    },
    methods:{
        async CoverHidden(item){
            var id = this.hidden_lists.indexOf(this.hidden_lists.find(el => el.name == item))
            if(this.hidden_lists[id].value){
                this.hidden_lists[id].value = false
            }
            else{
                this.hidden_lists[id].value = true
            }
        },
        async CoverAll(){
            if(this.isHidden){
                this.hidden_lists.forEach(list => {
                    list.value = false
                })
                this.isHidden = false
            }
            else{
                this.hidden_lists.forEach(list => {
                    list.value = true
                })
                this.isHidden = true
            }
        }
    },
    async mounted(){
        
        this.loading = false
    }
    
};

</script>

<style scoped>
  .admin_panel{
      margin-top:80px;
      background-color: v-bind("colors.complementary ? colors.complementary : '#FFF6F6'");
      height: 100%;
  }
  .admin_panel__container{
      max-width: 1020px;
      margin-left: auto;
      margin-right: auto;
      width: 100%;
      height: 100%;

      background-color: v-bind("colors.background? colors.background: '#FFFFFF'");

      padding-bottom: 140px;
  }
  .admin_panel__title{
      padding-top:60px;
      padding-bottom:60px;
      font-style: normal;
      font-weight: normal;
      font-size: 32px;
      line-height: 34px;
      text-align: center;
  }
  .admin_panel__content{
    max-width: 685px;

    margin-left: auto;
    margin-right: auto;

    display: flex;
    justify-content: space-between;
  }
  .button-position{
      margin-top:19px;
      margin-left:3px;
  }
  .uncover_all{
      margin-top:21px;
  }
  .admin_panel__list{
    padding-top: 20px;
  }
  .admin_panel__list_header{
    display: flex;
    flex-flow: row;
    justify-content: space-between;
  }
  .admin_panel__list_title{
    font-size: 24px;
  }
  .admin_panel__list_container{
    padding-top: 32px;
    padding-left: 20px;
    padding-right: 20px;
    animation-duration: 0.5s;
    animation-name: slidein;
  }
  @keyframes slidein {
    from {
      width: 35%;
      opacity:50%
    }

    to {
      width: 100%;
      opacity:100%
    }
  }
  .admin_panel__item{
    margin-bottom: 40px;
  }
  .admin_panel__item_title{
    margin-bottom: 12px;
    font-size: 18px;
  }
  .admin_panel__item_content{
    display: flex;
    flex-flow: row;
  }

  .admin_panel__item__print_color{
    min-width: 34px;
    height: 34px;

    margin-right: 17px;

    background-color:  v-bind("colors.background? colors.background: '#FFFFFF'");
    border: 0.5px dashed #000000;
  }
  .admin_panel__item__input{
    
  }

  .admin_panel__button-cover{
        padding-left: 4px;
        padding-right: 4px;
        width: 25px;
        height:25px;

        background-image: url("@/assets/images/UI/buttons/to_cover.svg");
        background-position: center;
        background-size: 20px 20px;
        background-repeat: no-repeat;
    }
    .admin_panel__button-cover:hover{
        background-size: 17px 17px;
    }

    .button__uncover{
        background-image: url("@/assets/images/UI/buttons/to_uncover.svg");
    }

</style>