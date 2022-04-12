/* eslint-disable */
<template>
  <v-card
    class="mx-auto"
  >
    <v-toolbar
      color="blue"
      dark
    >
      <v-toolbar-title><h1>{{ taskList.selectedDate }}</h1></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <div id="debounce-search-demo">
      <input v-model="searchQuery" placeholder="Type something">
      <strong>{{ searchIndicator }}</strong>
    </div>

    <v-list two-line>
      <v-list-item-group
        class="text-sm-left"
        multiple
      >
        <template v-for="(habit, index) in taskList.content">
          <v-list-item :key="habit.id">
            <template>
              <v-list-item-content>
                <v-list-item-title v-text="habit.name"></v-list-item-title>
                <v-list-item-subtitle
                  v-text="habit.tasks[parseInt(taskList.selectedDate.slice(8, 10)) - 1].message"
                ></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                <v-text-field
                  v-model="habit.tasks[parseInt(taskList.selectedDate.slice(8, 10)) - 1].score"
                  label="Score"
                  required
                  outlined
                ></v-text-field>
              </v-list-item-action>
            </template>
          </v-list-item>
          <v-divider
            v-if="index < habit.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
const _ = require('lodash');
export default {
/* eslint-disable */
  props: ['taskList'],
  data: () => ({
    searchQuery: '',
    searchQueryIsDirty: false,
    isCalculating: false
  }),
  mounted () {
  },
  computed: {
    searchIndicator: function () {
      if (this.isCalculating) {
        return '⟳ Fetching new results'
      } else if (this.searchQueryIsDirty) {
        return '... Typing'
      } else {
        return '✓ Done'
      }
    }
  },
  watch: {
    searchQuery: function () {
      this.expensiveOperation()
    }
  },
  methods: {
    updateTask () {

    },
    expensiveOperation: _.debounce(function () {
      this.isCalculating = true
    }, 3000)
  }
}
</script>

<style>

</style>
