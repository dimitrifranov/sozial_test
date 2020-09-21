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
      <div
        v-for="(every_comment, id) in comments"
        :key="id"
        class="w-full max-w-xs"
      >
        <div class="flex flex-row">
          <img
            :src="every_comment.profile_pic"
            class="h-8 w-8 border border-white mr-4"
          />
          <div class="flex flex-col mb-3 h-8">
            <commentUser :comment="every_comment" />
            <p class="text-white text-xs">
              {{ every_comment.comment_content }}
            </p>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import PostService from '@/services/PostService.js'
import commentUser from '@/components/commentUser.vue'
export default {
  components: {
    commentUser
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
