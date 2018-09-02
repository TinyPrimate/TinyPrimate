<!--
  Purpose:
    Used to instantiate new Playlist Controls components.
    Playlist Controls are used to provide an interface for
    a playlist

  Data Properties:
    selectedTrack - An HTML audio element containing the selected song
    currentTimeInSeconds - The currentTime property value for `selectedTrack`
    playbackTicker - the looping timeout function used

  Methods:
    playTrack - Begins or resumes playback of the audio element
      represented by `selectedTrack`
    pauseTrack - Pauses playback of the audio element
      represented by `selectedTrack`
    startPlaybackTicker - Begins an interval loop that is
      used to trigger events at a defined tickrate as `selectedTrack` plays
    stopInterval - clears out the interval instance passed to it. Used
      within this component to stop `playbackTicker`
    getCurrentTimeInSeconds - Returns the `currentTimeInSeconds` data
      property
    selectTrack - Pauses the current song and overwrites the
      `selectedTrack` audio element with a new element sourced from the audio asset
      passed into this method
    altTrack - A temporary development tool used to switch between two tracks.
      Impletmented to postpone having to construct custom
      track selection functionality.
-TinyPrimate
-->

<!-- html -->
<template>
<!--   <div id="playback_control_wrapper" ref="playback_control_wrapper">
    <button id="playButton" v-on:click="playTrack">play</button>
    <button id="pauseButton" v-on:click="pauseTrack">pause</button>
    <button id="altTrack" v-on:click="altTrack">change</button>
    <br><span id="currentTimeInSeconds">{{ currentTimeInSeconds }}</span>
    <audio controls src="https://s3.us-east-2.amazonaws.com/tinyprimate-1/albums/baby-talk/Tiny+Primate__4.wav"></audio>
  </div> -->
</template>

<!-- javascript -->

<!-- For now, the audio files are coded in.
However, this should connect to a network module
that fetches song records and returns
links to the files within s3 buckets
(or whatever best option chosen for audio storage)..
Somthing like.... import PlaylistFactory from @/factories/
-->
<script type="text/javascript">
// track urls hard coded for now, but will eventually come from Playlist.vue component
// import tinyPrimateWav from '@/assets/audio/baby_talk/tiny_primate_4.wav';
// import contortionistWav from '@/assets/audio/baby_talk/contortionist_5.wav';

export default {
  data() {
    return {
      currentTimeInSeconds: 0,
      selectedTrack: null,
      playbackTicker: null,
    };
  },
  methods: {

    // TODO, load track on initialization, so that playTrack always has a selectedTrack to work with

    // Begins or resumes playback of the audio element represented by `selectedTrack`
    playTrack() {
      // TODO Need a try catch HERE that gracefully handles no value for this.selectedTrack
      if (!this.selectedTrack) {
        (alert('Please select a song'));
        return;
      }
      const track = this.selectedTrack;
      // checks to see if track has been loaded yet.
      // If not, it loads track and aborts.
      //
      console.log('playTracks track', track);
      if (!this.isTrackInitialized(track)) {
        this.loadTrack(track);
        return;
      }
      // console.log('selected track element: ', this.tracks[track.trackId]);

      // THIS will be a problem. Changing to use web audio api. will need additional wiring
      this.tracks[track.trackId].play();
      this.startPlaybackTicker(this.tracks[track.trackId], 100);
    },

    // Pauses playback of the audio element represented by `selectedTrack`
    pauseTrack() {
      this.selectedTrack.pause();
      this.stopInterval(this.playbackTicker);
    },
    /*
      Begins an interval loop that is used to trigger events at
      a defined tickrate as `selectedTrack` plays
    */
    startPlaybackTicker(audioElement, tickrate = 1000) {
      this.playbackTicker = setInterval(() => {
        this.setCurrentTimeInSeconds(audioElement);
      }, tickrate);
    },

    // Clears out the interval instance passed to it
    stopInterval(intervalInstance) {
      clearInterval(intervalInstance);
    },

    // Returns the `currentTimeInSeconds` data property
    getCurrentTimeInSeconds() {
      return this.currentTimeInSeconds;
    },

    /*
    Sets the `currentTimeInSeconds` data property to be equal to the `currentTime` property
    value of the audio element `selectedTrack` rounded down to the nearest whole number.
    If `currentTime` value equals '5.99', `currentTimeInSeconds` will be set to equal '5'
    */
    setCurrentTimeInSeconds() {
      this.currentTimeInSeconds = Math.floor(this.selectedTrack.currentTime);
    },

    /*
    Pauses the current song and overwrites `selectedTrack` audio element with a new element
    sourced from a different audio file
    */

    // auto-select alternate track for user. dev use.
    altTrack() {
      // begin playing track Tiny Primate
      if (this.selectedTrack.src.includes(contortionistWav)) {
        this.selectTrack(tinyPrimateWav);

      // begin playing track Contortionist
      } else if (this.selectedTrack.src.includes(tinyPrimateWav)) {
        this.selectTrack(contortionistWav);
      }
    },
  },
};
</script>

<!-- scss -->
<style scoped lang="scss">
#currentTimeInSeconds {
  padding: 2px;
  text-align: middle;
}
button {
  width: 50px;
  height: 50px;
  background-color: grey;
  border: 1px solid black;
}
</style>
