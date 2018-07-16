import { expect } from 'chai';
import PlaylistFactory from '@/factories/PlaylistFactory.vue';
import Vue from 'vue';

describe('PlaylistFactory.vue getTracksByFilter()', () => {
  // The component must be instantiated outside of the test case
  const vm = new Vue(PlaylistFactory);
  it('returns the expected default dictionary of track objects', () => {
    const tracks = vm.getTracksByFilter();
    expect(tracks).to.be.a('Object');
    expect(tracks).to.eql({
      0: {
        trackId: 0,
        title: 'Tiny Primate__4',
        url: '@/assets/audio/baby_talk/tiny_primate_4.wav',
      },
      1: {
        trackId: 1,
        title: 'Contortionist__5',
        url: '@/assets/audio/baby_talk/contortionist_5.wav',
      },
    });
  });
  // TODO: Test getting a specific playlist
  // TODO: Test getting a specific song
});
