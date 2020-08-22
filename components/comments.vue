<template>
  <div>
    <form
      class=" w-full max-w-xs center-items flex-col"
      @submit.prevent="postComment"
    >
      <section class="flex items-end">
        <BaseInput v-model="comment" :value="comment" :label="comment_label" />
        <BaseButton type="submit" class="ml-3">
          Kommentieren
        </BaseButton>
      </section>
      <div v-for="(every_comment, id) in comments" :key="id" class="w-screen">
        <div class="flex flex-col mb-2 self-end relative left-0 ml-3">
          <h3 class="text-white text-xs">
            {{ every_comment.creator_name }}
          </h3>
          <p class="text-white text-xs font-light">
            {{ every_comment.comment_content }}
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import PostService from '@/services/PostService.js'
export default {
  props: {
    post: {
      type: Number,
      required: true
    },
    comments: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      comment: '',
      comment_label: 'Kommentieren'
    }
  },
  methods: {
    postComment() {
      PostService.commentPost({
        group: 1,
        post: this.post,
        data: {
          comment_content: this.comment,
          creator: this.$auth.user.pk,
          post: this.post,
          reply_to: null
        }
      })
        .then((response) => {
          this.comments.push(response.data)
        })
        .catch((e) => {
          this.error({
            statusCode: 503,
            message: 'Unable to post comment'
          })
        })
    }
  }
}
</script>

<style scoped></style>
