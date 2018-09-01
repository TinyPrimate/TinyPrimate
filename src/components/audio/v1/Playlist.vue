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
  <div id="playlist">
    <PlaybackControl/>
    <!-- <li :key="track.trackId" v-for="track in playlist" v-on:click="selectTrack(track)"> -->
    <li :key="track.trackId" v-for="track in playlist">
      <audio controls v-bind:src="track.url" v-bind:data-title="track.title">
      <!-- <audio controls v-for="track in playlist" v-bind:src="track.url" v-bind:data-title="track.title"> -->
      </audio>
    </li>
  </div>
</template>

<script type="text/javascript">
import PlaylistFactory from '@/factories/PlaylistFactory.vue';
import PlaybackControl from '@/components/audio/v1/PlaybackControl.vue';

export default {
  data() {
    return {
      playlist: {},
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
    selectTrack(track = null) {
      const selectedTrack = track;
      // Pass selected track to PlaybackControl component
      this.$children[0].selectTrack(selectedTrack);
    },
  },
  mounted() {
    this.assemblePlaylist();
  },
};
</script>

<style type="scss" scoped>
#playlist {
  width: 38%;
  height: 500px;
  border: 2px solid black;
  padding: 5px;
}

div {
  background-color: lightblue;
}

li {
  list-style: none;
  text-align: left;
  padding: 3px;
  border-top: 1px solid black;
}
</style>
