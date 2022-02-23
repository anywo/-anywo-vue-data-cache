<template>
  <div class="about">
    <input v-model="text" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "",
    };
  },
  dataCache: ["text"],
};
</script>

<style></style>
