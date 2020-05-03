import Vue from 'vue'
import 'vue-material-design-icons/styles.css'
import ShareIcon from 'vue-material-design-icons/Share.vue'
import CommentOutline from 'vue-material-design-icons/CommentOutline.vue'
import ChevronUp from 'vue-material-design-icons/ChevronUp.vue'
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue'
import HomeOutline from 'vue-material-design-icons/HomeOutline.vue'
import Plus from 'vue-material-design-icons/Plus.vue'
import Magnify from 'vue-material-design-icons/Magnify.vue'
import DotsVertical from 'vue-material-design-icons/DotsVertical.vue'

export default function materialIcons() {
  Vue.component('share-icon', ShareIcon)
  Vue.component('comment-outline', CommentOutline)
  Vue.component('chevron-up', ChevronUp)
  Vue.component('chevron-down', ChevronDown)
  Vue.component('home-outline', HomeOutline)
  Vue.component('plus-icon', Plus)
  Vue.component('magnify-icon', Magnify)
  Vue.component('dots-vertical-icon', DotsVertical)
}
