<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import superHeroesList from './components/superHeroesList';

export default {
  name: 'App',

  components: {
    superHeroesList,
  },

  data: () => ({
    //
  }),
};
</script>
