import { expect } from 'chai';
// import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
// import { createLocalVue } from '@vue/test-utils'
import PlaylistControls from '@/components/audio/v1/PlaylistControls.vue';

describe('PlaylistControls.vue module', () => {
  // Inspect the raw component options
  it('has an array of beforeCreate hooks', () => {
    expect(PlaylistControls.beforeCreate).to.be.a('Array');
    expect(PlaylistControls.beforeCreate[0]).to.be.a('Function');
  });

  it('contains all expected methods', () => {
    const mth = PlaylistControls.methods;
    expect(mth).to.be.a('Object');
    expect(mth.playTrack).to.be.a('Function');
    expect(mth.pauseTrack).to.be.a('Function');
    expect(mth.startPlaybackTicker).to.be.a('Function');
    expect(mth.stopInterval).to.be.a('Function');
    expect(mth.getCurrentTimeInSeconds).to.be.a('Function');
    expect(mth.selectTrack).to.be.a('Function');
    expect(mth.altTrack).to.be.a('Function');
  });

  it('has a function assigned to the component data option', () => {
    expect(PlaylistControls.data).to.be.a('Function');
  });
});

describe('PlaylistControls.vue component instance', () => {
  it('should be an instance of Vue', () => {
    const vm = new Vue(PlaylistControls).$mount();
    expect(vm).to.be.an.instanceOf(Vue);
  });
});
