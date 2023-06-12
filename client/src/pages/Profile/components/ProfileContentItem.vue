<template>
    <div class = "profile__item">
        <div class = "profile__item-title"><slot name="title"></slot></div>
        <div class = "profile__item-value" v-if="this.$slots.value"><slot name="value"></slot></div>
        <slot name="input"></slot>
    </div>
</template>

<script>
export default {
    name: 'profile-content-item'
}
</script>

<style scoped>
    .profile__item{
        position: relative;
        height: 100%;
    }
    .profile__item-title{
        color: #A5A5A5;
    }
    .profile__item-value{
        margin-top: 20px;
    }
</style>