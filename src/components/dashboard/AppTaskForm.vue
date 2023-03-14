<script>
export default{
  name:'AppTaskForm',
  props:{
    isAddTask:{
      Type:Boolean,
      Required:true,

    }
  },
  data(){
    return{
      Subtask:[
      ]
    }
  },
  methods:{
    addSubstakInput(){
      this.Subtasks.push({Subtask: ''});
    }
  }
}
</script>


<template>
    <section v-show="isAddTask === true">
      <div>
         <vee-form :validation-schema = "addTaskSchema">
              <h2>Add a task</h2>
              <!--Task title-->
            <div>
              <label>
                Title:
              </label>
              <vee-field  name="title"
                          v-slot="{field,errors}">
                  <input name="title"
                         v-bind='field'
                         type='text'
                         placeholder="e.g take a coffee break"
                   />
                     <!--Task title error-->
                     <div v-for="(error,index) in errors" :key="index">
                      {{ error }}
             </div> 
              </vee-field>
            </div>
              <!--description-->

              <div>
                  <label>
                    description:
                  </label>
                  <vee-field name='description'
                             v-slot="{field,errors}">
                    <textarea name='description'
                              v-bind="field">

                    </textarea>

                      <!--description error-->
                      <div v-for="(error,index) in errors" :key="index">
                        {{ error }}
               </div> 
                  </vee-field>
              </div>
              <!--Subtask-->
              <div v-for="(Subtask,index) in Subtasks" :key="index">
                 
                  <vee-field v-slot="{field,errors}"
                             :name="`Subtask${index + 1}`">
                     <input type="text"
                            v-bind="field"
                            v-model="Subtask.substask"
                            :name="`Subtask${index + 1}`"
                       />
                       <!--Substask error-->
                       <div v-for="(error,index) in errors" :key="index">
                                {{ error }}
                       </div> 
                  </vee-field>
              </div>

         </vee-form>
         <button v-on:click="addSubstakInput()">
          Add Subtask
        </button>

      </div>
    </section>
</template>