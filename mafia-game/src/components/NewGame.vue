<template>
  <section class="new-game-container">
    <b-steps
      class="new-game-wrapper"
      v-model="activeStep"
      :animated="isAnimated"
      :rounded="isRounded"
      :has-navigation="hasNavigation"
      :icon-prev="prevIcon"
      :icon-next="nextIcon"
      :label-position="labelPosition"
      :mobile-mode="mobileMode"
    >
      <b-step-item step="1" :clickable="isStepsClickable">
        <h1 class="new-game-step-title">Time to add players!</h1>
        <AddPlayers />
      </b-step-item>

      <b-step-item step="2"  :clickable="isStepsClickable" :type="{ 'is-success': isProfileSuccess }">
        <p class="new-game-step-title">Mind saying the count?</p>
        Lorem ipsum dolor sit amet.
      </b-step-item>

      <b-step-item step="3" :visible="showSocial" :clickable="isStepsClickable">
        <h1 class="title has-text-centered">Social</h1>
        Lorem ipsum dolor sit amet.
      </b-step-item>

      <template v-if="customNavigation" #navigation="{ previous, next }">
        <b-button outlined type="is-danger" icon-pack="fas" icon-left="backward" :disabled="previous.disabled" @click.prevent="previous.action">
          Previous
        </b-button>
        <b-button outlined type="is-success" icon-pack="fas" icon-right="forward" :disabled="next.disabled" @click.prevent="next.action"> Next </b-button>
      </template>
    </b-steps>
  </section>
</template>

<script>
import AddPlayers from "@/components/AddPlayers.vue";
export default {
  name: "NewGame",
  components: { AddPlayers },
  data() {
    return {
      activeStep: 0,

      showSocial: false,
      isAnimated: true,
      isRounded: true,
      isStepsClickable: false,

      hasNavigation: true,
      customNavigation: false,
      isProfileSuccess: false,

      prevIcon: "chevron-left",
      nextIcon: "chevron-right",
      labelPosition: "bottom",
      mobileMode: "minimalist"
    };
  }
};
</script>

<style>
@import "~@/css/newGameStyle.css";
</style>
