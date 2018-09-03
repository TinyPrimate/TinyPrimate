import { expect } from 'chai';
import PlaylistFactory from '@/factories/PlaylistFactory.vue';
import Vue from 'vue';

describe('PlaylistFactory.vue getTracksByFilter()', () => {
  // The component must be instantiated outside of the test case
  const vm = new Vue(PlaylistFactory);
  const audioBucketUrl = 'https://s3.us-east-2.amazonaws.com/tinyprimate-1';
  it('returns the expected default dictionary of track objects', () => {
    const tracks = vm.getTracksByFilter();
    expect(tracks).to.be.a('Object');
    expect(tracks).to.eql({
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
  // TODO: Test getting a specific playlist
  // TODO: Test getting a specific song
});
