<template>
  <div class="hello">
    <h1>Register</h1>

    <input
      type="email"
      name="email"
      v-model="email"
      placeholder="Email"
    />
    <br />
    <input
      type="password"
      name="password"
      v-model="password"
      placeholder="Password"
    />

    <button
      @click="register"
    >Register</button>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  watch: {
    email (value) {
      console.log(`Email has changed ${value}`)
    }
  },
  methods: {
    async register () {
      const response = await AuthenticationService.register({
        email: this.email,
        password: this.password
      })
      console.log(`Register button clicked. ${this.email}, ${this.password}`)
      console.log(response.data)
    }
  },
  mounted () {
    setTimeout(() => {
      this.email = `Hello World`
    }, 1000)
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
