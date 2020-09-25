<template>
  <div>
    <form
      class=" w-full max-w-xs center-items flex-col"
      @submit.prevent="postComment"
    >
      <section class="flex items-end">
        <baseInput v-model="comment" :value="comment" :label="comment_label" />
        <baseButton type="submit" class="ml-3">
          Kommentieren
        </baseButton>
      </section>
      <comment
        v-for="(every_comment, id) in comments"
        :key="id"
        class="w-full max-w-xs"
        :comment="every_comment"
      />
    </form>
  </div>
</template>

<script>
import PostService from '@/services/PostService.js'
import comment from '@/components/comment.vue'
export default {
  components: {
    comment
  },
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
      if (!this.$auth.loggedIn) this.$router.push('/login')
      else {
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
}
</script>

<style scoped></style>
