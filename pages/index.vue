<template>
  <div>
    <div class="w-screen flex flex-col items-center">
      <post />
      <post />
      <post />
      <post />
      <post />
      <post />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import post from '@/components/post.vue'
export default {
  components: {
    post
  },
  // asyncData({ $axios, error }) {
  //   return $axios
  //     .get('http://127.0.0.1:8000/groups')
  //     .then((response) => {
  //       return {
  //         groups: response.data
  //       }
  //     })
  //     .catch((e) => {
  //       error({ statusCode: 503, message: 'Unable to Fetch Events' })
  //     })
  // },
  async fetch({ store, error }) {
    try {
      await store.dispatch('groups/fetchGroups')
    } catch (e) {
      error({ statusCode: 503, message: 'Unable to Fetch Groups' })
    }
  },
  computed: mapState({
    groups: (state) => state.groups.groups
  }),
  head() {
    return {
      title: 'Home Page'
    }
  }
}
</script>

<style lang="scss" scoped></style>
