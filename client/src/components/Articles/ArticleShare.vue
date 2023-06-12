<template>
    <div class = "article__share">
        <a class = "share__link link_black" v-for="social in socials" :key="social.id" :href = "social.link" target="_blank">
			<img class="share__link__icon" :src = "social.icon" :alt="social.name + ' icon'">
		</a>
	</div>
</template>
  
<script>
import {mapState} from 'vuex'

export default {
    name: 'article-share',
    data () {
        return{
            socials: [
                {
                    id: 0,
                    name: 'VK',
                    icon: '/assets/images/social/share_icon-vk.svg',
                    link: ''
                },
                {
                    id: 1,
                    name: 'Odnoklassniki',
                    icon: '/assets/images/social/share_icon-ok.svg',
                    link: ''
                },
                {
                    id: 2,
                    name: 'Telegram',
                    icon: '/assets/images/social/share_icon_telegram.png',
                    link: ''
                }
            ]
        }
    },
    computed: {
        ...mapState({
            URL: state => state.URL,
            colors: state => state.settings.colors
        }),
    }
}
</script>
  
<style scoped>
    .article__share{
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 42px;
        max-width: 660px;
        width: 100%;
        height: 100%;

        display: flex;
        flex-flow: wrap;
        justify-content: center;
    }
    .share__link{
        margin-left: 9px;
        margin-right: 9px;
        margin-bottom: 20px;
        width: 140px;
        height: 40px;

        display: flex;
        justify-content: center;
        align-items: center;

        outline: 2px solid #A5A5A5;
        transition: all 0.4s ease;
        box-shadow: 0px 0px 4px 0px #00000040;

    }
    .share__link:hover{
        background:v-bind("colors.accent? colors.accent+'BF': '#DCA600'+'BF'");
        outline-color: v-bind("colors.accent? colors.accent: '#DCA600'");
    }
    .share__link__icon{
        width: 30px;
        height: 30px;
        background-position: center;
        background-size: 30px 30px;
        background-repeat: no-repeat;
    }

    @media (max-width: 992px){
        .article__share{
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 62px;
            width: 100%;
            height: 100%;
        
            display: flex;
            justify-content: center;
        }
        .share__link{
            margin-left: 9px;
            margin-right: 9px;
            width: 90.6px;
            height: 36.25px;
        
            display: flex;
            justify-content: center;
            align-items: center;
        
            outline: 2px solid #A5A5A5;
            transition: all 0.4s ease;
        }
        .share__link:hover{
            background:v-bind("colors.accent? colors.accent+'BF': '#DCA600'+'BF'");
            outline-color: v-bind("colors.accent? colors.accent: '#DCA600'");
        }
        .share__link__icon{
            width: 27.2px;
            height: 27.2px;
            background-position: center;
            background-size: 27.2px 27.2px;
            background-repeat: no-repeat;
        }
    }
</style>