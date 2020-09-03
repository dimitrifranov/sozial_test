<template>
  <div class="center-items">
    <div class="h-screen max-w-md">
      <h1 class="text-2xl text-white text-center font-light pt-20">
        {{ group.name }}
      </h1>

      <div class="w-full relative pt-3">
        <img
          id="pic"
          src="/Group 8.svg"
          width="100%"
          class="block z-10 absolute"
        />
        <div class="w-full center-items flex-col relative ">
          <img :src="profilepicture" width="33%" />
          <div class="text-white w-full grid grid-cols-3 profile-info z-20 ">
            <div class="center-items">
              <p class="text-center align-middle">
                {{ group.description }}
              </p>
            </div>
            <div class="center-items ">
              <button
                class="triangle absolute bottom-0 z-20"
                :style="triangleStyle"
                @click="action"
                @mouseover="toggle"
                @mouseleave="toggle"
              />
              <p
                class="text-center align-middle transition-colors duration-200 z-30 pointer-events-none"
                :class="{ 'text-grey': hover }"
              >
                {{ button_text }}
              </p>
            </div>
            <div class="center-items">
              <p class="text-center align-middle">
                {{ group.group_members.length }}
              </p>
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
import PostService from '@/services/PostService.js'
import GroupService from '@/services/GroupService.js'
import postPreview from '@/components/postPreview.vue'
export default {
  components: {
    postPreview
  },
  props: {
    group: {
      type: Object,
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
      else if (this.member) return 'Austreten'
      else return 'Beitreten'
    },
    member() {
      return this.group.group_members.find(
        (obj) => obj.user === this.$auth.user.pk
      )
    },
    profilepicture() {
      if (this.group.pic) return this.group.pic
      else return '/user.png'
    },
    myprofile() {
      if (
        this.$auth.loggedIn &&
        this.$auth.user.username === this.group.creator_name
      )
        return true
      else return false
    },
    triangle_width() {
      if (this.windowWidth > 448) return 448 / 6
      else return this.windowWidth / 6
    }
  },
  mounted() {
    this.windowWidth = window.innerWidth
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }
  },
  methods: {
    loadMore($state) {
      this.loading = true
      this.start = false
      PostService.getPosts(this.group.id, this.next)
        .then((response) => {
          this.next = response.data.next
          this.posts.push(...response.data.results)
        })
        .then((this.loading = false))
        .catch((e) => {
          this.error({
            statusCode: 503,
            message: 'Unable to get group'
          })
        })
    },
    action() {
      if (this.myprofile) this.$router.push('me/edit')
      else if (this.member) this.leaveGroup()
      else this.joinGroup()
    },
    joinGroup() {
      GroupService.joinGroup({
        group: this.group.id,
        user: this.$auth.user.pk
      }).then((res) => {
        this.group.group_members.push(res.data)
      })
    },
    leaveGroup() {
      GroupService.leaveGroup(
        this.group.group_members.find((obj) => obj.user === this.$auth.user.pk)
          .id
      ).then(() => {
        this.group.group_members = this.group.group_members.filter(
          (members) => members.user !== this.$auth.user.pk
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
