<template>
    <div v-click-outside="ClickOutside">
        <form class = "search__container">
            <input class = "search__input" type="text" :value = "query" @input = "query = $event.target.value" ref="input">
        </form>
        <div class = "search__results" v-show = "searchResults">
            <div class = "search__results__container">
                <a class = "search__result" v-for="result in searchResults" :key="result" :href="result.link">{{result.title}}</a>
            </div>
        </div>
    </div>
</template>

<script>
import vClickOutside from 'click-outside-vue3'
import {mapMutations, mapState} from 'vuex'
import axios from "axios";

export default {
    name: "site-search",
    data(){
        return {
            query: null,
            searchResults: null
        }
    },
    directives: {
        clickOutside: vClickOutside.directive
    },
    computed: {
        ...mapState({
            tags: state => state.tags,
            URL: state => state.URL
        }),
    },
    methods: {
        ...mapMutations({
            SetShowSearch: 'setShowSearch'
        }),
        ClickOutside() {
            this.SetShowSearch(false)
        }
    },
    mounted(){
        this.$refs.input.focus()
    },
    watch: {
        async query(){
            if(this.query.trim()){
                var result = []
                if(this.query.toLowerCase().trim().substring(0,1) == "@" && this.query.toLowerCase().trim().substring(1,this.query.length)){
                    const url = (this.URL.API + "/users?query=" + this.query.toLowerCase().trim().substring(1,this.query.length))
                    await axios.get(url).then(res => {
                        if(res.data.count){
                            res.data.rows.forEach(user =>{
                                result.push({
                                    title: (user.name || user.surname) ? ((user.name ? user.name : '') + ' ' + (user.surname ? user.surname : '')) : user.username,
                                    link: '/profile/' + user.id
                                })
                            })
                        }
                    })
                }
                else{
                    this.tags.forEach(tag => {
                        if(tag.title.toLowerCase().trim().includes(this.query.toLowerCase().trim())){
                            result.push({title: tag.title + " [Период]", link: '/articles?tags=' + tag.id})
                        }
                    })
                    const url = (this.URL.API + "/articles?query=" + this.query.toLowerCase().trim())
                    await axios.get(url).then(res => {
                        if(res.data.count){
                            res.data.rows.forEach(data =>{
                                result.push({
                                    title: data.title,
                                    link: '/articles/' + data.id
                                })
                            })
                        }
                    })
                }
                if(this.query)
                    this.searchResults = result
            }
            else{
                this.searchResults = null
            }
        }
    }
}
</script>

<style scoped>
    .search__input {
        width: 100%;
        height: 60px;
        position: fixed;
        z-index: 150;

        left:0;
        top: 80px;
        padding-left:50px;
        padding-right:50px;

        font-size: 38px;

        color: #000000;
        background-color: #ffffff;
        border:none;
        outline:none;
        border-bottom: solid 1px #000000;
    }
    .search__results{
        position: fixed;
        left: 0px;
        top: 140px;
        width: 100vw;
        z-index: 10000;
    }
    .search__results__container{
        width: calc(100% + -14px);
        height: 100%;
        max-height: 60vh;
        overflow-y: auto;

        /*display: flex;
        flex-flow: column;*/

        background-color: #8D0909;
    }
    .search__results__container::after{
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        bottom: 0px;
        left: 0px;
        background-color: #FFF6F6;
    }
    .search__results__container::-webkit-scrollbar {
        width: 15px;
    }

    .search__results__container::-webkit-scrollbar-track {
        background-color: #FFF6F6;
        border: none;
    }

    .search__results__container::-webkit-scrollbar-thumb {
        background-color: #DCA600;
        border: none;
    }
    .search__result{
        padding: 15px 50px 15px 50px;
        width: 100%;
        min-height: 60px;

        color:#ffffff;
        text-decoration: none;

        position: relative;
        display: flex;
        align-items:center;

        font-weight: normal;
        font-size: 28px;
        line-height: 30px;

        /*transition: color .1s ease-in-out;*/
    }
    .search__result:hover{
        background-color:#DCA600;
        color: #000000;
    }
    .search__result::after{
        content: "";
        position: absolute;
        top: 0px;
        left:0px;
        width: 100%;
        height: 1px;
        background-color: #000000;
    }
    @media (max-width: 992px) {
        .search__input {
            padding-left:25px;
            padding-right:25px;
            font-size: 24px;
        }   
        .search__results__container{
            width: 100%;
        }
        .search__results__container::-webkit-scrollbar {
            display: none;
        }
        .search__result{
            padding: 15px 25px 15px 25px;
            width: 100%;
            min-height: 60px;

            font-size: 18px;
            line-height: 22px;

        }
    }
</style>
