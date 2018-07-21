import { expect } from 'chai';
import Playlist from '@/components/audio/v1/Playlist.vue';
// import PlaylistFactory from '@/factories/PlaylistFactory.vue';
import Vue from 'vue';

describe('Playlist.vue', () => {
  const vm = new Vue(Playlist);
  const trackBucketUrl = '/Users/Sam/TinyPrimate/tinyprimate/src/assets/audio/baby_talk';

  it('assemblePlaylist() assembles the default playlist with no query passed in', () => {
    const playlist = vm.assemblePlaylist();
    // verifies the default playlist is returned when no query parameter passed in
    expect(playlist).to.eql({
      0: {
        trackId: 0,
        title: 'Tiny Primate__4',
        url: `${trackBucketUrl}/tiny_primate_4.wav`,
      },
      1: {
        trackId: 1,
        title: 'Contortionist__5',
        url: `${trackBucketUrl}/contortionist_5.wav`,
      },
    });
    // assert playlist track titles visible in dom. but first need to implement template.
  });

  it('getTrackSource() returns the correct source url if track id passed in as number', () => {
    const expectedUrl = `${trackBucketUrl}/tiny_primate_4.wav`;
    vm.assemblePlaylist();
    const actualUrl = vm.getTrackSource(0);
    expect(expectedUrl).to.equal(actualUrl);
  });

  it('getTrackSource() returns the correct source url if track index passed in as string', () => {
    const expectedUrl = `${trackBucketUrl}/tiny_primate_4.wav`;
    const actualUrl = vm.getTrackSource('0');
    expect(expectedUrl).to.equal(actualUrl);
  });

  it('getTrackSource() returns the expected response if no track id is passed in', () => {
    const response = vm.getTrackSource();
    expect(response).to.equal('Please provide a valid track id.');
  });

  it('getTrackSource() returns the expected response if invalid track id passed in', () => {
    const response = vm.getTrackSource('apple123;');
    expect(response).to.equal('Please provide a valid track id.');
  });
});
