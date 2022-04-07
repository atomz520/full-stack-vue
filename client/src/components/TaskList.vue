/* eslint-disable */
<template>
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-toolbar
      color="pink"
      dark
    >
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title><h1>{{ taskList.selectedDate }}</h1></v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->

      <!-- <v-btn icon>
        <v-icon>mdi-checkbox-marked-circle</v-icon>
      </v-btn> -->
    </v-toolbar>

    <v-list two-line>
      <v-list-item-group
        v-model="selected"
        active-class="cyan--text"
        class="text-sm-left"
        multiple
      >
        <template v-for="(task, index) in taskList.content">
          <v-list-item :key="task.id">
            <template v-slot:default="{ active }">
              <v-list-item-content>
                <v-list-item-title v-text="task.name"></v-list-item-title>

                <v-list-item-subtitle
                  class="text--primary"
                  v-text="task.name"
                ></v-list-item-subtitle>

                <v-list-item-subtitle v-text="task.name"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text v-text="task.createdAt"></v-list-item-action-text>

                <v-icon
                  v-if="!active"
                  color="grey lighten-1"
                >
                  mdi-star-outline
                </v-icon>

                <v-icon
                  v-else
                  color="yellow darken-3"
                >
                  mdi-star
                </v-icon>
              </v-list-item-action>
            </template>
          </v-list-item>
          <v-divider
            v-if="index < task.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
// import { format } from 'date-fns'
export default {
  props: ['taskList'],
  data: () => ({
    selected: [],
    items: [
      {
        dateAdded: '',
        title: 'Finish Vuetibit',
        action: '15 min',
        subtitle: 'Let\'s set a goal!',
        note: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`
      },
      {
        action: '2 hr',
        headline: 'Summer BBQ',
        subtitle: `Wish I could come, but I'm out of town this weekend.`,
        title: 'me, Scrott, Jennifer'
      }
    ],
    selectedDate: ''
  }),
  mounted () {
    console.log(this.taskList)
    // this.selectedDate = format(new Date(this.taskList.selectedDate), 'd MMM y')
  },
  watch: {
    taskList: function () {
      console.log(`taskList updated`)
    }
  }
}
</script>

<style>

</style>
