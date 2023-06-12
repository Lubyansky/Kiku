<template>
    <button class = "button" :class = "{button_delete: isDelete}">
        <slot></slot>
    </button>
</template>

<script>
import {mapState} from 'vuex'

export default {
    props: {
        isDelete: {
            type: Boolean
        }
    },
    name: 'site-button-small',
    computed:{
        ...mapState({
            colors: state => state.settings.colors
        })
    },
}
</script>

<style scoped>
    .button{
        margin-left:15px;
        margin-right: 15px;
        width: 130px;
        height: 40px;
        color: #000000;
        border: 1px solid #000000;
        font-size: 18px;
        box-shadow: 4px 4px 4px v-bind("colors.main ? colors.main+'40': '#8D0909'+'40'");
        transition: all 0.4s ease;
    }
    .button:hover{
        border: 1px solid #000000;
        background-color: v-bind("colors.accent ? colors.accent: '#DCA600'");
    }
    .button_delete{
        color: v-bind("colors.main? colors.main: '#8D0909'");
        border: 1px solid v-bind("colors.main ? colors.main: '#8D0909'");
    }
    .button_delete:hover{
        color: v-bind("colors.complementary ? colors.complementary : '#FFF6F6'");
        background-color: v-bind("colors.main ? colors.main: '#8D0909'");
        border: 1px solid v-bind("colors.main ? colors.main: '#8D0909'");
    }
</style>