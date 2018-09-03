import { expect } from 'chai';
import Playlist from '@/components/audio/v1/Playlist.vue';
// import PlaylistFactory from '@/factories/PlaylistFactory.vue';
import Vue from 'vue';

describe('Playlist.vue', () => {
  const vm = new Vue(Playlist);
  const audioBucketUrl = 'https://s3.us-east-2.amazonaws.com/tinyprimate-1';

  it('assemblePlaylist() assembles the default playlist with no query passed in', () => {
    const playlist = vm.assemblePlaylist();
    // verifies the default playlist is returned when no query parameter passed in
    expect(playlist).to.eql({
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
    });
  });
});
