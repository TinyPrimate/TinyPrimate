<!-- html -->
<template>
  <div id="album_control_wrapper">
    <button id="playButton" v-on:click="playSong"></button>
    <audio v-bind:src="song" controls=""></audio>
  </div>
</template>

<!-- javascript -->
<script type="text/javascript">

import theSong from '@/assets/audio/baby_talk/tiny_primate_4.wav';
console.log(`the song: ${theSong}`);
const song = theSong;

const ctx = new AudioContext();
const getSong = new XMLHttpRequest();
let songBuffer; 
ctx.decodeAudioData(theSong).then((decodedBuffer)=>{
  songBuffer = decodedBuffer;
});
console.log(`sonfBuffer: ${songBuffer}`);
// const songSrc = '@/assets/audio/baby_talk/tiny_primate_4.wav';
// getSong.open('GET', '@/assets/audio/baby_talk/tiny_primate_4.wav', true);
// getSong.open('GET', './tinyprimate.wav', true);
// getSong.responseType = 'arraybuffer';
// let songBuffer;
// getSong.onload = function () {
//   console.log(`getSong.response ${getSong.response}`);
//   console.log(getSong.response.byteLength);
//   ctx.decodeAudioData(getSong.response, (buffer) => {
//     songBuffer = buffer;
//     console.log(`buffer loaded: ${songBuffer}`);
//   });
// };
// getSong.send();
function playSong() {
  const sourceNode = new AudioBufferSourceNode(ctx);
  sourceNode.buffer = songBuffer;
  sourceNode.start();
  console.log('clicked the button');
}



export default {
  name: 'AlbumControl',
  data() {
    return {
      playSong,
      song,
    };
  },
};
</script>

<!-- scss -->
<style scoped lang="scss">
button {
  background-color: red;
  width: 50px;
  height: 50px;
}

</style>
