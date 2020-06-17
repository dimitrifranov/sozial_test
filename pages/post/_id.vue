<template>
  <div class="flex flex-col items-center h-screen">
    <postComponent :post="post" />
    <form
      class=" w-full max-w-xs center-items flex-col"
      @submit.prevent="postComment"
    >
      <BaseInput v-model="comment" :value="comment" :label="comment_label" />
      <BaseButton type="submit">
        Comment
      </BaseButton>
    </form>
  </div>
</template>

<script>
import postComponent from '@/components/postComponent.vue'

export default {
  components: {
    postComponent
  },
  asyncData({ $axios, route, error }) {
    return $axios
      .get('http://localhost:8000/groups/1/posts/' + route.params.id + '/')
      .then((response) => {
        return {
          post: response.data
        }
      })
      .catch((e) => {
        error({
          statusCode: 503,
          message: 'Unable to get this Post'
        })
      })
  },
  data() {
    return {
      comment: '',
      comment_label: 'Kommentieren'
    }
  },
  methods: {
    postComment() {
      // this.$sore
    }
  }
}
</script>

<style scoped></style>
