<template>
    <button></button>
</template>

<script>
export default {
    name: 'search-button'
}
</script>

<style scoped>
    button{
        width: 30px;
        height:30px;

        background-image: url("@/assets/images/UI/find_search.svg");
        background-position: center;
        background-size: 30px 30px;
        background-repeat: no-repeat;
    }
    button:hover{
        background-size: 25px 25px;
    }
</style>