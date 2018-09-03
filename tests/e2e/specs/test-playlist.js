module.exports = {
    // TODO: Cleanup crappy selectors
  'Test Home PlaybackControl': (browser) => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#playButton', 5000)
      .assert.elementPresent('#pauseButton')
      .waitForElementVisible('.playlist-item', 5000)
      .click('#playButton')
      // give it time to begin fetching track
      .pause(500)
      // after waiting for 1.5 seconds, assert playback timer displays
      // "1" to represent the number of seconds we are into the song
      .pause(1500)
      .assert.containsText('#currentTimeInSeconds', 1)
      // pause the song, wait 3 seconds,
      // then assert playback timer still displays the value set at pause
      .click('#pauseButton')
      .pause(3000)
      .assert.containsText('#currentTimeInSeconds', 1, 'Playback timer is still "1" after pausing and waiting for 3 seconds.')
      // resume playback, wait 2 seconds,
      // assert timer indicates we are now 3 total seconds into the track
      .click('#playButton')
      .pause(2000)
      .assert.containsText('#currentTimeInSeconds', 3, 'Playback timer should be "3" after resuming playback and waiting for 2 seconds.')
      // change tracks, assert playback timer restarts incrementing at 0
      .click('#app > div.home > div > ul > li:nth-child(8)')
      .pause('500')
      .assert.containsText('#currentTimeInSeconds', 0, 'Playback timer should be "0" after changing tracks')
      .pause(2200)
      .assert.containsText('#currentTimeInSeconds', 2, 'Playback timer should resume incrementing on the new track')
      .click('#pauseButton')
      .pause(2)
      .assert.containsText('#currentTimeInSeconds', 2, 'Playback timer should pause when new song is paused')
      .click('#app > div.home > div > ul > li:nth-child(2)')
      .pause(500)
      .assert.containsText('#currentTimeInSeconds', 0, 'Playback timer should reset when paused track is changed')
      .pause(1200)
      .assert.containsText('#currentTimeInSeconds', 1, 'Playback should begin immediately when new song selected while old song was paused')
      .end();
  },
};
