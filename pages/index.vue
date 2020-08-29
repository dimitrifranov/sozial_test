<template>
  <div>
    <BaseButton class="pt-16" @clicked="show = true">
      Gruppe wählen
    </BaseButton>
    <groupSearch v-if="show" @close="setGroup($event)" />
    <div
      v-infinite-scroll="loadMore"
      class="w-screen flex flex-col items-center"
      infinite-scroll-disabled="autoLoadDisabled"
      infinite-scroll-distance="10"
    >
      <postComponent v-for="(post, i) in posts" :key="i" :post="post" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import groupSearch from '@/components/groupSearch.vue'
import postComponent from '@/components/postComponent.vue'
export default {
  components: {
    postComponent,
    groupSearch
  },
  data() {
    return {
      page: 1,
      loading: false,
      group: 1,
      show: false
    }
  },
  computed: {
    autoLoadDisabled() {
      return this.loading || this.finish
      // || this.posts.length === 0
    },
    finish() {
      return !this.start && !this.next
    },
    ...mapState({
      posts: (state) => state.posts.posts,
      next: (state) => state.posts.next,
      start: (state) => state.posts.start
    })
  },

  methods: {
    setGroup(id) {
      this.show = false
      this.group = id
      this.$store
        .dispatch('posts/deletePosts', this.group)
        .then(this.loadMore())
    },
    loadMore($state) {
      this.loading = true
      this.$store
        .dispatch('posts/fetchPosts', this.group)
        .then((this.loading = false))
        .catch((e) => {
          this.error({
            statusCode: 503,
            message: 'Unable to get posts'
          })
        })
    }
  },
  head() {
    return {
      title: 'Dein Feed',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Hier siehst du die neusten Posts'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
