import SiteViews from "@/components/UI/SiteViews"
import SiteComments from "@/components/UI/SiteComments"
import SiteTag from "@/components/UI/SiteTag"
import SiteInput from "@/components/UI/SiteInput"
import SiteModal from "@/components/UI/SiteModal"
import ModalDelete from "@/components/UI/ModalDelete"

import ButtonsComponents from "@/components/UI/buttons/index"


export default [
    SiteViews,
    SiteTag,
    SiteComments,
    SiteInput,
    SiteModal,
    ModalDelete,
    ...ButtonsComponents,
]