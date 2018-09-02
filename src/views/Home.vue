<template>
  <div class="home">
    <img src="../assets/TinyPrimateLogo__Colorful__2.png">
    <Playlist/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import PlaybackControl from '@/components/audio/v1/PlaybackControl.vue';
import Playlist from '@/components/audio/v1/Playlist.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
    PlaybackControl,
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
</style>
