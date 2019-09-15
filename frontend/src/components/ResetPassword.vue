/* eslint-disable */
<template>
  <div id="container">
    <div id="login">
      <h1>New Password</h1>
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
          <a href="login" class="customLink">Sign In</a>
        </div>
        <div class="alert-box div-responsive">
          <Error v-if="error.message!=null" v-bind:message="error.message" />
        </div>
        <div class="div-responsive">
          <button type="submit" class="btn btn-secondary btn-big">Save</button>
        </div>
      </form>
    </div>
    <Modal ref="modal" message="Your password is reset" />
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
  name: 'ResetPassword',
  components: {
      Modal,
      Loading,
      Error
  },
  data () {
    return {
      already: false,
      submitted: false,
      loading: false,
      error: {
        message : null
      },
      email: null,
      newPass: null,
      cfPass: null
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
        this.loading = true;

        setTimeout(() => {
          // Get the list of user
          axios.get(url + '/users')
          .then(resp => {
              // Get the list of users
              const list = resp.data;
              // Find the user with email
              const user = list.find(x => x.email == this.email);
              console.log(user);
              // Check the user exist
              if(user != null) {
                // Check the confirm password and new password must be the same
                if(this.cfPass == this.newPass) {
                  // Set new password
                  user.password = this.cfPass;
                  // Change password
                  axios.put(url + '/users/' + user.id, user)
                  .then(resp => {
                      this.error.message = null;
                      this.loading = false;
                      this.email = null;
                      this.newPass = null,
                      this.cfPass = null,
                      this.submitted = false;
                      // Open message box
                      this.$refs.modal.show();
                  }).catch(error => {
                      // Catch error here
                      this.error = error;
                      this.loading = false;
                  });
                } else {
                  this.error.message = "Confirm password is incorrect";
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
