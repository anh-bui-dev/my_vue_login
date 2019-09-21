/* eslint-disable */
<template>
  <div class="container">
    <div class="login">
      <h2>Log In</h2>
      <br/>
      <form @submit.prevent="handleLogIn">
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
          <router-link :to="RESET_PASSWORD_PATH" class="customLink">Want to reset password ?</router-link>
        </div>
        <div class="alert-box div-responsive">
          <Error v-if="error.message!=null" v-bind:message="error.message" />
        </div>
        <div class="div-responsive btn-center">
          <button type="submit" class="btn btn-secondary btn-big">Log In</button>
        </div>
      </form>
    </div>
    <Modal ref="modal" message="Logged In" :redirect="HOME_PATH" />
    <Loading ref="loading" />
  </div>
</template>

<script>
import axios from 'axios'
import Modal from './Modal'
import Loading from './Loading'
import Error from './Error'
import moment from 'moment'
import { validEmail } from '../assets/js/utils.js'
import { URL, HOME_PATH, RESET_PASSWORD_PATH } from '../constants/constants'

export default {
  name: 'LogIn',
  components: {
      Modal,
      Loading,
      Error
  },
  data () {
    return {
      submitted: false,
      error: {
        message : null
      },
      email: null,
      password: null,
      user: {},
      HOME_PATH: HOME_PATH,
      RESET_PASSWORD_PATH: RESET_PASSWORD_PATH
    }
  },
  methods: {
    handleLogIn () {
      // Flag submitted
      this.submitted = true;

      // Check empty input
      if(this.email && this.password) {
        // Check validation of the email
        if(!validEmail(this.email)) {
          this.error.message = "Email is invalid";
          return false;
        }
        // Show loading
        this.$refs.loading.handleLoading();

        // Assume the request will be a half of second
        setTimeout(() => {
          // Get the list of user
          axios.get(URL + '/users')
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

                  // Session storage user
                  const expiresAt = moment(new Date()).add(30, 'm').toDate();
                  user.expiresAt = expiresAt;
                  sessionStorage.setItem('user', JSON.stringify(user));

                  // Hide loading
                  this.$refs.loading.handleLoading();
                  // Open message box
                  this.$refs.modal.handleModal();

                  // Redirect to home page
                  setTimeout(() => {
                      this.$refs.modal.handleModal();
                      window.location = HOME_PATH;
                  }, 3000);
                } else {
                  this.error.message = "Password is incorrect";
                  // Hide loading
                  this.$refs.loading.handleLoading();
                }
              } else {
                this.error.message = "Email doesn't exist";
                // Hide loading
                this.$refs.loading.handleLoading();
              }
          }).catch(error => {
              // Catch error here
              this.error = error;
              // Hide loading
              this.$refs.loading.handleLoading();
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

