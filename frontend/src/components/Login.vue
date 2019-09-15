/* eslint-disable */
<template>
  <div id="container">
    <div id="login">
      <h1>Sign In</h1>
      <br/>
      <form @submit.prevent="handleLogin">
        <div class="div-responsive">
          <label for="email">Email:</label>
          <input type="text" v-model="email" @change="handleChange" placeholder="Email" class="form-control" :class="{ 'is-invalid': submitted && !email }" />
          <div class="alert-field">
            <div v-if="submitted && !email" class="invalid-feedback">Email is required</div>
          </div>
        </div>
        <div class="div-responsive">
          <label for="password">Password:</label>
          <input type="password" v-model="password" @change="handleChange" placeholder="Password" class="form-control" :class="{ 'is-invalid': submitted && !password }">
          <div class="alert-field">
            <div v-if="submitted && !password" class="invalid-feedback">Password is required</div>
          </div>
        </div>
        <div class="div-responsive">
          <a href="reset_password" class="customLink">Want to reset password ?</a>
        </div>
        <div class="alert-box div-responsive">
          <Error v-if="error.message!=null" v-bind:message="error.message" />
        </div>
        <div class="div-responsive">
          <button type="submit" class="btn btn-secondary btn-big">Login</button>
        </div>
      </form>
    </div>
    <Modal ref="modal" message="Logged In" :user ="user" />
    <Loading v-if="loading" />
  </div>
</template>

<script>
import axios from 'axios'
import Modal from './Modal'
import Loading from './Loading'
import Error from './Error'
import { validEmail } from '../assets/js/utils.js'

const url = 'http://localhost:4081'

export default {
  name: 'Login',
  components: {
      Modal,
      Loading,
      Error
  },
  data () {
    return {
      submitted: false,
      loading: false,
      error: {
        message : null
      },
      email: null,
      password: null,
      user: {}
    }
  },
  methods: {
    handleLogin () {
      // Flag submitted
      this.submitted = true;

      // Check empty input
      if(this.email && this.password) {
        // Check validation of the email
        if(!validEmail(this.email)) {
          this.error.message = "Email is invalid";
          return false;
        }
        this.loading = true;

        // Assume the request will be a half of second
        setTimeout(() => {
          // Get the list of user
          axios.get(url + '/users')
          .then(resp => {
              const list = resp.data;
              // Find the user with email
              const user = list.find(x => x.email == this.email);
              // Check the user exist
              if(user != null) {
                // Check the password
                if(user.password == this.password) {
                  this.user = user;
                  this.error.message = null;
                  this.loading = false;
                  this.email = null;
                  this.password = null,
                  this.submitted = false;
                  // Open message box
                  this.$refs.modal.show();
                } else {
                  this.error.message = "Password is incorrect";
                  this.loading = false;
                }
              } else {
                this.error.message = "Email doesn't exist";
                this.loading = false;
              }
          }).catch(error => {
              // Catch error here
              this.error = error;
              this.loading = false;
          });
        }, 500);
      }
    },
    handleChange () {
      this.error.message = null;
    }
  }
}
</script>

