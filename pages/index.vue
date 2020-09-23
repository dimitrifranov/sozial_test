<template>
  <div
    v-touch:swipe.left="swipeLeft"
    v-touch:swipe.right="swipeRight"
    class="w-screen h-screen flex flex-col items-center"
  >
    <section
      class="flex mt-12 justify-around fixed h-8 w-screen max-w-md bg-grey1"
    >
      <button
        class="text-white w-full"
        :class="{ active: isActive('feed') }"
        @click="setActive('feed')"
      >
        Feed
      </button>
      <button
        class="text-white w-full"
        :class="{ active: isActive('groups') }"
        @click="setActive('groups')"
      >
        Gruppen
      </button>
      <button
        class="text-white w-full"
        :class="{ active: isActive('all') }"
        @click="setActive('all')"
      >
        Alles
      </button>
    </section>
    <section
      v-infinite-scroll="loadMore"
      class="w-screen flex flex-col items-center pb-16 pt-32"
      infinite-scroll-disabled="autoLoadDisabled"
      infinite-scroll-distance="10"
    >
      <baseButton
        v-if="$auth.loggedIn && isActive('groups')"
        @clicked="show = true"
      >
        Gruppe wählen
      </baseButton>
      <groupSearch v-if="show" @close="setGroup($event)" />
      <postComponent v-for="(post, i) in posts" :key="i" :post="post" />
    </section>
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
      activeTab: 'feed'
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
    isActive(menuTab) {
      return this.activeTab === menuTab
    },
    setActive(menuTab) {
      this.activeTab = menuTab
      this.$store.dispatch('posts/deletePosts').then(this.loadMore())
    },
    swipeRight() {
      if (this.isActive('groups')) this.setActive('feed')
      else if (this.isActive('all')) this.setActive('groups')
    },
    swipeLeft() {
      if (this.isActive('groups')) this.setActive('all')
      else if (this.isActive('feed')) this.setActive('groups')
    },
    showFeed() {
      this.feed = !this.feed
      this.$store.dispatch('posts/deletePosts').then(this.loadMore())
    },
    loadMore($state) {
      this.loading = true
      if (!this.$auth.loggedIn || this.isActive('all')) {
        this.$store
          .dispatch('posts/publicPosts')
          .then((this.loading = false))
          .catch((e) => {
            this.error({
              statusCode: 503,
              message: 'Unable to get posts'
            })
          })
      } else if (this.isActive('groups')) {
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
      } else if (this.isActive('feed')) {
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

<style scoped>
.active {
  border-bottom: 1px solid white;
}
</style>
