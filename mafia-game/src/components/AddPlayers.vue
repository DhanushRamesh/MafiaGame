<template>
  <div class="add-players-container">
    <!-- ==================== Add player action ==================== -->
    <section class="add-player-action-container">
      <b-input v-model="playerName" type="is-success" placeholder="Enter player name" maxlength="10"></b-input>
      <b-button @click="addPlayer" type="is-success">Add</b-button>
    </section>
    <!-- ================== / Add player action ==================== -->

    <!-- ====================== Players List ======================== -->
    <section class="added-players-list-container">
      <ul class="players-list">
        <li v-for="player in playersList" :key="player.name">
          {{ player.name }}
        </li>
      </ul>
    </section>
    <!-- ===================== / Players List ======================== -->
  </div>
</template>

<script>
export default {
  name: "AddPlayers",

  data() {
    return {
      playerName: "",
      playersList: []
    };
  },

  mounted() {
    this.updatePlayersList();
  },

  methods: {
    addPlayer() {
      /* ****** Adds Player to the players list ****** */
      if (localStorage.getItem("playersList") === null) {
        this.createPlayersListAndAddPlayer();
      } else {
        this.addPlayerToExistingPlayersList();
      }
      this.playerName = "";
    },

    createPlayersListAndAddPlayer() {
      /* ****** Create a new player object and set to local storage ****** */
      let playerObjStr = this.createNewPlayer();
      localStorage.setItem("playersList", playerObjStr);
      this.updatePlayersList();
    },

    addPlayerToExistingPlayersList() {
      /* ****** Create a new player object and append to existing local storage *******/
      let playerObjStr = this.createNewPlayer();

      let playersJSONStr = localStorage.getItem("playersList");
      playersJSONStr = playersJSONStr + "||" + playerObjStr;

      localStorage.setItem("playersList", playersJSONStr);
      this.updatePlayersList();
    },

    createNewPlayer() {
      /* ****** Returns stringified player object ****** */
      let playerObj = { name: this.playerName, role: "Villager", isDead: false };
      return JSON.stringify(playerObj);
    },

    updatePlayersList() {
      /* ****** Updates the playersList ****** */
      if (localStorage.getItem("playersList") !== null) {
        let playersJSONStr = localStorage.getItem("playersList");
        let playersListOfJSONStr = playersJSONStr.split("||");

        this.playersList = [];
        playersListOfJSONStr.forEach((jsonStr) => {
          let playerObj = JSON.parse(jsonStr);
          this.playersList.push(playerObj);
        });
      }
    }
  }
};
</script>

<style>
@import "~@/css/newGameStyle.css";
</style>
