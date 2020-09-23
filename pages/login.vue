<template>
  <div class="center-items w-screen">
    <form
      class=" w-full max-w-xs h-screen center-items flex-col pt-16 pb-16"
      @submit.prevent="loginUser"
    >
      <baseInput
        v-model.trim="login.username"
        value="username"
        label="Benutzername:"
        @blur="$v.login.username.$touch()"
      />
      <p
        v-if="!$v.login.username.required && $v.login.username.$error"
        class="text-xs text-error font-light -mt-4 mb-4 w-full"
      >
        Bitte Benutzernamen angeben
      </p>
      <baseInput
        v-model.trim="login.password"
        :class="{ error: $v.login.username.$error }"
        value="password"
        label="Passwort:"
        type="password"
        @blur="$v.login.password.$touch()"
      />
      <p
        v-if="!$v.login.password.required && $v.login.password.$error"
        class="text-xs text-error font-light -mt-4 mb-4 w-full"
      >
        Bitte Passwort angeben
      </p>

      <baseButton type="submit">
        Login
      </baseButton>
      <p v-if="login.error" class="text-xs text-error font-light -mt-2 mb-4">
        {{ login.error }}
      </p>
      <nuxt-link
        to="/register"
        class="text-white text-opacity-75 hover:underline text-xs font-light"
      >
        Ich habe noch keinen Account
      </nuxt-link>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import GroupService from '@/services/GroupService.js'

export default {
  mixins: [validationMixin],

  data() {
    return {
      login: { username: '', password: '', error: '' }
    }
  },
  validations: {
    login: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  computed: {
    ...mapState({
      joining: (state) => state.groups.joining
    })
  },
  methods: {
    async loginUser() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        await this.$auth.loginWith('local', {
          data: {
            username: this.login.username,
            password: this.login.password
          }
        })

        if (this.joining.group) {
          await GroupService.joinGroup({
            group: this.joining.group,
            user: this.$auth.user.pk,
            secret: this.joining.secret
          }).then((res) => {
            const group = this.joining.group
            this.$state.dispatch('groups/delJoining')
            if (res.data.id) this.$router.push('/groups/' + group)
          })
        }
        this.$router
          .push('/')

          .catch((e) => {
            this.login.error = 'Falsche Anmeldedaten'
          })
      }
    }
  },
  head() {
    return {
      title: 'Login',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Melde dich an um Freunden zu Folgen'
        }
      ]
    }
  }
}
</script>

<style scoped>
.error {
  @apply border-error;
}
</style>
