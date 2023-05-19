<script>
import axios from "axios";
import AppPhase from "./AppPhase.vue";

export default {
  name: "AppBoard",
  inject: ["eventBus"],
  components: {
    AppPhase,
  },
  data() {
    return {
      phaseSchema: {
        phase: "required",
      },
      phaseComponentKey: 0,
      isLoading: false,
      boardId: null,
      fetchedBoard: [],
    };
  },
  // when component mounted fetch the board
  mounted() {
    this.eventBus.on("trigger-board", async (boardId) => {
      this.boardId = boardId;
      this.fetchBoard();
    });
  },

  methods: {
    // fetch board
    async fetchBoard() {
      try {
        this.isLoading = true;
        await axios
          .get(
            `http://127.0.0.1:8000/api/boards/${this.boardId}/phases/tasks/subtasks/`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.user_token,
                "Content-Type": "application/json",
              },
            }
          )
          .then(async (res) => {
            if (res.status === 200) {
              this.fetchedBoard = res.data.boards;
              this.eventBus.emit(
                "pass-board-name",
                this.fetchedBoard.board_name
              );
              if (this.fetchedBoard !== null) {
                this.isLoading = false;
              }
            }
          });
      } catch (err) {
        alert("An Errror occurred try again");
      }
    },
    icrementPhaseKeyComp() {
      this.fetchBoard();
      this.phaseComponentKey++;
    },
  },
  computed: {
    phaseComponentKeyWithDep() {
      // Add 'phaseComponentKey' as a dependency in the computed property
      return this.phaseComponentKey;
    },
  },
};
</script>

<template>
  <div :key="phaseComponentKey">
    <div v-if="isLoading === true">
      <div class="w-[100%] text-center mt-[15%] pl-auto pr-auto">
        <div class="mr-auto ml-auto w-[10%]">
          <img src="src\assets\images\isLoading.svg" alt="loalding animation" />
        </div>
      </div>
    </div>
    <div v-else-if="isLoading === false">
      <section class="mt-3 mr-6 w-full flex">
        <app-phase
          :key="phaseComponentKeyWithDep"
          :boardId="boardId"
          :fetchedBoard="fetchedBoard"
          @incrementPhaseKey="icrementPhaseKeyComp"
        >
        </app-phase>
      </section>
    </div>
  </div>
</template>
<style></style>
