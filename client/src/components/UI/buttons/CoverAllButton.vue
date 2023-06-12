<template>
    <button class = "cover-all-button" :class = "{ uncover_all : !isCoverAll}" title="Свернуть/развернуть все">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props:{
        isCoverAll: {
            type: Boolean
        }
    },
    name: 'cover-all-button'
}
</script>

<style scoped>
    .cover-all-button{
        position:-webkit-sticky; 
        position: sticky;
        
        top:15px;
        width: 25px;
        height:25px;

        background-image: url("@/assets/images/UI/buttons/to_cover_all.svg");
        background-position: center;
        background-size: 20px 25px;
        background-repeat: no-repeat;
    }

    .cover-all-button:hover{
        background-size: 17px 22px;
    }

    .uncover_all{
        background-image: url("@/assets/images/UI/buttons/to_uncover_all.svg");
    }

</style>