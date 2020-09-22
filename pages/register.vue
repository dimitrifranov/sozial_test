<template>
  <div class="center-items">
    <form
      class=" w-full max-w-xs h-screen center-items flex-col"
      @submit.prevent="registerUser"
    >
      <baseInput
        v-model.trim="user.first_name"
        value="first_name"
        label="Vorname:"
        @blur="$v.user.first_name.$touch()"
      />
      <p
        v-if="!$v.user.first_name.required && $v.user.first_name.$error"
        class="text-xs text-error font-light -mt-4 mb-4 w-full"
      >
        Bitte Vorname angeben
      </p>
      <baseInput
        v-model.trim="user.last_name"
        value="last_name"
        label="Nachname:"
        @blur="$v.user.last_name.$touch()"
      />
      <p
        v-if="!$v.user.last_name.required && $v.user.last_name.$error"
        class="text-xs text-error font-light -mt-4 mb-4 w-full"
      >
        Bitte Nachname angeben
      </p>
      <baseInput
        v-model.trim="user.username"
        value="username"
        label="Benutzername:"
        @blur="$v.user.username.$touch()"
      />
      <p
        v-if="!$v.user.username.required && $v.user.username.$error"
        class="text-xs text-error font-light -mt-4 mb-4 w-full"
      >
        Bitte Benutzernamen angeben
      </p>
      <p
        v-if="!$v.user.username.minLength && $v.user.username.$error"
        class="text-xs text-error font-light -mt-4 mb-4 w-full"
      >
        Der Benutzername sollte mindestens 4 Zeichen lang sein
      </p>
      <baseInput
        v-model.trim="user.email"
        value="email"
        label="E-mail:"
        @blur="$v.user.email.$touch()"
      />
      <p
        v-if="!$v.user.email.required && $v.user.email.$error"
        class="text-xs text-error font-light -mt-4 mb-4 w-full"
      >
        Bitte E-mail angeben
      </p>
      <p
        v-if="!$v.user.email.email && $v.user.email.$error"
        class="text-xs text-error font-light -mt-4 mb-4 w-full"
      >
        Keine korrekte E-mail
      </p>
      <BaseInput
        v-model.trim="user.password"
        value="password"
        label="Passwort:"
        type="password"
        @blur="$v.user.password.$touch()"
      />
      <p
        v-if="!$v.user.password.required && $v.user.password.$error"
        class="text-xs text-error font-light -mt-4 mb-4 w-full"
      >
        Bitte Passwort angeben
      </p>
      <p
        v-if="!$v.user.password.minLength && $v.user.password.$error"
        class="text-xs text-error font-light -mt-4 mb-4 w-full"
      >
        Das Passwort sollte mindestens 4 Zeichen lang sein
      </p>
      <baseInput
        v-model.trim="user.password2"
        value="password2"
        label="Passwort nochmal:"
        type="password"
        @blur="$v.user.password2.$touch()"
      />
      <p
        v-if="!$v.user.password2.required && $v.user.password2.$error"
        class="text-xs text-error font-light -mt-4 mb-4 w-full"
      >
        Bitte Passwort nochmal angeben
      </p>
      <p
        v-if="!$v.user.password2.sameAsPassword && $v.user.password2.$error"
        class="text-xs text-error font-light -mt-4 mb-4 w-full"
      >
        Die Passwörter stimmen nicht überein
      </p>

      <baseButton type="submit">
        Register
      </baseButton>
      <nuxt-link
        to="/login"
        class="text-white text-opacity-75 hover:underline text-xs font-light"
      >
        Ich habe schon einen Account
      </nuxt-link>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
import UserService from '@/services/UserService.js'
export default {
  mixins: [validationMixin],

  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
        password2: '',
        first_name: '',
        last_name: '',
        follow_post_notifs: true,
        new_follow_notifs: true,
        like_notifs: true,
        comments_notifs: true
      }
    }
  },
  validations: {
    user: {
      username: {
        required,
        minLength: minLength(4)
      },
      password: {
        required,
        minLength: minLength(4)
      },
      email: {
        required,
        email
      },
      first_name: {
        required
      },
      last_name: {
        required
      },
      password2: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  },
  methods: {
    async registerUser() {
      this.$v.$touch()
      if (!this.$v.$invaild) {
        await UserService.registerUser(this.user)
        await this.$auth
          .loginWith('local', {
            data: {
              username: this.user.username,
              password: this.user.password,
              email: this.user.email
            }
          })
          .catch((e) => {
            this.user.error = 'Benutzer existiert bereits'
          })
        this.$router.push('/')
      }
    }
  },
  head() {
    return {
      title: 'Registrieren',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Registriere dich um mehr tolle Features nutzen zu können'
        }
      ]
    }
  }
}
</script>

<style scoped></style>
