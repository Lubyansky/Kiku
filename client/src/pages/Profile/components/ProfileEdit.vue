<template>
    <div class = "profile__content">


        <profile-content-item class="type1">
            <template v-slot:title>Имя пользователя</template>
            <template v-slot:input>
                <site-input class = "profile__item-input"
                    placeholder="Введите новое имя пользователя" 
                    type="text" 
                    :value = "form.username"
                    @input = "form.username = $event.target.value"
                />
            </template>
        </profile-content-item>


        <profile-content-item class="type2">
            <template v-slot:title>Роль</template>
            <template v-if = "permission.canAssignRoles" v-slot:input>
                <Multiselect
                    v-model="form.roles" 
                    :options="rolesWithoutUserList"
                    label="display"
                    trackBy="id"
                    valueProp="id"
                    mode="tags"
                    placeholder="Выберите роль"
                    noResultsText="Доступных ролей нет"
                    :close-on-select="true"
                    class = ""
                >
                    <template v-slot:tag="{ option, handleTagRemove, disabled }">
                        <div class="multiselect-tag is-user">
                            {{ option.display }}
                            <span
                                v-if="!disabled"
                                class="multiselect-tag-remove"
                                @mousedown.prevent="handleTagRemove(option, $event)"
                            >
                                <span class="multiselect-tag-remove-icon"></span>
                            </span>
                        </div>
                    </template>
                </Multiselect>
            </template>
            <template v-else v-slot:value>{{rolesWithoutUser}}</template>
        </profile-content-item>


        <profile-content-item class="type3">
            <template v-slot:title>Дата регистрации</template>
            <template v-slot:value>{{registrationDate}}</template>
        </profile-content-item>


        <profile-content-item class="type1">
            <template v-slot:title>Имя</template>
            <template v-slot:input>
                <site-input class = "profile__item-input" 
                    placeholder="Введите имя" 
                    type="text" 
                    :value = "form.name"
                    @input = "form.name = $event.target.value"
                />
            </template>
        </profile-content-item>


        <profile-content-item class="type2">
            <template v-slot:title>Фамилия</template>
            <template v-slot:input>
                <site-input class = "profile__item-input" 
                    placeholder="Введите фамилию" 
                    type="text" 
                    :value = "form.surname"
                    @input = "form.surname = $event.target.value"
                />
            </template>
        </profile-content-item>


        <profile-content-item class="type3">
            <template v-slot:title>Email</template>
            <template v-slot:input>
                <site-input class = "profile__item-input" 
                    placeholder="Введите email" 
                    type='email'
                    :value = "form.email"
                    @input = "form.email = $event.target.value"
                />
            </template>
        </profile-content-item>


    </div>
    <div class = "profile__control">
        <div class="profile__control-main">
            <site-button @click = "Close">Закрыть</site-button>
            <site-button class = "profile__control-save" @click="Edit">Сохранить</site-button>
        </div>
    </div>
    <div v-if="error" class = "profile__edit-user-error">{{error}}</div>
</template>

<script>
import Multiselect from '@vueform/multiselect'
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'

export default {
    name: 'profile-edit',
    emits: ['edit'],
    components:{
        Multiselect
    },
    props:{
        user: {
            type: Object
        },
        permission: {
            type: Object
        }
    },
    data(){
        return{
            form:{
                username: '',
                name: '',
                surname: '',
                email: '',
                roles: [],
            },
            error: ''
        }
    },
    computed: {
        ...mapState({
            roles: state => state.roles,
            colors: state => state.settings.colors
        }),
        rolesWithoutUser(){
            var result = ""
            if(this.user.roles){
                this.user.roles.forEach(role =>{
                    if(role.id != "user"){
                        if(result.length)
                            result += ", " + role.display
                        else
                            result += role.display
                    }
                })
                if(!result.length){
                    result += this.roles.find(role => role.id === "user").display
                }
            }
            return result
        },
        rolesWithoutUserList(){
            var result = []
            this.roles.forEach(role =>{
                if(role.id != "user"){
                    result.push(role)
                }
            })
            return result
        },
        registrationDate(){
            return new Date(this.user.createdAt).toLocaleDateString()
        }
    },
    methods: {
        ...mapActions({
            EditUser: 'user/EditUser',
        }),
        ...mapMutations({
            SetUser: 'user/setUser',
        }),
        Close(){
            this.form = {
                username: '',
                name: '',
                surname: '',
                email: '',
                roles: [],
            }
            this.error = ''
            this.$emit('edit')
        },
        async Edit(){
            if(this.form.username == null || this.form.username.length < 4 || this.form.username.length > 10 ){
                this.error = "Имя пользователя должно быть от 4 до 10 символов"
                return;
            }
            if(this.form.username.search('^[a-zA-Z0-9]+$')){
                this.error = "Для имени пользователя допускаются только символы латинского алфавита и цифры"
                return;
            }
            if(this.form.name && this.form.name.search('^[a-zA-Zа-яА-Я]+$')){
                this.error = "Для имени допускаются только символы кириллического и латинского алфавита"
                return;
            }
            if(this.form.name != null && this.form.name.length > 15 ){
                this.error = "Имя не должно превышать 15 символов"
                return;
            }
            if(this.form.surname && this.form.surname.search('^[a-zA-Zа-яА-Я]+$')){
                this.error = "Для фамилии допускаются только символы кириллического и латинского алфавита"
                return;
            }
            if(this.form.surname != null && this.form.surname.length > 15 ){
                this.error = "Фамилия не должна превышать 15 символов"
                return;
            }
            var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

            if(this.form.email && !re.test(this.form.email)){
                this.error = "Некорректный email-адрес"
                return
            }
            this.isEdit = false
            var user = {
                id: this.user.id,
                username: this.form.username,
                name: this.form.name,
                surname: this.form.surname,
                email: this.form.email,
                roles: this.form.roles,
            }
            if(!user.roles.find(role => role === "user"))
                user.roles.unshift(this.roles.find(role => role.id === "user").id)
            
            var err = this.EditUser(user)
            err.then(value => {
                this.error = value
                if(value){
                    return
                }
                else{
                    this.Close()
                }
                var convertRoles = []
                user.roles.forEach(id =>{
                    convertRoles.push(this.roles.find(role => role.id === id))
                })
                this.user.username = user.username,
                this.user.name = user.name,
                this.user.surname = user.surname,
                this.user.email = user.email,
                this.user.roles = convertRoles
                if(this.user_id === this.user.id){
                    this.SetUser(this.user)
                }
            })
        }
    },
    created() {
        var convertRoles = []
        this.user.roles.forEach(role => {
            convertRoles.push(role.id)
        })
        this.form = {
            username: this.user.username,
            name: this.user.name,
            surname: this.user.surname,
            email: this.user.email,
            roles: convertRoles,
        }
        this.error = ''
    }
}
</script>

<style scoped>
    .profile__item-input{
        margin-top: 20px;
        width: 90%;
    }

    .multiselect{
        margin-top: 20px;
        margin-left: 16px;
        margin-right: 0px;
        --ms-tag-bg: v-bind("colors.accent? colors.accent: '#DCA600'");
        --ms-tag-color: #000000;
        --ms-tag-radius: 0px;
        --ms-line-height: 1;
        border: #000000 1px solid;
        border-radius: 0px;

        max-width: 90%;
    }
    .multiselect.is-active{
        box-shadow: none;
    }
    .multiselect.is-open{
        border-radius: 0px;
    }
    .multiselect-clear-icon{
        background-color: #A5A5A5;
    }
    .multiselect-caret{
        background-color: #A5A5A5;
    }

    @media(max-width: 836px){
        .multiselect{
            margin-left: 5%;
            margin-right: 0px;
        }
    }
</style>