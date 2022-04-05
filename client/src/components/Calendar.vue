<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <v-row>
      <v-col
        cols="12"
        sm="4"
      >
        <task-list
          :taskList="taskList"
        />
      </v-col>
      <v-col
        cols="12"
        sm="8"
      >
        <v-calendar
          ref="calendar"
          v-model="value"
          color="blue"
          @click="checkDay"
          @click:date="getTasksByDate"
          :weekdays="weekday"
          :type="type"
          :events="events"
          :event-overlap-mode="mode"
          :event-overlap-threshold="30"
        ></v-calendar>
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
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="newTask.date"
                      label="Picker without buttons"
                      prepend-icon="mdi-calendar"
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
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { format } from 'date-fns'
import CalendarService from '@/services/CalendarService'
export default {
  name: 'Calendar',
  data () {
    return {
      msg: 'Calendar',
      drawer: null,
      type: 'month',
      types: ['month', 'week', 'day', '4day'],
      mode: 'stack',
      modes: ['stack', 'column'],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
        { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
        { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
        { text: 'Mon, Wed, Fri', value: [1, 3, 5] }
      ],
      value: '',
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      currentDate: '1234',
      taskList: {
        selectedDate: ''
      },
      datePickerMenu: false,
      newTask: {
        date: '',
        message: '',
        score: ''
      }
    }
  },
  mounted () {
    this.currentDate = format(new Date(), 'd MMM y')
    this.taskList.selectedDate = format(new Date(), 'd MMM y')
    this.getTasksByDate(new Date())
  },
  methods: {
    checkDay (event) {
      console.log(event)
    },
    // dayClicked ({date}) {
    //   this.currentDate = format(new Date(date), 'd MMM y')
    //   this.taskList.selectedDate = date
    //   this.getTasksByDate()
    //   console.log(`day clicked`)
    // },
    async addTask () {
      // const date = Math.floor(Math.random() * 30) + 1
      const response = await CalendarService.addTask({
        date: this.newTask.date + ' 00:00:00.000 +00:00',
        message: this.newTask.message,
        score: this.newTask.score
      })
      console.log(response)
    },
    async getTasksByDate ({date}) {
      if (!date) {
        date = format(new Date(), 'yyyy-MM-dd')
      }
      try {
        const response = await CalendarService.getTasksByDate({
          date: date + ' 00:00:00.000 +00:00'
        })
        console.log(format(new Date(date), 'yyyy-MM-dd'))
        console.log(`Fetching tasks from this date. ${this.date}`)
        // console.log(response.data)
        this.taskList.content = response.data
        console.log(this.taskList)
        this.currentDate = format(new Date(date), 'd MMM y')
        this.taskList.selectedDate = date
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  components: {
    'task-list': require('@/components/TaskList.vue').default
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
