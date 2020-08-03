<template>
  <div class="container mb-4">
    <section class="flex justify-center items-center">
      <h3 class="block text-white font-light text-s mr-4">
        {{ title }}
      </h3>
      <label class="switch">
        <input type="checkbox" @change="$emit('changed')" />
        <span class="slider" />
      </label>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
/* .switch {
  @apply relative w-16 h-8 border border-white flex justify-start items-center;
}
.switch input {
  @apply opacity-0 w-0 h-0;
}

.slider {
  @apply relative cursor-pointer inset-0 bg-white h-5 w-5 ml-2;
}

.slider:before {
  @apply relative duration-500 transition-all;
}

input:checked + .slider {
  @apply bg-white1 translate-x-2;
}

input:checked + .slider:before {
  @apply translate-x-2;
} */

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #212121;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border: 1px solid white;
  opacity: 25%;
}

.slider:before {
  position: absolute;
  content: '';
  height: 24px;
  width: 24px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #292b2c;
  opacity: 100%;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* .slider:before {
  @apply absolute h-6 w-6 bg-white;
}

input:checked + .slider {
  @apply bg-blue-600;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
} */
</style>
