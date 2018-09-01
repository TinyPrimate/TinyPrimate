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
        // console.log('this ', this);
        this.tracks = {
          0: {
            trackId: 0,
            title: 'Tiny Primate__4',
            url: `${audioBucketUrl}/albums/baby-talk/Tiny+Primate__4.wav`,
          },
          1: {
            trackId: 1,
            title: 'Contortionist__5',
            url: `${audioBucketUrl}/albums/baby-talk/Contortionist__5.wav`,
          },
        };
      }
      // else this.tracks = axiom.response
      return this.tracks;
    },
  },
};
</script>
