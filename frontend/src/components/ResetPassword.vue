/* eslint-disable */
<template>
  <div class="container">
    <div class="login">
      <h2>New Password</h2>
      <br/>
      <form @submit.prevent="handleSave">
        <div class="div-responsive">
          <label for="email">Email:</label>
          <input type="text" v-model="email" @change="handleChange" placeholder="Email" class="form-control" :class="{ 'is-invalid': submitted && !email }" />
          <div class="alert-field">
            <div v-if="submitted && !email" class="invalid-feedback">Email is required</div>
          </div>
        </div>
        <div class="div-responsive">
          <label for="newPass">New password:</label>
          <input type="password" v-model="newPass" placeholder="Enter new password" class="form-control" :class="{ 'is-invalid': submitted && !newPass }" />
          <div class="alert-field">
            <div v-if="submitted && !newPass" class="invalid-feedback">New password is required</div>
          </div>
        </div>
        <div class="div-responsive">
          <label for="cfPass">Password:</label>
          <input type="password" v-model="cfPass" @change="handleChange" placeholder="Confirn your new password" class="form-control" :class="{ 'is-invalid': submitted && !cfPass }">
          <div class="alert-field">
            <div v-if="submitted && !cfPass" class="invalid-feedback">Confirn password is required</div>
          </div>
        </div>
        <div class="div-responsive">
          <router-link :to="LOG_IN_PATH" class="customLink">Log In</router-link>
        </div>
        <div class="alert-box div-responsive">
          <Error v-if="error.message!=null" v-bind:message="error.message" />
        </div>
        <div class="div-responsive btn-center">
          <button type="submit" class="btn btn-secondary btn-big">Save</button>
        </div>
      </form>
    </div>
    <Modal ref="modal" message="Your password is reset" :redirect="LOG_IN_PATH" />
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
import { URL, LOG_IN_PATH } from '../constants/constants'

export default {
  name: 'ResetPassword',
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
      newPass: null,
      cfPass: null,
      LOG_IN_PATH: LOG_IN_PATH
    }
  },
  methods: {
    handleSave () {
      // Flag submitted
      this.submitted = true;

      // Check empty input
      if(this.email && this.newPass && this.cfPass) {
        // Check validation of the email
        if(!validEmail(this.email)) {
          this.error.message = "Email is invalid";
          return false;
        }
        // Show loading
        this.$refs.loading.handleLoading();

        setTimeout(() => {
          // Get the list of user
          axios.get(URL + '/users')
          .then(resp => {
              // Get the list of users
              const list = resp.data;
              // Find the user with email
              const user = list.find(x => x.email == this.email);
              // Check the user exist
              if(user != null) {
                // Check the confirm password and new password must be the same
                if(this.cfPass == this.newPass) {
                  // Set new password
                  user.password = this.cfPass;
                  // Change password
                  axios.put(URL + '/users/' + user.id, user)
                  .then(resp => {
                      this.error.message = null;
                      this.loading = false;
                      this.email = null;
                      this.newPass = null,
                      this.cfPass = null,
                      this.submitted = false;

                      // Hide loading
                      this.$refs.loading.handleLoading();
                      // Open message box
                      this.$refs.modal.handleModal();

                      // Redirect to home page
                      setTimeout(() => {
                          this.$refs.modal.handleModal();
                          window.location = LOG_IN_PATH;
                      }, 3000);
                  }).catch(error => {
                      // Catch error here
                      this.error = error;
                      // Hide loading
                      this.$refs.loading.handleLoading();
                  });
                } else {
                  this.error.message = "Confirm password is incorrect";
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
