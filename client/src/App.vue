<template>
  <div class = "app__container">
    <site-header/>
    <site-search v-if="isShowSearch"/>
    <site-menu v-if="isShowMenu"/>
    <router-view></router-view>
    <site-modal v-if="isShowModal" @close="SetShowAuthModal(false)">
      <authorization/>
    </site-modal>
    <site-footer/>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
  data(){
    return{

    }
  },
  computed: {
    ...mapState({
      widthWindow: state => state.widthWindow,
      isShowModal: state => state.showAuthModal,
      isShowMenu: state => state.showMenu,
      isShowSearch: state => state.showSearch,
    })
  },
  created() {
    window.addEventListener('resize', this.updateWidth());
  },
  methods:{
    ...mapMutations({
      SetWidthWindow: 'setWidthWindow',
    }),
    updateWidth() {
      this.SetWidthWindow(window.innerWidth)
    }
  }
}
</script>

<style>
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  @font-face {
    font-family: "Alice-Regular";  
    src: url("@/assets/fonts/Alice-Regular.ttf") format("truetype"); 
    font-style: normal; 
    font-weight: normal;
  }

  [v-cloak] {
    display: none;
  }  

  #mobile {
    display: none;
  }
  body {
    font-family: 'Alice-Regular';
    font-weight: 400;
    overflow-x: hidden;
  }
  button {
    background: none;
    border:none;
    outline:none;
  }
  img {
    image-rendering: optimizeQuality;
    object-fit: cover;
    max-width: 100%;
  }

  input::placeholder {
    padding-left: 2px;
    color: #ffffff;
    font-size: 16px;
  }

  label { 
    -webkit-appearance: push-button;
    -moz-appearance: button; 
    display: inline-block;
    cursor: pointer;
  }

  li {
      list-style-type: none;
  }
  ul {
      padding-left: 0;
  }

  h1 {
    margin: 0;
    font-style: normal; 
    font-weight: normal;
  }

  h2 {
    margin: 0;
    font-style: normal; 
    font-weight: normal;
  }

  .app__container {
    height: auto;
    left: 0px;
    top: 0px;
  }

  .loader {
    font-size: 10px;
    margin: 50px auto;
    text-indent: -9999em;
    width: 11em;
    height: 11em;
    border-radius: 50%;
    background: #dca600;
    background: -moz-linear-gradient(left, #dca600 10%, rgba(220,166,0, 0) 42%);
    background: -webkit-linear-gradient(left, #dca600 10%, rgba(220,166,0, 0) 42%);
    background: -o-linear-gradient(left, #dca600 10%, rgba(220,166,0, 0) 42%);
    background: -ms-linear-gradient(left, #dca600 10%, rgba(220,166,0, 0) 42%);
    background: linear-gradient(to right, #dca600 10%, rgba(220,166,0, 0) 42%);
    position: relative;
    -webkit-animation: load3 1.4s infinite linear;
    animation: load3 1.4s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  .loader:before {
    width: 50%;
    height: 50%;
    background: #dca600;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }
  .loader:after {
    background: #ffffff;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  @-webkit-keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  .editor {
      width: 100%;
      border: 1px solid;
      white-space: pre-wrap;
      -webkit-user-select: text;
      -moz-user-select: text;
      -ms-user-select: text;
      user-select: text;
    }

  .editor:empty:after {
    content: "";
  }

  .editor * {
    all: inherit !important;
    color: inherit !important;
    background: none !important;
    white-space: pre !important;
    line-height: inherit !important;
    padding: 0 !important;
    border: none !important;
    outline: none !important;
    resize: none !important;
    display: inline !important;
  }

  .editor div {
    display: block !important;
  }
  .editor[placeholder]:empty:before {
    content: attr(placeholder);
    color: #A5A5A5; 
  }

  ::-webkit-scrollbar {
    width: 15px;
  }
  ::-webkit-scrollbar-track {
    background-color: #FFF6F6;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #A5A5A5;
  }

  .link_black {
    color:#000000;
    text-decoration: none;
  }
</style>