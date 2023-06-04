<script>
import axios from "axios";
import AppPhase from "./AppPhase.vue";
import AppUpdateBoardForm from "./AppUpdateBoardForm.vue";
import { faTruckField } from "@fortawesome/free-solid-svg-icons";

export default {
  name: "AppBoard",
  inject: ["eventBus"],
  components: {
    AppPhase,
    AppUpdateBoardForm,
  },
  data() {
    return {
      phaseSchema: {
        phase: "required",
      },
      phaseComponentKey: 0,
      isBoardSetting: false,
      isConfirmDelete: false,
      isLoading: false,
      boardId: null,
      isUpdateBoard: false,
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
            `http://127.0.0.1:8000/api/boards/${this.boardId}/phases/tasks`,
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
    rerenderParentCompDashboard() {
      this.$emit("rerender-dashboard");
    },
    icrementPhaseKeyComp() {
      this.fetchBoard();
      this.phaseComponentKey++;
    },
    toggleBoardSetting() {
      if (this.isBoardSetting === true) {
        this.isBoardSetting = false;
      } else if (this.isBoardSetting === false) {
        this.isBoardSetting = true;
      }
    },
    toggleBoardUpdate() {
      this.isUpdateBoard = !this.isUpdateBoard;
    },

    async deleteBoard(boardId, argument) {
      this.isConfirmDelete = true;
      // if the user confirm the delete action
      if (argument === true) {
        try {
          await axios
            .delete(`http://127.0.0.1:8000/api/boards/${boardId}`, {
              headers: {
                Authorization: "Bearer " + localStorage.user_token,
                "Content-Type": "application/json",
              },
            })
            .then(async (res) => {
              if ((await res.data.status) === 200) {
                this.rerenderParentCompDashboard();
                this.isConfirmDelete = false;
              }
            });
        } catch (err) {
          console.log(err);
        }
      }
      // if not confirmed the delete action
      else if (argument === false) {
        this.isConfirmDelete = false;
      }
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
        <!--Board Setting to delete and edit it-->
        <i
          @click="toggleBoardSetting"
          v-show="fetchedBoard.length !== 0"
          class="fas fa-ellipsis-v cursor-pointer text-2xl mr-32 mt-6"
          style="color: #4e4e91"
        ></i>
        <div
          v-show="fetchedBoard.length !== 0 && isBoardSetting === true"
          class="bg-white w-[200px] absolute mt-16 right-8 rounded-lg h-[115px]"
        >
          <div class="w-[100%] mt-4">
            <div class="ml-auto mr-auto w-[55%]">
              <button
                @click="toggleBoardUpdate"
                class="bg-main-color text-white h-[35px] font-bold w-[120px] rounded-lg"
              >
                Edit
              </button>
            </div>
            <div class="ml-auto mr-auto w-[55%]">
              <button
                @click="deleteBoard(fetchedBoard.id)"
                class="bg-red-500 text-white font-bold w-[120px] rounded-lg h-[35px] mt-2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <!--Delete board Validation-->
        <div
          v-show="isConfirmDelete === true"
          class="absolute bg-black w-full h-full top-0 left-0 bg-opacity-25"
        >
          <div
            class="bg-white w-[40%] h-[210px] overflow-y-auto overflow-x-hidden pb-[2%] rounded mr-auto ml-auto mt-[10%]"
          >
            <p class="text-center font-bold text-xl mt-12">
              Are you sure you want to to delete this board
            </p>
            <div class="flex w-[35%] ml-auto mr-auto">
              <div class="mr-12 mt-12">
                <button
                  @click="deleteBoard(fetchedBoard.id, true)"
                  class="bg-main-color text-white font-bold w-[120px] h-[30px] rounded-lg"
                >
                  Confirm
                </button>
              </div>
              <div class="mr-12 mt-12">
                <button
                  @click="deleteBoard(fetchedBoard.id, false)"
                  class="bg-orange-700 text-white font-bold w-[120px] h-[30px] rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <app-update-board-form
          v-show="isUpdateBoard === true"
          :board="this.fetchedBoard"
          @trigger-updateBoard-form="toggleBoardUpdate"
        >
        </app-update-board-form>
      </section>
    </div>
  </div>
</template>
<style></style>
