<template>
  <div class="hello">
    <h1>Register</h1>
    <v-row>
      <v-col
        cols="12"
        sm="4"
      />
      <v-col
        cols="12"
        sm="4"
      >
        <v-text-field
          name="email"
          v-model="email"
          placeholder="Email"
        />
        <br>
        <v-text-field
          name="password"
          v-model="password"
          placeholder="Password"
        />
        <br>
        <div class="error" v-html="error"/>
        <br>
        <v-btn
          @click="register"
        >
          Register
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        sm="4"
      />
    </v-row>
    <v-snackbar
      v-model="snackbar"
    >
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      error: null,
      snackbar: true,
      snackbarText: `I'm the snackbar`
    }
  },
  watch: {
    email (value) {
      // console.log(`Email has changed ${value}`)
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        console.log(`Register button clicked. ${this.email}, ${this.password}`)
        console.log(response.data)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  mounted () {
    setTimeout(() => {
      // this.email = `Hello World`
    }, 1000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: red;
}
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
