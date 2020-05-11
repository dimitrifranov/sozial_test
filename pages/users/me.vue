<template>
  <div class="center-items">
    <div class="h-screen max-w-md">
      <h1 class="pt-16 text-2xl text-white text-center font-light">
        dimitri.franov
      </h1>
      <div class="w-full relative pt-3">
        <img src="/Group 8.svg" width="100%" class="block z-10 absolute" />
        <div class="w-full center-items flex-col">
          <img src="/profile.jpg" width="33%" />
          <div class="text-white w-full grid grid-cols-3 profile-info">
            <div class="center-items">
              <p class="text-center align-middle">
                ehrenwertes haus
              </p>
            </div>
            <div class="center-items">
              <p class="text-center align-middle">
                follow
              </p>
            </div>
            <div class="center-items">
              <p class="text-center align-middle">
                121
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-1 pb-16">
        <img src="/icon.png" alt="icon" />
        <img src="/icon.png" alt="icon" />
        <img src="/icon.png" alt="icon" />
        <img src="/icon.png" alt="icon" />
        <img src="/icon.png" alt="icon" />
        <img src="/icon.png" alt="icon" />
        <img src="/icon.png" alt="icon" />
        <img src="/icon.png" alt="icon" />
        <img src="/icon.png" alt="icon" />
        <img src="/icon.png" alt="icon" />
        <img src="/icon.png" alt="icon" />
        <img src="/icon.png" alt="icon" />
        <img src="/icon.png" alt="icon" />
        <img src="/icon.png" alt="icon" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  computed: {
    user() {
      return this.$auth.user
    }
  }
}
</script>

<style scoped>
.profile-info {
  height: 18vw;
}
@media only screen and (min-width: 445px) {
  .profile-info {
    height: 5rem;
  }
}
</style>
