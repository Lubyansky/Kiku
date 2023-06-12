<template>
    <div class = "sources">
        <div class = "title">Источники и литература</div>
		<div class = "container">
			<div class = "source" v-for = "source in sources" :key="source">{{source.body}}</div>
		</div>
    </div>
</template>
  
<script>
    export default {
        name: 'article-sources',
        props: {
            sources: {
                type: Array
            }
        }
    }
</script>
  
<style scoped>
    .sources{
        position: relative;
        width: 100%;
        max-width: 660px;
        margin-top: 42.5px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 102px;
        display: flex;
        
        font-size: 16px;
    }

    .sources::after{
        position: absolute;
        content: "";
        bottom: -32px;
        width: 100%;
        height: 1px;
        background-color: #A5A5A5;
    }

    .title{
        position: relative;
        max-width: 120px;
        width: 100%;
        height: 100%;
    }
    .container{
        max-width: 540px;
        width: 100%;
        height: 100%;
    }

    .container::after{
        position: absolute;
        content: "";
        top:0;
        width: 1px;
        height: calc(100% + 10px);
        background-color: #A5A5A5;
    }

    .source{
        padding-left: 20px;
        padding-bottom: 6px;
    }

    @media (max-width: 992px){
        .sources{
            padding-left: 15px;
            padding-right: 15px;
            margin-top: 42.5px;
            margin-bottom: 72px;

            display: flex;
            flex-flow: column;
            
            font-size: 16px;
        }
        
        .sources::before{
            position: absolute;
            content: "";
            left:15px;
            bottom: -25px;
            width: calc(100% - 30px);
            height: 1px;
            background-color: #A5A5A5;
        }

        .sources::after{
            position: absolute;
            content: "";
            left:15px;
            top: -14px;
            width: calc(100% - 30px);
            height: 1px;
            background-color: #A5A5A5;
        }
        
        .title{
            padding-bottom: 25px;
            position: relative;
            max-width: 100%;
            width: 100%;
            height: 100%;

            font-size: 15px;
            line-height: 17px;
            text-align: center;
        }

        .container::after{
            display:none;
        }
        
        .source{
            padding-left: 0px;
        }
    }
</style>