/* eslint-disable */
<template>
  <div id="app">
    <Loading v-if="loading" />
  </div>
</template>

<script>
import Loading from '../../components/Loading'
export default {
  name: 'App',
  components: {
    Loading
  },
  data () {
    return {
      loading: false
    }
  },
  mounted () {
    this.loading = true;
    // Redirect to login page
    setTimeout(function(){
      window.location="login";
      this.loading = false;
    },200);
  }
}
</script>
