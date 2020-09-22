<template>
  <div>
    <div
      v-infinite-scroll="loadMore"
      class="w-screen flex flex-col items-center pt-16 pb-16"
      infinite-scroll-disabled="autoLoadDisabled"
      infinite-scroll-distance="10"
    >
      <baseButton v-if="$auth.loggedIn" @clicked="showFeed">
        Feed
      </baseButton>
      <baseButton v-if="$auth.loggedIn" @clicked="show = true">
        Gruppe wählen
      </baseButton>
      <groupSearch v-if="show" @close="setGroup($event)" />
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
      show: false,
      feed: false
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
      if (id) {
        this.group = id
        this.$store.dispatch('posts/deletePosts').then(this.loadMore())
      }
    },
    showFeed() {
      this.feed = !this.feed
      this.$store.dispatch('posts/deletePosts').then(this.loadMore())
    },
    loadMore($state) {
      this.loading = true
      if (!this.$auth.loggedIn) {
        this.$store
          .dispatch('posts/publicPosts')
          .then((this.loading = false))
          .catch((e) => {
            this.error({
              statusCode: 503,
              message: 'Unable to get posts'
            })
          })
      } else if (!this.feed) {
        this.$store
          .dispatch('posts/fetchPosts', {
            group: this.group,
            user: this.$auth.user.pk
          })
          .then((this.loading = false))
          .catch((e) => {
            this.error({
              statusCode: 503,
              message: 'Unable to get posts'
            })
          })
      } else {
        this.$store
          .dispatch('posts/fetchFeed', this.$auth.user.pk)
          .then((this.loading = false))
          .catch((e) => {
            this.error({
              statusCode: 503,
              message: 'Unable to get posts'
            })
          })
      }
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
