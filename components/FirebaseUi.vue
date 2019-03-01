<template lang="pug">
  #firebaseui-auth-container
</template>

<script>
import firebase from '~/plugins/firebase';
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  mounted() {
    if (process.browser) {
      const firebaseui = require('firebaseui');
      const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());


      const config = {
        signInFlow: 'popup',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        tosUrl: '/tos',
        privacyPolicyUrl: '/privacy-policy',
        callbacks: {
          signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            console.log('signInSuccessWithAuthResult');
          },
          uiShown: function () {
            console.log('uiShown');
            
            firebase.auth().onAuthStateChanged((user) => {
              this.$store.commit('setUser', user);
            })
          }
        }
      };

      ui.start('#firebaseui-auth-container', config);
    }
  },
  methods: {
    setUser(user){
      $store.commit('setUser', user);
    }
  }
}
</script>

<style src="~/node_modules/firebaseui/dist/firebaseui.css"></style>