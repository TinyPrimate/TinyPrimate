import { expect } from 'chai';
import Vue from 'vue';
import PlaybackControl from '@/components/audio/v1/PlaybackControl.vue';


describe('PlaybackControl.vue module', () => {
  // Inspect the raw component options
  it('has an array of beforeCreate hooks', () => {
    expect(PlaybackControl.beforeCreate).to.be.a('Array');
    expect(PlaybackControl.beforeCreate[0]).to.be.a('Function');
  });

  it('contains all expected methods', () => {
    const mth = PlaybackControl.methods;
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
    expect(PlaybackControl.data).to.be.a('Function');
  });
});

describe('PlaybackControl component instance', () => {
  it('should be an instance of Vue', () => {
    const vm = new Vue(PlaybackControl).$mount();
    expect(vm).to.be.an.instanceOf(Vue);
  });
});
