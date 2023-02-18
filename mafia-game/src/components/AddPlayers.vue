<template>
  <div class="add-players-container">
    <!-- ==================== Add player action ==================== -->
    <section class="add-player-action-container">
      <input type="text" v-model="playerName" autocomplete="on" maxlength="10" placeholder="Enter player name" class="input" />
      <b-button @click="addPlayer">Add</b-button>
    </section>
    <!-- ================== / Add player action ==================== -->

    <!-- ====================== Players List ======================== -->
    <section class="added-players-list-container">
      <ul class="players-list">
        <li class="player-container" v-for="(player, index) in playersList" :key="index">
          <!--                                                                                     -->
          <!-- ------------------------ Player name ------------------------ -->
          <div class="player-name">
            <span>{{ index + 1 }}</span
            >. <span> {{ player.name }}</span>
          </div>
          <!-- ---------------------- / Player name ------------------------ -->

          <!-- --------------------- Player Actions ------------------------ -->
          <div class="player-action">
            <span @click="editPlayerPopup(player.name, index)">
              <b-icon icon="pencil" type="is-white"></b-icon>
            </span>
            <span @click="deletePlayer(index)">
              <b-icon icon="trash-can" type="is-danger"></b-icon>
            </span>
          </div>
          <!-- ------------------- / Player Actions ------------------------ -->
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
      if (this.$getDataFromStorage("playersList") === null) {
        this.createPlayersListAndAddPlayer();
      } else {
        this.addPlayerToExistingPlayersList();
      }
      this.playerName = "";
    },

    createPlayersListAndAddPlayer() {
      /* ****** Create a new player object and set to local storage ****** */
      let playerObjStr = this.createNewPlayer();
      this.setPlayersListToStorage(playerObjStr);

      this.updatePlayersList();
    },

    addPlayerToExistingPlayersList() {
      /* ****** Create a new player object and append to existing local storage *******/
      let playerObjStr = this.createNewPlayer();

      let playersJSONStr = this.$getDataFromStorage("playersList");
      playersJSONStr = playersJSONStr + "||" + playerObjStr;

      this.setPlayersListToStorage(playersJSONStr);

      this.updatePlayersList();
    },

    createNewPlayer() {
      /* ****** Returns stringified player object ****** */
      let playerObj = { name: this.playerName, role: "Villager", isDead: false };

      return JSON.stringify(playerObj);
    },

    updatePlayersList() {
      /* ****** Updates the playersList ****** */
      if (this.$getDataFromStorage("playersList") !== null) {
        let playersListOfJSONStr = this.getPlayerStrListFromStorage();

        this.playersList = [];
        playersListOfJSONStr.forEach((jsonStr) => {
          let playerObj = JSON.parse(jsonStr);
          this.playersList.push(playerObj);
        });
      } else {
        this.playersList = [];
      }
    },

    editPlayerPopup(playerName, index) {
      /* ****** Opens Popup for editing player name ****** */
      this.$buefy.dialog.prompt({
        inputAttrs: {
          value: playerName,
          maxlength: 10
        },
        trapFocus: true,
        onConfirm: (editedPlayerName) => {
          this.editPlayerName(editedPlayerName, index);
        }
      });
    },

    editPlayerName(editedPlayerName, index) {
      /* ****** Edits the player name and sets to storage ****** */
      let playersListOfJSONStr = this.getPlayerStrListFromStorage();
      let playerObj = this.$convertJsonStrToObj(playersListOfJSONStr[index]);

      playerObj.name = editedPlayerName;
      playersListOfJSONStr[index] = this.$convertObjToJSONStr(playerObj);

      let updatedPlayersJSONStr = this.getUpdatedPlayersListStr(playersListOfJSONStr);
      this.setPlayersListToStorage(updatedPlayersJSONStr);

      this.updatePlayersList();
    },

    deletePlayer(index) {
      /* ****** Deletes a player from the list and set to storage ****** */
      let playersListOfJSONStr = this.getPlayerStrListFromStorage();
      let playerObjToBeDeleted = playersListOfJSONStr[index];

      /* Remove the player from the list and return the updated array */ 
      const updatedPlayersList = playersListOfJSONStr.filter((player) => {
        return player !== playerObjToBeDeleted;
      });

      let updatedPlayersJSONStr = this.getUpdatedPlayersListStr(updatedPlayersList);

      if (updatedPlayersJSONStr !== "") {
        this.setPlayersListToStorage(updatedPlayersJSONStr);
      } else {
        this.$removeDataFromStorage("playersList");
      }

      this.updatePlayersList();
    },

    getUpdatedPlayersListStr(playersListOfJSONStr) {
      /* ****** Returns the updated players list of string type ****** */
      let updatedPlayersJSONStr = "";

      playersListOfJSONStr.forEach((jsonStr) => {
        if (updatedPlayersJSONStr === "") {
          updatedPlayersJSONStr = jsonStr;
        } else {
          updatedPlayersJSONStr = updatedPlayersJSONStr + "||" + jsonStr;
        }
      });

      return updatedPlayersJSONStr;
    },

    getPlayerStrListFromStorage() {
      /* ****** Updates the players List ****** */
      let playersJSONStr = this.$getDataFromStorage("playersList");
      let playersListOfJSONStr = playersJSONStr.split("||");

      return playersListOfJSONStr;
    },

    setPlayersListToStorage(updatedPlayersJSONStr) {
      /* ****** Sets players list to local storage ****** */
      this.$setDataToStorage("playersList", updatedPlayersJSONStr);
    }
  }
};
</script>

<style>
@import "~@/css/newGameStyle.css";
</style>
