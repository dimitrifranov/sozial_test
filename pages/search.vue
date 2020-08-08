<template>
  <div>
    <div class="center-items w-screen flex-col h-screen">
      <form
        class=" w-full max-w-xs  center-items flex-col"
        @submit.prevent="loadMore"
      >
        <BaseInput v-model="search_text" value="search_test" label="Suchen:" />
        <BaseButton type="submit">
          Search
        </BaseButton>
      </form>
      <section v-for="(result, i) in results" :key="i" class="text-white">
        {{ result.title }}
      </section>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      search_text: '',
      page: 1,
      loading: false,
      group: 1
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
    loadMore($state) {
      this.loading = true
      this.$store
        .dispatch('search/searchPosts', {
          group: this.group,
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
