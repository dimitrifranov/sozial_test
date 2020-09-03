<template>
  <div>
    <section class="bg-grey max-w-md pb-5">
      <div class="bg-grey-3 h-8 w-full clearfix">
        <div class="float-left h-full">
          <!--todo   make image nuxt-link to post_link-->
          <img
            :src="profilepicture"
            alt="icon"
            class="h-8 w-8 border border-white"
          />
        </div>
        <div class="float-left h-full">
          <nuxt-link :to="creator_link" class="text-white ml-3">
            {{ post.creator_name }}
          </nuxt-link>
        </div>
        <div
          v-if="webShareApiSupported"
          class="float-right h-full w-8 center-items"
        >
          <share-icon fillColor="#ffffff" class="" @click="shareViaWebShare" />
        </div>
      </div>
      <img
        :src="post.src"
        :alt="post.title"
        class="w-screen"
        @click="$router.push(post_link)"
      />
      <div class=" h-8 w-full clearfix">
        <div class="h-full float-left center-items ml-3 text-xs">
          <p class="text-white">
            {{ post.title }}
          </p>
        </div>

        <div class="h-full float-right center-items w-8">
          <p class="text-s text-white font-light">
            {{ likes }}
            <!-- {{ liked }} -->
          </p>
        </div>
        <div
          class="h-full float-right center-items w-8 cursor-pointer"
          @click="likePost"
        >
          <chevron-up :fillColor="fillColor" :size="size" />
        </div>
        <nuxt-link :to="post_link" class="h-full float-right center-items w-8">
          <comment-outline fillColor="#ffffff" />
        </nuxt-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      size: 32,
      just_liked: false,
      state_likes: 0
    }
  },
  computed: {
    profilepicture() {
      if (this.post.profile_pic) return this.post.profile_pic
      else return '/user.png'
    },
    creator_link() {
      return '/users/' + this.post.creator
    },
    fillColor() {
      if (!this.liked) return '#ffffff'
      else return '#000'
    },
    liked() {
      if (this.$auth.loggedIn) {
        if (this.post.likes.length < this.state_likes) return true
        else if (this.post.likes[0]) {
          return (
            !!this.post.likes.find(
              (like) => like.liker === this.$auth.user.pk
            ) || this.just_liked
          )
        } else return false
      } else return false
    },
    likes() {
      return this.post.likes.length > this.state_likes
        ? this.post.likes.length
        : this.state_likes
    },
    webShareApiSupported() {
      try {
        return navigator.share
      } catch (error) {
        return false
      }
    },
    post_link() {
      return '/post/' + this.post.id
    }
  },
  methods: {
    likePost() {
      if (!this.liked && this.$auth.loggedIn) {
        this.just_liked = true
        this.state_likes = this.likes
        this.state_likes++
        this.$store
          .dispatch('posts/likePost', {
            group: this.post.group,
            post: this.post.id,
            data: {
              liker: this.$auth.user.pk,
              post: this.post.id
            }
          })
          .catch((e) => {
            this.error({
              statusCode: 503,
              message: 'Unable to like Post'
            })
          })
      }
    },
    shareViaWebShare() {
      try {
        navigator.share({
          title: this.post.title,
          text: '',
          url: 'https://social-tests.herokuapp.com/post/' + this.post.id + '/'
        })
      } catch (e) {
        this.error({
          statusCode: 500,
          message: 'Unable to share post'
        })
      }
    }
  }
}
</script>

<style scoped></style>
