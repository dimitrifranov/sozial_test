<template>
  <div>
    <div
      class="center-items w-full flex-col h-full bg-grey2 absolute top-0 left-0"
    >
      <baseButton
        class="absolute right-0 top-0 mr-3"
        @clicked="groupChosen(null)"
      >
        X
      </baseButton>
      <div class=" w-full max-w-xs center-items flex-col">
        <baseInput
          v-model="search_text"
          inputClass="sticky"
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
        <groupPeek
          v-for="(result, i) in results"
          :key="i"
          :group="result"
          @clicked="groupChosen($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import groupPeek from '@/components/groupPeek.vue'
export default {
  components: {
    groupPeek
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
      this.loading = true
      this.$store.dispatch('search/deleteResults').then(() => {
        this.loadMore()
      })
    },
    loadMore($state) {
      this.loading = true
      this.$store
        .dispatch('search/searchGroups', {
          text: this.search_text
        })
        .then((this.loading = false))
    },
    groupChosen(data) {
      this.$store.dispatch('search/deleteResults').then(() => {
        this.$emit('close', data)
      })
    }
  }
}
</script>

<style scoped></style>
