<template>
    <table>
        <caption>Доступные статьи</caption>
        <thead>
            <tr>
                <th>#</th>
                <th>Заголовок</th>
                <th>Период</th>
                <th>Автор</th>
                <th>Количество просмотров</th>
                <th>Количество комментариев</th>
                <th>Дата создания</th>
                <th>Открыть</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(article, index) of articles" :key="article.id">
                <td>{{ index + 1 }}</td>
                <td>{{ article.title }}</td>
                <td>{{ article.tag }}</td>
                <td>{{ article.author }}</td>
                <td class="center">{{ article.number_of_views }}</td>
                <td class="center">{{ article.number_of_comments }}</td>
                <td>{{ article.date_of_creation }}</td>
                <td class="center">
                    <button>
                        Перейти
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import {mapState} from 'vuex'

export default {
    data(){
        return{
            articles: [
                {
                    title: 'F',
                    tag: 'A',
                    author: 'F',
                    number_of_views: 'F',
                    number_of_comments: 'F',
                    date_of_creation: 'F',
                }
            ]
        }
    },
    computed: {
      ...mapState({
        colors: state => state.settings.colors
      }),
    },
    methods:{
    }
}
</script>

<style scoped>
    th{
        font-size: 20px;
    }
    td{
        font-size: 18px;
    }
    .center{
        text-align: center;
    }
</style>