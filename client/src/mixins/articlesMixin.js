import { mapState } from 'vuex';
import axios from "axios";
import articleMixin from "@/mixins/articleMixin"

export default{
    mixins: [articleMixin],
    data(){
        return{
            loading: false,
            articles: [],
            pageSize: 5,
            currentPage: 1,
            totalPages: 1,
            query: '',
            resource: '/articles'
        }
    },
    computed: {
        ...mapState({
            URL: state => state.URL,
            saved_articles: state => state.user.body.saved_articles,
            isLogin: state => state.user.isLogin,
            isHidden: state => state.articles.isHidden,
        }),
        url(){
            var url = this.URL.API + this.resource + `?limit=` + this.pageSize + `&page=` + this.currentPage + `&sort_asc=tag`
            if(this.query){
              url += `&query=` + this.query
            }
            if(this.tags){
                this.tags.forEach(tag=>{
                    if(tag.isPressed == true){
                      url += `&tags=` + tag.id
                    }
                })
            }
            return url
        }
    },
    methods: {
        ChangePage(){
            this.currentPage += 1
        },
        ChangeQuery(value){
            this.currentPage = 1
            this.query = value
        },
        async loadArticles(){
            this.loading = true
            
            if(this.currentPage == 1){
                this.articles = []
            }
            var articles = []
            await axios.get(this.url, { withCredentials: true }).then(res => {
              articles = res.data
            })
            articles.rows.forEach(article => {
              this.Decrease(article).then(res => {
                article = res
                if(this.isLogin && this.saved_articles && this.saved_articles.includes(article.info.article_id)){
                  article.isSave = true
                }
                else{
                  article.isSave = false
                }
    
                if(this.isHidden){
                  article.isHidden = true
                }
                else article.isHidden = false
                
                this.articles.push(article)
              })
              .catch(e=>console.log(e))
            })

            this.totalPages = Math.ceil(articles.count / this.pageSize)
    
            this.loading = false
        },
    },
    watch: {
        async url(){
            if(!this.loading) {
                await this.loadArticles()
            }
        }
    },
    mounted() {
        const options = {
            rootMargin: '0px',
            threshold: 1.0
        }
        const callback = (entries, observer) => {
            if(entries[0].isIntersecting && this.currentPage < this.totalPages){
              this.ChangePage()
              //console.log("Пересечение")
            }
        }
        const observer = new IntersectionObserver(callback, options)

        if(this.$refs.observer) {
            observer.observe(this.$refs.observer)
        }
        else{
            //console.log("Отсуствует объект наблюдателя")
        }
    }
}