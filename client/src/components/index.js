import Authorization from "@/components/Authorization"
import Menu from "@/components/Menu"
import Search from "@/components/Search"
import MenuComponents from "@/components/Navigation/index"
import CommentComponents from "@/components/Comments/index"
import ArticleComponents from "@/components/Articles/index"
import UIComponents from "@/components/UI/index"

import ProfileComponents from "@/pages/Profile/index"


export default [
    Authorization,
    Menu,
    Search,
    ...MenuComponents,
    ...CommentComponents,
    ...ArticleComponents,
    ...UIComponents,

    ...ProfileComponents
]