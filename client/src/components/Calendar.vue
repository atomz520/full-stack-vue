<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <task-list />
    <v-calendar
      ref="calendar"
      v-model="value"
      color="blue"
      @click="checkDay"
      @click:date="dayClicked"
      :weekdays="weekday"
      :type="type"
      :events="events"
      :event-overlap-mode="mode"
      :event-overlap-threshold="30"
    ></v-calendar>
  </div>
</template>

<script>
import { format } from 'date-fns'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'This is where the calendar view will reside.',
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
      currentDate: '1234'
    }
  },
  mounted () {
    this.currentDate = format(new Date(), 'd MMM y')
  },
  methods: {
    checkDay (event) {
      console.log(event)
    },
    dayClicked ({date}) {
      this.currentDate = format(new Date(date), 'd MMM y')
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
