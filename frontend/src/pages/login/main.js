// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../../assets/css/main.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  render: h => h(App)
}).$mount('#app')
