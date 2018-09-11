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
  <v-container class="player">
    <div class="playback-control" ref="playback-control">
      <h3 id="currentTimeInSeconds">{{ currentTimeInSeconds }}</h3>
      <v-btn id="playButton" v-on:click="playTrack">play</v-btn>
      <v-btn id="pauseButton" v-on:click="pauseTrack">pause</v-btn>
    </div>
    <div class="playlist-div">
      <ul class="playlist" ref="playlist">
        <li
          v-for="(track, key, index) in playlist"
          v-bind:key="track.trackId"
          class="playlist-item elevation-2"
          v-on:click="selectTrack(track, index)">
          <v-card class="playlist-card">
            {{index + 1}}. {{track.title}}
            <audio preload="none" ref="tracks" v-bind:src="track.url" v-bind:data-title="track.title">
            </audio>
          </v-card>
        </li>
      </ul>
    </div>
  </v-container>
</template>

<script type="text/javascript">
import PlaylistFactory from '@/factories/PlaylistFactory.vue';

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
  },
  created() {
  },
  methods: {
    assemblePlaylist(context) {
      // catch for if vue component not passed in use most likely scenario
      const vc = context || this;
      // if (!context) {
      //   vc = this;
      // } else {
      //   vc = context;
      // }
      return new Promise((resolve, reject) => {
        vc.playlist = PlaylistFactory.methods.getTracksByFilter('https://s3.us-east-2.amazonaws.com/tinyprimate-1');
        // if ajax call, trigger next line at success event instead of if statement
        if (vc.playlist) {
          resolve(vc.playlist);
        }
        reject(vc.playlist);
      });
      // based on object indexing may not work on non test data
      // console.log("this.playlist", this.playlist);
      // this.selectTrack();
      // return this.playlist;
    },
    playTrack(event, trackToPlay = this.selectedTrack) {
      trackToPlay.play();
      this.startPlaybackTicker(trackToPlay, 100);
    },
    pauseTrack(event, trackToPause = this.selectedTrack) {
      trackToPause.pause();
    },
    selectTrack(track = null, index = 0, autoPlay = true) {
      // Skip pausing if no track currently selected
      if (this.selectedTrack) {
        // early exit if user re-selects the currently selected track
        if (this.selectedTrack.key === track.trackId) {
          return;
        }
        // Ensure currently selected track is paused so no two tracks play simultaneously
        this.selectedTrack.pause();
      }
      this.selectedTrack = this.$refs.tracks[index];
      if (autoPlay) {
        this.playTrack();
      }
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
    this.assemblePlaylist(this)
      .then(() => {
        this.selectTrack(null, 0, false);
      });
    // select the first track from this.tracks
    // may have a bug if indexing based on keys not position
    // this.selectTrack(null, 0);
  },
};
</script>

<style type="scss" scoped>
.playlist-item {
  height: 5vh;
  margin: 0.5vh 0 0 0;
  list-style: none;
  text-align: left;
  border-top: 1px solid black;
}

.playlist {
  padding: 0;
  overflow: scroll;

}

.playlist-card {
  height: 100%;
}

.player {
  height: 100%;
  padding: 0;
}

.playlist-div {
  height: 70%;
  overflow: scroll;
}

.playback-control {
  height: 30%;
  border-bottom: 1px solid black;
  padding: 2vh;
}

.selected-track {
  background-color: tan;
}
/*.player {
  width: 25%;
  height: 500px;
  border-radius: 20px;
  padding: 0;
  padding: 0 5px 0 5px;
  margin: 0;
  position: fixed;
  background-color: lightgrey;
  bottom: 4vh;
  right: 2vh;
  box-shadow: 1px 1px 5px #888888;
  overflow: scroll;
}

.playlist {
  margin: 0;
  padding: 0;
}

.playlist-item {
  padding: 3px;
  margin: 0;
  border-top: 1px solid black;
  height: 5vh;
}

.playback-control {
  height: 10vh;
}

.selectedTrack {
  background-color: darkgrey;
}

audio {
  width: 100%;
}*/
</style>
