<template>

    <div class = "profile__content">


        <profile-content-item class="type1">
            <template v-slot:title>Имя пользователя</template>
            <template v-slot:value>{{user.username}}</template>
        </profile-content-item>


        <profile-content-item class="type2">
            <template v-slot:title>Роль</template>
            <template v-slot:value>{{rolesWithoutUser}}</template>
        </profile-content-item>


        <profile-content-item class="type3">
            <template v-slot:title>Дата регистрации</template>
            <template v-slot:value>{{registrationDate}}</template>
        </profile-content-item>


        <profile-content-item class="type1">
            <template v-slot:title>Имя</template>
            <template v-slot:value>{{user.name == null || user.name == "" ? "—" : user.name}}</template>
        </profile-content-item>


        <profile-content-item class="type2">
            <template v-slot:title>Фамилия</template>
            <template v-slot:value>{{user.surname == null || user.surname == "" ? "—" : user.surname}}</template>
        </profile-content-item>


        <profile-content-item class="type3">
            <template v-slot:title>Email</template>
            <template v-slot:value>{{user.email == null || user.email == "" ? "—" : user.email}}</template>
        </profile-content-item>


    </div>

    <div v-if="user_id == user.id || permission.canEditUsers || permission.canBan" class = "profile__control">
        <div v-if = "!isEdit && !isRepass" class="profile__control-main">
          <site-button v-show = "user_id == user.id && !user.is_banned || permission.canEditUsers" @click="$emit('edit')">Редактировать</site-button>
          <site-button v-show = "user_id == user.id && !user.is_banned" @click = "$emit('repass')">Изменить пароль</site-button>
          <site-button v-show = "user_id == user.id || permission.canDeleteUsers" :isDelete="true" @click = "$emit('delete')">Удалить</site-button>
          <site-button v-show = "permission.canBan && !(user_id == user.id) && !rolesWithoutUser.includes('Администратор')" :isDelete="true" @click = "Ban">{{user.is_banned ? 'Разблокировать' : 'Заблокировать'}}</site-button>
        </div>
    </div>

</template>

<script>
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'

export default {
    name: 'profile-content',
    emits: ['edit', 'repass', 'delete'],
    props: {
        user: {
            type: Object
        },
        isEdit: {
            type: Boolean
        },
        isRepass: {
            type: Boolean
        },
        isDelete: {
            type: Boolean
        }
    },
    data(){
        return {
        }
    },
    computed:{
        ...mapState({
            permission: state => state.permission,
            user_id: state => state.user.body.id,
            roles: state => state.roles,
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
        registrationDate(){
            return new Date(this.user.createdAt).toLocaleDateString()
        }
    },
    methods: {
        ...mapActions({
            BanControl: 'user/BanControl'
        }),
        async Ban(){
            if(this.user.is_banned){
                this.user.is_banned = false
                await this.BanControl({is_banned:false, user_id:this.user.id})
            }
            else{
                this.user.is_banned = true
                await this.BanControl({is_banned:true, user_id:this.user.id})
            }
        }
    }
}
</script>

<style scoped>

</style>