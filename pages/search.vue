<template>
  <div>
    <div
      v-touch:swipe.left="swipeLeft"
      v-touch:swipe.right="swipeRight"
      class="flex items-center w-screen flex-col h-screen"
    >
      <section
        class="flex mt-8 justify-around mb-4 h-12 w-screen max-w-md bg-grey1"
      >
        <button
          class="text-white font-light w-full"
          :class="{ active: isActive('users') }"
          @click="setActive('users')"
        >
          Benutzer
        </button>
        <button
          class="text-white font-light w-full"
          :class="{ active: isActive('groups') }"
          @click="setActive('groups')"
        >
          Gruppen
        </button>
      </section>
      <div class="w-full max-w-xs  center-items flex-col">
        <baseInput
          v-model="search_text"
          value="search_text"
          label="Suchen: "
          @input="search"
        />
      </div>
      <div
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="autoLoadDisabled"
        infinite-scroll-distance="30"
        infinite-scroll-immediate-check="false"
      >
        <div v-if="!group_results" class="pb-16">
          <userPeek v-for="(result, i) in results" :key="i" :user="result" />
        </div>
        <div v-else>
          <groupPeek
            v-for="(result, i) in results"
            :key="i"
            :group="result"
            :link="true"
            @clicked="pushToGroup"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import userPeek from '@/components/userPeek.vue'
import groupPeek from '@/components/groupPeek.vue'
export default {
  components: {
    userPeek,
    groupPeek
  },
  data() {
    return {
      search_text: '',
      loading: false,
      activeTab: 'users'
    }
  },
  computed: {
    autoLoadDisabled() {
      return this.loading || !this.search_text
      // || this.posts.length === 0
    },
    group_results() {
      if (this.results[0]) {
        return this.results[0].description
      } else {
        return false
      }
    },
    ...mapState({
      results: (state) => state.search.results
    })
  },

  methods: {
    isActive(menuTab) {
      return this.activeTab === menuTab
    },
    setActive(menuTab) {
      this.activeTab = menuTab
      this.$store.dispatch('posts/deletePosts').then(this.loadMore())
    },
    swipeLeft() {
      if (this.isActive('users')) this.setActive('groups')
    },
    swipeRight() {
      if (this.isActive('groups')) this.setActive('users')
    },
    search($state) {
      this.$store.dispatch('search/deleteResults').then(() => {
        this.loadMore()
      })
    },
    pushToGroup(group) {
      this.$router.push('/groups/' + group)
    },
    loadMore($state) {
      if (this.search_text) {
        this.loading = true
        if (this.isActive('groups')) {
          this.$store
            .dispatch('search/searchGroups', {
              text: this.search_text
            })
            .then((this.loading = false))
        } else {
          this.$store
            .dispatch('search/searchUsers', {
              text: this.search_text
            })
            .then((this.loading = false))
        }
        // .catch((e) => {
        //   this.error({
        //     statusCode: 503,
        //     message: 'Unable to get results'
        //   })
        // })
      }
    }
  },
  head() {
    return {
      title: 'Suchen',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Durchsuche Sozial.io'
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
