// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'com.meteor.othere',
  name: 'othere',
  description: 'Best and Worst around you',
  author: 'Meteor Cape Town meetup',
  email: 'othere@productive.me',
  website: 'http://othere.meteor.com'
});

// Set up resources such as icons and launch screens.
// App.icons({
//   'iphone': 'icons/icon-60.png',
//   'iphone_2x': 'icons/icon-60@2x.png',
//   // ... more screen sizes and platforms ...
// });
//
// App.launchScreens({
//   'iphone': 'splash/Default~iphone.png',
//   'iphone_2x': 'splash/Default@2x~iphone.png',
//   // ... more screen sizes and platforms ...
// });

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0x378383ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');

App.accessRule("*");

// Pass preferences for a particular PhoneGap/Cordova plugin
// App.configurePlugin('com.phonegap.plugins.facebookconnect', {
//   APP_ID: '1234567890',
//   API_KEY: 'supersecretapikey'
// });
