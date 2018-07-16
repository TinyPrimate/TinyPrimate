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
    <li :key="track.trackId" v-for="track in playlist">{{ track.title }}</li>
  </div>
</template>

<script type="text/javascript">
import PlaylistFactory from '@/factories/PlaylistFactory.vue';

export default {
  data() {
    return {
      playlist: {},
    };
  },
  components: {
    PlaylistFactory,
  },
  methods: {
    assemblePlaylist() {
      this.playlist = PlaylistFactory.methods.getTracksByFilter();
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
  },
  mounted() {
    this.assemblePlaylist();
  },
};
</script>

<style type="scss">
/*#playlist {
  width: 100%;
  height: 500px;
  border: 2px solid black;
}*/

li {
  list-style: none;
  text-align: left;
  padding: 3px;
  border-top: 1px solid black;
}
</style>
