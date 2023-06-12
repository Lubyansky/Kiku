<template>
    <button class = "cover-button" :class = "{ uncover : isUncover}" title="Свернуть/развернуть">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props:{
        isUncover: {
            type: Boolean
        }
    },
    name: 'cover-button'
}
</script>

<style scoped>
    .cover-button{
        padding-left: 4px;
        padding-right: 4px;
        min-width: 25px;
        height:25px;

        background-image: url("@/assets/images/UI/buttons/to_cover.svg");
        background-position: center;
        background-size: 20px 20px;
        background-repeat: no-repeat;
    }
    .cover-button:hover{
        background-size: 17px 17px;
    }

    .uncover{
        background-image: url("@/assets/images/UI/buttons/to_uncover.svg");
    }

</style>