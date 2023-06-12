<template>
    <button>
      <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'login-button'
}
</script>

<style scoped>
    button{
        width:35px;
        height:35px;

        background-image: url("@/assets/images/UI/login.svg");
        background-position: center;
        background-size: 32px 32px;
        background-repeat: no-repeat;
    }
    button:hover{
        background-size: 27px 27px;
    }
</style>