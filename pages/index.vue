<template>
  <div>
    <div
      v-infinite-scroll="loadMore"
      class="w-screen flex flex-col items-center pt-16"
      infinite-scroll-disabled="autoLoadDisabled"
      infinite-scroll-distance="10"
    >
      <postComponent v-for="(post, i) in posts" :key="i" :post="post" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import postComponent from '@/components/postComponent.vue'
export default {
  components: {
    postComponent
  },
  data() {
    return {
      page: 1,
      loading: false,
      group: 1
    }
  },
  computed: {
    autoLoadDisabled() {
      return this.loading
      // || this.posts.length === 0
    },
    ...mapState({
      posts: (state) => state.posts.posts
    })
  },

  methods: {
    loadMore($state) {
      this.loading = true
      this.$store
        .dispatch('posts/fetchPosts', this.group)
        .then((this.loading = false))
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
