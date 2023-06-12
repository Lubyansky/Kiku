<template>
    <div class = "modal-delete" v-click-outside="ClickOutside">
        <h1 class="modal-title">
            <slot name="title">
                Удаление
            </slot>
        </h1>

        <div class="modal-body">
            <slot name="body">
                Вы уверены?
            </slot>
        </div>

        <div class = "modal-buttons">
            <button class = "modal-button" href="/" @click="$emit('execute')">Да</button>
            <button class = "modal-button" @click="$emit('close')">Нет</button>
        </div>
        
    </div>
</template>

<script>
import {mapState} from 'vuex'
import vClickOutside from 'click-outside-vue3'

export default {
    name: 'modal-delete',
    directives: {
        clickOutside: vClickOutside.directive
    },
    computed: {
        ...mapState({
            colors: state => state.settings.colors
        }),
    },
    methods:{
        ClickOutside() {
            this.$emit('close')
        },
    }
}
</script>

<style>
    .modal-delete{
        width: 400px;
        height: 300px;
        padding-top: 50px;
        padding-bottom: 50px;

        display:flex;
        flex-flow: column;
        justify-content: space-between;
        align-items: center;

        color: v-bind("colors.complementary ? colors.complementary : '#FFF6F6'");
        background-color: v-bind("colors.main? colors.main: '#8D0909'");
        box-shadow: 4px 4px 4px v-bind("colors.main? colors.main+'40': '#8D0909'+'40'");
    }
    .modal-title{
        
    }
    .modal-body{
        
        font-size: 24px;
        line-height: 26px;
    }
    .modal-buttons{
        
    }
    .modal-button{
        margin-left: 20px;
        margin-right: 20px;
        width: 100px;
        height: 40px;
        font-size: 20px;
        line-height: 22px;
        color:v-bind("colors.complementary ? colors.complementary : '#FFF6F6'");
        border: 1px solid v-bind("colors.complementary ? colors.complementary : '#FFF6F6'");
    }
    .modal-button:hover{
        color:#000000;
        background-color: v-bind("colors.accent? colors.accent: '#DCA600'");
        border: 1px solid v-bind("colors.accent? colors.accent: '#DCA600'");
    }
</style>