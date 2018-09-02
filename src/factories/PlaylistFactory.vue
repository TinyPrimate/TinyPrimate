<!--
  Purpose:
    Interact with API for Playlist functionality

  Data Properties:
    tracks - An array of track record objects.

  Methods:
    getTracksByFilter - returns tracks by filter query. Filter
      passed in should be an object, with keys being
      columns on the `tracks` table and their values
      being... well... the values... TODO: Connect to API

WARNING!!!! SQL INJECTION!!!!
LEARN ABOUT PREPARED STATEMENTS WHEN
IMPLEMENTING THIS API IN A PROD ENVIRONMENT!!!!!

-TinyPrimate
-->

<script type="text/javascript">
export default {
  data() {
    return {
      tracks: [],
      audioBucketHost: '',
      audioBucketUrl: 'https://s3.us-east-2.amazonaws.com/tinyprimate-1',
    };
  },
  methods: {
    // This is getting hard-coded for now, for testing
    // purposes and to establish architechture early
    getTracksByFilter(audioBucketUrl = this.audioBucketUrl, query = null) {
      // TODO: Implement the following API interaction
      // TODO: Remove the hard-coded array of tracks
      // this.tracks = axiom.get({{apiUrl}}/tracks/{{queryParameters}});
      if (!query) {
        // TODO: return error bubbled up to user that tells them to select an option/enter a query
        // TODO: Break apart url so that we have separate properties for host and album/playlist (gives chance to route requests to API later)
        this.tracks = {
          0: {
            trackId: 0,
            title: 'Bunny-Ball__8',
            url: `${audioBucketUrl}/albums/baby-talk/Bunny-Ball__8.wav`,
          },
          1: {
            trackId: 1,
            title: 'Contortionist__5',
            url: `${audioBucketUrl}/albums/baby-talk/Contortionist__5.wav`,
          },
          2: {
            trackId: 2,
            title: 'Rubber Ducky__7',
            url: `${audioBucketUrl}/albums/baby-talk/Rubber+Ducky__7.wav`,
          },
          3: {
            trackId: 3,
            title: 'ƒøåm__5',
            url: `${audioBucketUrl}/albums/baby-talk/%C6%92%C3%B8a%CC%8Am__5.wav`,
          },
          4: {
            trackId: 4,
            title: 'Crib__23',
            url: `${audioBucketUrl}/albums/baby-talk/Rubber+Crib__23.wav`,
          },
          5: {
            trackId: 5,
            title: 'Baby Talk__3',
            url: `${audioBucketUrl}/albums/baby-talk/Baby+Talk__3.wav`,
          },
          6: {
            trackId: 6,
            title: 'Kitty Party__4',
            url: `${audioBucketUrl}/albums/baby-talk/Kitty+Party__4.wav`,
          },
          15: {
            trackId: 15,
            title: 'Tiny Primate__4',
            url: `${audioBucketUrl}/albums/baby-talk/Tiny+Primate__4.wav`,
          },
        };
      }
      // else this.tracks = axiom.response
      return this.tracks;
    },
  },
};
</script>
