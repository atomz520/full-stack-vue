<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <v-row>
      <v-col
        cols="12"
        sm="8"
      >
        <add-habit-form/>
        <task-list
          :taskList="taskList"
        />
      </v-col>
      <v-col
        cols="12"
        sm="4"
      >
        <v-sheet height="64">
          <v-toolbar
            flat
          >
            <v-btn
              outlined
              class="mr-4"
              color="grey darken-2"
              @click="setToday"
            >
              Today
            </v-btn>
            <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="prev"
            >
              <v-icon small>
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="next"
            >
              <v-icon small>
                mdi-chevron-right
              </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
          </v-toolbar>
        </v-sheet>
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:date="getTasksByDate"
          @change="updateRange"
        ></v-calendar>
        <!-- <add-task-form />-->
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
      focus: '',
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
      taskList: {
        selectedDate: ''
      }
    }
  },
  mounted () {
    this.$refs.calendar.checkChange()
    console.log(format(new Date(), 'y-MM-d'))
    // this.taskList.selectedDate = format(new Date(), 'd MMM y')
    this.taskList.selectedDate = format(new Date(), 'y-MM-d')
    // this.getHabitsByMonth(this.$refs.calendar.renderProps.start.date)
    this.getHabitsByMonth(format(new Date(), 'y-MM-d'))
  },
  methods: {
    checkDay (event) {
      console.log(`This is the event: ` + event)
    },
    async getHabitsByMonth (date) {
      console.log(`getHabitsByMonth: ` + date)
      try {
        const response = await CalendarService.getHabitsByMonth({
          month: date.slice(0, 7)
        })
        this.taskList.content = response.data
        console.log(this.taskList)
        this.taskList.selectedDate = date
      } catch (error) {
        console.log(error)
        // this.error = error.response.data.error
      }
    },
    async getTasksByDate ({date}) {
      console.log(`Selected ` + date)
      this.getHabitsByMonth(date)
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = ''
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    updateRange ({ start, end }) {
      // const events = []
      // let min = new Date(`${start.date}T00:00:00`)
      // let max = new Date(`${end.date}T23:59:59`)
      // min = max - max + min
      // this.events = events
    }
  },
  components: {
    'task-list': require('@/components/TaskList.vue').default,
    'add-task-form': require('@/components/AddTaskForm.vue').default,
    'add-habit-form': require('@/components/AddHabitForm.vue').default
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
