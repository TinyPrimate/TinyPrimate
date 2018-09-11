<template>
  <v-container class="home">
    <v-layout row>
      <v-flex xs8>

      </v-flex>

      <v-flex xs4 id="tp-player-sidebar" class="elevation-24">
        <v-container id="tp-player-sidebar-container">
        <!-- Give them something nice to look at -->
          <v-layout row class="sidebar-default elevation-12">
            <v-flex xs12>
              <img src="../assets/TinyPrimateLogo__Colorful__2.png">
            </v-flex>
          </v-layout>

          <v-layout row class="sidebar-default elevation-12">
            <v-flex xs12>
              <Playlist/>
            </v-flex>
          </v-layout>

        </v-container>
      </v-flex>



    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import Playlist from '@/components/audio/v1/Playlist.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
    Playlist,
  },
  data() {
    return {
      zRotation: 0,
    };
  },
};
</script>

<style scoped lang="scss">
img {
    margin: auto;
}

#tp-player-sidebar {
  border-left: 1px solid black;
}

.home {
  padding: 0;
  margin: 0;
  max-width: 2000px;
}

#tp-player-sidebar-container {
  height: 100vh;
  padding-top: 0;
  padding-bottom: 0;
  margin-bottom: 0;
}

.sidebar-default {
  height: 45vh;
  border: 1px solid black;
  margin: 2.5vh auto 2.5vh auto;

  img {
    max-width: 100%;
    height: 95%;
    margin-top: 2.5%;
    margin-bottom: 2.5%;
    vertical-align: middle;
  }
}
</style>
