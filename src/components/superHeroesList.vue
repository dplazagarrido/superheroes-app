<template>
  <v-card max-width="600" class="mx-auto">
    <v-toolbar color="red" dark>
      <v-toolbar-title>Super Héroes</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-switch
        inset
        v-model="canFly"
        label="Volar"
        color="white"
        hide-details
      ></v-switch>

      <v-spacer></v-spacer>

      <v-text-field
        v-model="searchTerm"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
    </v-toolbar>
    <skeletonList v-if="showSkeleton" />
    <v-list v-if="!showSkeleton">
      <v-list-item v-for="item in filterByTerm" :key="item.nombre">
        <v-list-item-avatar>
          <v-img :src="item.avatarURL"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.nombre"></v-list-item-title>
          <v-list-item-title v-text="item.nombreReal"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon v-if="item.puedeVolar" color="red" title="Puede Volar!"
            >mdi-airplane</v-icon
          >
          <v-icon v-if="!item.puedeVolar" color="red" title="No puede volar"
            >mdi-walk</v-icon
          >
        </v-list-item-icon>
      </v-list-item>
    </v-list>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Error</v-card-title>

        <v-card-text>
          Ops! Ha ocurrido un error, Vuelva a recargar la pagina!
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red" text @click="dialog = false">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import * as superHeroesServices from "../services/superHeroesServices";
import skeletonList from "../components/skeletonList";
export default {
  data() {
    return {
      data: [],
      searchTerm: "",
      showSkeleton: true,
      canFly: 0,
      dialog: false,
    };
  },
  components: {
    skeletonList,
  },
  watch: {
    canFly: function() {
      this.setListSuperHeroes();
    },
  },
  computed: {
    filterByTerm() {
      return this.data.filter((heroe) => {
        return (
          heroe.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          heroe.nombreReal.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      });
    },
  },
  methods: {
    async loadAllSuperHeroes() {
      try {
        const response = await superHeroesServices.getAllSuperHeroes();
        this.data = response.data.data;
        this.showSkeleton = false;
      } catch (error) {
        this.dialog = true;
      }
    },
    async loadFlySuperHeroes() {
      try {
        const response = await superHeroesServices.getFlySuperHeroes(
          this.canFly
        );
        this.data = response.data.data;
        this.showSkeleton = false;
      } catch (error) {
        this.dialog = true;
      }
    },
    setListSuperHeroes() {
      if (this.canFly) {
        this.loadFlySuperHeroes();
      } else {
        if (!this.canFly) {
          this.loadAllSuperHeroes();
        }
      }
    },
  },
  async mounted() {
    await this.setListSuperHeroes();
  },
};
</script>

<style></style>
