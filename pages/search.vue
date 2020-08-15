<template>
  <div>
    <div class="center-items w-screen flex-col h-screen">
      <form
        class=" w-full max-w-xs  center-items flex-col"
        @submit.prevent="search"
      >
        <BaseInput v-model="search_text" value="search_test" label="Suchen: " />
        <BaseButton type="submit">
          Suchen
        </BaseButton>
      </form>
      <div
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="autoLoadDisabled"
        infinite-scroll-distance="10"
      >
        <userPeek v-for="(result, i) in results" :key="i" :user="result" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import userPeek from '@/components/userPeek.vue'
export default {
  components: {
    userPeek
  },
  data() {
    return {
      search_text: '',
      loading: false
    }
  },
  computed: {
    autoLoadDisabled() {
      return this.loading || !this.search_text
      // || this.posts.length === 0
    },
    ...mapState({
      results: (state) => state.search.results
    })
  },

  methods: {
    search($state) {
      this.$store.dispatch('search/deleteUsers').then(() => {
        this.loadMore()
      })
    },
    loadMore($state) {
      this.loading = true
      this.$store
        .dispatch('search/searchUsers', {
          text: this.search_text
        })
        .then((this.loading = false))
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
