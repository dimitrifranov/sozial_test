<template>
  <div>
    <div class="center-items w-screen flex-col h-screen">
      <div class=" w-full max-w-xs  center-items flex-col">
        <baseToggle v-model="groups" title="Nach Gruppen suchen" />
        <baseInput
          v-model="search_text"
          value="search_test"
          label="Suchen: "
          @input="search"
        />
      </div>
      <div
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="autoLoadDisabled"
        infinite-scroll-distance="10"
        infinite-scroll-immediate-check="false"
      >
        <div v-if="!group_results">
          <userPeek v-for="(result, i) in results" :key="i" :user="result" />
        </div>
        <div v-else>
          <groupPeek
            v-for="(result, i) in results"
            :key="i"
            :group="result"
            :link="true"
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
      groups: false
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
    search($state) {
      this.$store.dispatch('search/deleteResults').then(() => {
        this.loadMore()
      })
    },
    loadMore($state) {
      this.loading = true
      if (this.groups) {
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

<style scoped></style>
