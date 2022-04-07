<template>
  <div>
    <v-form>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="newHabit.name"
              label="Habit Name"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-btn
      @click="addHabit"
    >
      Add habit for this month
    </v-btn>
  </div>
</template>

<script>
import CalendarService from '@/services/CalendarService'
export default {
  data () {
    return {
      newHabit: {
        name: '',
        month: ''
      }
    }
  },
  methods: {
    async addHabit () {
      const month = this.$parent.$refs.calendar.renderProps.start.date.slice(0, 7)
      const response = await CalendarService.addHabit({
        name: this.newHabit.name,
        month: month
      })
      console.log(response)
    }
  }
}
</script>

<style>

</style>
