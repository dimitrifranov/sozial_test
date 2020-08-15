<template>
  <div class="center-items w-screen">
    <form
      class=" w-full max-w-xs h-screen center-items flex-col"
      @submit.prevent="loginUser"
    >
      <BaseInput
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
      <BaseInput
        v-model.trim="login.email"
        :class="{ error: $v.login.username.$error }"
        value="email"
        label="E-mail: "
        @blur="$v.login.email.$touch()"
      />
      <p
        v-if="!$v.login.email.required && $v.login.email.$error"
        class="text-xs text-error font-light -mt-4 mb-4 w-full"
      >
        Bitte E-mail angeben
      </p>
      <p
        v-if="!$v.login.email.email && $v.login.email.$error"
        class="text-xs text-error font-light -mt-4 mb-4 w-full"
      >
        Keine korrekte E-mail
      </p>
      <BaseInput
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

      <BaseButton type="submit">
        Login
      </BaseButton>
      <p v-if="login.error" class="text-xs text-error font-light -mt-2 mb-4">
        {{ login.error }}
      </p>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  data() {
    return {
      login: { username: '', password: '', email: '', error: '' }
    }
  },
  validations: {
    login: {
      username: {
        required
      },
      password: {
        required
      },
      email: {
        required,
        email
      }
    }
  },
  methods: {
    loginUser() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$auth
          .loginWith('local', {
            data: {
              username: this.login.username,
              password: this.login.password,
              email: this.login.email
            }
          })
          .then(() => {
            this.$router.push('/')
          })
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
