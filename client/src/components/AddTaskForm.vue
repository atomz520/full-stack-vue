<template>
  <div>
    <v-form>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-menu
              v-model="datePickerMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="newTask.date"
                  label="Picker without buttons"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="newTask.date"
                @input="datePickerMenu = false"
              ></v-date-picker>
            </v-menu>
            <v-text-field
              v-model="newTask.message"
              label="Message"
              required
            ></v-text-field>
            <v-text-field
              v-model="newTask.score"
              label="Score"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-btn
      @click="addTask"
    >
      Add Task
    </v-btn>
  </div>
</template>

<script>
import CalendarService from '@/services/CalendarService'
export default {
  data () {
    return {
      datePickerMenu: false,
      newTask: {
        date: '',
        message: '',
        score: ''
      }
    }
  },
  methods: {
    async addTask () {
      // const date = Math.floor(Math.random() * 30) + 1
      const response = await CalendarService.addTask({
        habit_id: 1,
        date: this.newTask.date,
        message: this.newTask.message,
        score: this.newTask.score
      })
      console.log(response)
    }
  }
}
</script>

<style>

</style>
