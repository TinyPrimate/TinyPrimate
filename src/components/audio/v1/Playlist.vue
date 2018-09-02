<!--
  Purpose:
    Initial purpose to be a child of a PlaybackControl component,
    although that does not have to be its only use.
    Will eventually control a PlaylistFactory instance to
    pass a request to the API for a specific set of
    song records. Those records are then used to construct
    a list of Audio objects with associated DOM elements.
    These records will not include the audio files themselves,
    for that would be silly. Instead, they will include links
    to the audio files, which are then given to a
    PlaybackControl to utilize. Only one bucket for PoC
    but will eventually want an environment-based system.

  Data Properties:
    playlist - an object containing track objects

  Methods:
    assemblePlaylist - calls PlaylistFactory.getTracksByFilter and sets
      this.playlist equal to the results
    getTrackSource - returns the source url for the given trackId. To be
      utilized by a parent component to load the file for the given track.

-TinyPrimate
-->

<template>
  <div class="player">
    <div class="playback-control" ref="playback-control">
      <h3 id="currentTimeInSeconds">{{ currentTimeInSeconds }}</h3>
      <button id="playButton" v-on:click="playTrack">play</button>
      <button id="pauseButton" v-on:click="pauseTrack">pause</button>
    </div>
    <ul class="playlist" ref="playlist">
      <li class="playlist-item" :key="track.trackId" v-for="(track, key, index) in playlist" v-on:click="selectTrack(track, index)">{{index + 1}}. {{track.title}}
        <audio ref="tracks" v-bind:src="track.url" v-bind:data-title="track.title">
        <!-- <audio controls v-bind:ref="track.trackId" v-bind:src="track.url" v-bind:data-title="track.title"> -->
        </audio>
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
import PlaylistFactory from '@/factories/PlaylistFactory.vue';
import PlaybackControl from '@/components/audio/v1/PlaybackControl.vue';

export default {
  data() {
    return {
      playlist: {},
      selectedTrack: null,
      currentTimeInSeconds: 0,
    };
  },
  components: {
    PlaylistFactory,
    PlaybackControl,
  },
  created() {
    // console.log('playlist: ', this);
  },
  methods: {
    assemblePlaylist() {
      this.playlist = PlaylistFactory.methods.getTracksByFilter('https://s3.us-east-2.amazonaws.com/tinyprimate-1');
      return this.playlist;
    },
    getTrackSource(trackId = null) {
      // Returns the url of the track stored in this.playlist
      // that has a key equal to the argument passed in
      if (!this.playlist[trackId]) {
        return 'Please provide a valid track id.';
      }
      return this.playlist[trackId].url;
    },
    playTrack(event, trackToPlay = this.selectedTrack) {
        trackToPlay.play();
        this.startPlaybackTicker(trackToPlay, 100);
    },
    pauseTrack(event, trackToPause = this.selectedTrack) {
      trackToPause.pause();
    },
    selectTrack(track = null, index = 0) {
      // Skip pausing if no track currently selected
      if (this.selectedTrack) {
        // early exit if user re-selects the currently selected track
        if (this.selectedTrack.key === track.trackId) {
          return
        }
        // Ensure currently selected track is paused so no two tracks play simultaneously
        this.selectedTrack.pause();
      }
      this.selectedTrack = this.$refs['tracks'][index];
      this.playTrack();
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
  },
  mounted() {
    this.assemblePlaylist();
  },
};
</script>

<style type="scss" scoped>
.player {
  width: 25%;
  height: 500px;
  border-right: 2px solid black;
  padding: 0;
  padding: 0 5px 0 5px;
  margin: 0;
  position: fixed;
  background-color: lightgrey;
  bottom: 4vh;
  left: 2vh;
  box-shadow: 1px 1px 5px #888888;
  overflow: scroll;
}

div {
  /*background-color: lightblue;*/
}

.playlist {
  margin: 0;
  padding: 0;
}

.playlist-item {
  list-style: none;
  text-align: left;
  padding: 3px;
  margin: 0;
  border-top: 1px solid black;
  height: 5vh;
}

.playback-control {
  height: 10vh;
}

audio {
  width: 100%;
}
</style>
