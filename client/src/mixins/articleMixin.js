export default {
    methods: {
        async Expand(article){
            var titles = []
            var paragraphs = []
            var pictures = []
            var sources = []
            article.content.forEach((item, index = 0) => {
                if(index != 0 && item.title) {
                  titles.push(item.title)
                }
                item.paragraphs.forEach(paragraph => {
                  paragraphs.push([index, paragraph.body])
                })
                if(item.picture.url) {
                  pictures[index] = []
                  pictures[index].push(index)
                  pictures[index].push(item.picture.url)
                  pictures[index].push(item.picture.desc)
                  pictures[index].push(item.picture.copyright)
                }
            })
            pictures = pictures.filter(element => element != null)
            
            article.sources.forEach(source =>{
                sources.push(source.body)
            })
            return {
                title: article.info.title.charAt(0).toUpperCase() + article.info.title.slice(1),
                description: article.info.description.charAt(0).toLowerCase() + article.info.description.slice(1),
                tag: article.info.tag,
                preview: article.info.preview,
                titles: titles,
                paragraphs: paragraphs,
                pictures: pictures,
                sources: sources
            }
        },
        async Decrease(article){
            var content = []
            var sources = []

            //Конвертируем параграфы
            var index = 0
            article.paragraphs.forEach(paragraph => {
                if(Number(paragraph[0]) != index){
                index += 1
                }
                if(!content[index]){
                content[index] = {
                    title: '',
                    paragraphs: [],
                    picture: {
                    url: '',
                    desc: '',
                    copyright: '' 
                    }
                }
                }
                content[index].paragraphs.push({body:paragraph[1]})
            })

            //Конвертируем заголовки
            article.titles.forEach((title, index = 0) => {
                content[index + 1].title = title
            })
            
            //Конвертируем картинки
            article.pictures.forEach(picture => {
                content[picture[0]].picture.url = picture[1]
                content[picture[0]].picture.desc = picture[2]
                content[picture[0]].picture.copyright = picture[3]
            })

            //Конвертируем источники
            article.sources.forEach(source =>{
                sources.push({body: source})
            })

            return {
                info: {
                    article_id: article.id,
                    title: article.title,
                    description: article.description,
                    tag: article.tag,
                    date_of_creation: new Date(article.createdAt).toLocaleDateString(),
                    views: article.views,
                    comments_count: article.comments_count,
                    preview: article.preview
                },
                author: {
                    author_id: article.author_id,
                    username: article.username,
                    name: article.name,
                    surname: article.surname
                },
                content: content,
                sources: sources
            }
        }
    }
}