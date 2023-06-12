import { mapState } from 'vuex';
import axios from "axios";
import articleMixin from "@/mixins/articleMixin"

export default{
    mixins: [articleMixin],
    data(){
        return{
            comments: [],
            pageSize: 10,
            currentPage: 1,
            totalPages: 1,
        }
    },
    computed: {
        ...mapState({
            URL: state => state.URL,
        }),
        url(){
            var url = this.URL.API + "/articles/" + this.$route.params.id + "/comments?sort_desc=id" + `&limit=` + this.pageSize + `&page=` + this.currentPage
            if(this.query){
              url += `&query=` + this.query
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
        async loadComments(){
            if(this.currentPage == 1){
                this.comments = []
            }
            var comments = []
            await axios.get(this.url, { withCredentials: true }).then(res => {
                comments = res.data
            })

            this.convertComments(this.article.author.author_id, comments.rows).then(res=>{
                this.comments.push(...res)
            })

            this.totalPages = Math.ceil(comments.count / this.pageSize)
        },
        async convertComments(author_id, comments){
            var convertedComments = []
            if(comments){
                comments.forEach(comm =>{
                    var comment = {
                        comment_id: comm.id,
                        date_of_writing: new Date(comm.createdAt).toLocaleDateString(),
                        article_id: comm.article_id,
                        user_id: comm.user_id,
                        name: comm.name,
                        roles: comm.roles,
                        surname: comm.surname,
                        text: comm.text,
                        username: comm.username,
                    }
                    var roles = []
                    comment.roles.forEach(commentRole =>{
                        roles.push(this.$store.state.roles.find(role => role.id === commentRole))
                    })
                    this.$store.getters['user/RolesWithoutAuthor'](roles).then(res => {
                        comment.roles = res
                        if(author_id == comment.user_id){
                            if(comment.roles){
                                comment.roles += ", "
                            }
                            comment.roles += ("Автор")
                        }
                        convertedComments.push(comment)
                    })
                })
            }
            else{
                comments = article.comments_count
            }

            return convertedComments
        }
    },
    watch: {
        url(){
            if(!this.loading) {
                this.loadComments()
            }
        }
    },
    async mounted(){
        const options = {
            rootMargin: '0px',
            threshold: 1.0
        }
        const callback = (entries, observer) => {
            if(entries[0].isIntersecting && this.currentPage < this.totalPages){
              this.ChangePage()
              console.log("Пересечение")
            }
        }
        const observer = new IntersectionObserver(callback, options)
        if(this.$refs.observer) {
            observer.observe(this.$refs.observer)
        }
        else{
            console.log("Отсуствует объект наблюдателя")
        }
    }
}