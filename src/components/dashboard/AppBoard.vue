<script>    

import axios from 'axios'

export default {
  name: "AppBoard",
  inject: ['eventBus'],

  data() {
    return {
      isLoading: false,
      fetchedBoard: [],
    };
  },
  created() {
      this.eventBus.on('trigger-board', async(boardId)=>{
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
       })
    },
  methods:{
    
    
   }

  }
   

</script>

<template>
    <div v-if="fetchedBoard.length === 0">
       no board yet
    </div>
    <div v-else>
        {{ fetchedBoard }}
    </div>
</template>
