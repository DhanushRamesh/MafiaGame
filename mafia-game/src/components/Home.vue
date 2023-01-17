<template>
  <div class="home-container">
    <img :src="require('@/assets/mafia.png')" alt="" class="brand-img" />
    <b-button class="start-btn" rounded type="is-danger" tag="router-link" to="/new">Play</b-button>
  </div>
</template>

<script>
export default {
  name: "HomePage"
};
</script>

<style>
@import "~@/css/homePageStyle.css";
</style>
