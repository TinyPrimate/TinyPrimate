<template>
  <div class="home">
    <!-- monkey_icon.svg was originally downloaded from https://en.m.wikipedia.org/wiki/File:Monkey.svg -->
    <img src="../assets/monkey_icon.svg">
    <HelloWorld msg="Welcome to TinyPrimate"/>
    <AlbumControl/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import AlbumControl from '@/components/audio/v1/AlbumControl.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
    AlbumControl,
  },
};
</script>
