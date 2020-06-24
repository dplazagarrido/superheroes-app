<template>
  <v-sheet
    :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
    class="px-3 pt-3 pb-12"
  >
    <v-responsive
      :max-width="type.indexOf('table') > -1 ? 900 : 500"
      class="mx-auto"
    >
      <v-responsive class="mx-auto mb-12" max-width="500"> </v-responsive>

      <v-skeleton-loader
        ref="skeleton"
        :boilerplate="boilerplate"
        :type="type"
        :tile="tile"
        class="mx-auto"
      ></v-skeleton-loader>
      <v-spacer></v-spacer>
      <v-skeleton-loader
        ref="skeleton"
        :boilerplate="boilerplate"
        :type="type"
        :tile="tile"
        class="mx-auto"
      ></v-skeleton-loader>
    </v-responsive>
  </v-sheet>
</template>

<script>
export default {
  inject: ["theme"],

  data: () => ({
    boilerplate: false,
    tile: false,
    type: "list-item-avatar",
    types: [],
  }),

  mounted() {
    this.types = Object.keys(this.$refs.skeleton.rootTypes);
  },
};
</script>

<style></style>
