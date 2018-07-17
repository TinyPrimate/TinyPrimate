<template>
  <div class="home">
    <!-- monkey_icon.svg was originally downloaded from https://en.m.wikipedia.org/wiki/File:Monkey.svg -->
    <img src="../assets/monkey_icon.svg">
    <HelloWorld msg="Welcome to TinyPrimate"/>
    <!-- <PlaybackControl/> -->
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
</style>
