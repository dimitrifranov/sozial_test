<template>
  <div class="center-items">
    <div class="h-screen max-w-md">
      <h2 class="text-2xl text-white text-center font-light pt-20">
        {{ user.username }}
      </h2>

      <div class="w-screen max-w-md relative pt-3">
        <img
          id="pic"
          src="/Group 8.svg"
          width="100%"
          height="auto"
          class="block z-10 absolute"
        />
        <div class="w-full center-items flex-col relative ">
          <img :src="profilepicture" :width="profile_width" />
          <div class="text-white w-full grid grid-cols-3 profile-info z-20 ">
            <div class="center-items">
              <h3 class="text-center align-middle text-xs">
                {{ user.bio }}
              </h3>
            </div>
            <div class="center-items ">
              <button
                class="triangle absolute bottom-0 z-20"
                :style="triangleStyle"
                @click="action"
                @mouseover="toggle"
                @mouseleave="toggle"
              />
              <div
                class="text-center align-middle transition-colors duration-200 z-30 pointer-events-none"
                :class="{ 'text-grey': hover }"
              >
                <cog-outline-icon
                  v-if="myprofile"
                  title="Settings"
                  :size="24"
                  class="mt-1"
                />
                <p v-else class="text-xs mt-2 font-light">
                  {{ button_text }}
                </p>
              </div>
            </div>
            <div class="center-items flex flex-row items-baseline">
              <nuxt-link
                to="following"
                append
                class="flex flex-col items-center"
              >
                <p class="text-2xs font-light">
                  folgt
                </p>
                <p class="-mt-1 text-lg">
                  {{ user.following.length }}
                </p>
              </nuxt-link>
              <nuxt-link
                to="followers"
                append
                class="flex flex-col items-center pl-2"
              >
                <p class="text-2xs font-light">
                  folgen
                </p>
                <p class="-mt-1 text-lg">
                  {{ user.follower.length }}
                </p>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="autoLoadDisabled"
        infinite-scroll-distance="10"
        class="grid grid-cols-3 gap-1 pb-16"
      >
        <postPreview v-for="(post, i) in posts" :key="i" :post="post" />
      </div>
    </div>
  </div>
</template>

<script>
import postPreview from '@/components/postPreview.vue'
export default {
  components: {
    postPreview
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    postId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      windowWidth: 0,
      hover: false,
      loading: false,
      start: true,
      next: null,
      posts: []
    }
  },
  computed: {
    finish() {
      return !this.start && !this.next
    },
    autoLoadDisabled() {
      return this.loading || this.finish
      // || this.posts.length === 0
    },
    triangleStyle() {
      if (!this.hover) {
        return {
          borderLeft: this.triangle_width + 'px solid transparent',
          borderRight: this.triangle_width + 'px solid transparent',
          borderBottom: this.triangle_width + 'px solid transparent'
        }
      } else {
        return {
          borderLeft: this.triangle_width + 'px solid transparent',
          borderRight: this.triangle_width + 'px solid transparent',
          borderBottom: this.triangle_width + 'px solid white'
        }
      }
    },
    button_text() {
      if (this.myprofile) return 'edit'
      else if (this.following) return 'Entfolgen'
      else return 'Folgen'
    },
    following() {
      if (this.$auth.loggedIn) {
        return this.user.follower.find(
          (obj) => obj.user_from === this.$auth.user.pk
        )
      } else return false
    },
    profilepicture() {
      if (this.user.profile_picture) return this.user.profile_picture
      else return '/user.png'
    },
    myprofile() {
      if (this.$auth.loggedIn && this.$auth.user.pk === this.user.pk)
        return true
      else return false
    },
    triangle_width() {
      if (this.windowWidth > 448) return 448 / 6
      else return this.windowWidth / 6
    },
    profile_width() {
      return this.triangle_width * 2 + 'px'
    }
  },
  mounted() {
    this.windowWidth = window.innerWidth
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }
  },
  methods: {
    getPosts(id, next) {
      if (next) return this.$axios.get(next)
      else return this.$axios.get('/users/' + id + '/posts/')
    },
    loadMore($state) {
      this.loading = true
      this.start = false
      this.getPosts(this.postId, this.next)
        .then((response) => {
          this.next = response.data.next
          this.posts.push(...response.data.results)
        })
        .then((this.loading = false))
        .catch((e) => {
          this.error({
            statusCode: 503,
            message: 'Unable to get posts'
          })
        })
    },
    action() {
      if (this.myprofile) this.$router.push('me/edit')
      else if (this.following) this.unfollow()
      else this.follow()
    },
    follow() {
      if (!this.$auth.loggedIn) this.$router.push('/login')
      this.$axios
        .post('/follow/', {
          user_to: this.user.pk,
          user_from: this.$auth.user.pk
        })
        .then((res) => {
          this.user.follower.push(res.data)
        })
    },
    unfollow() {
      this.$axios
        .delete(
          '/follow/' +
            this.user.follower.find(
              (obj) => obj.user_from === this.$auth.user.pk
            ).id +
            '/'
        )
        .then(() => {
          this.user.follower = this.user.follower.filter(
            (follower) => follower.user_from !== this.$auth.user.pk
          )
        })
    },
    toggle() {
      this.hover = !this.hover
    }
  }
}
</script>

<style scoped>
.profile-info {
  height: 18vw;
}

.triangle {
  transition-property: border-color;
  transition-duration: 200ms;
  width: 0;
  height: 0;
  margin-bottom: 3px;
}

@media only screen and (min-width: 445px) {
  .profile-info {
    height: 5rem;
  }
}
</style>
