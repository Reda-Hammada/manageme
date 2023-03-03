<script>    

import axios from 'axios'

export default {
  name: "AppBoard",

  data() {
    return {
      isLoading: false,
      fetchedBoard: [],
    };
  },
  mounted() {
    },
  methods:{
    async loadBoard(boardId) {
      await axios
        .get(
          `http://127.0.0.1:8000/api/boards/${boardId}/phases/tasks/subtasks/`,
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
          }
        });
    }
  },
    
   }
   

</script>

<template>
    <div>
        {{ fetchedBoard }}
    </div>
</template>
