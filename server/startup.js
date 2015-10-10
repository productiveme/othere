Meteor.startup(function() {
  if(!Meteor.users.findOne()) {
    createFixtures();
  }

  //Hack to load settings from private/settings.json automatically
  //Expose the server environment to the client
  //If settings are supplied on the command line use those instead
  var environment;
  environment = process.env.NODE_ENV || "development";
  _.extend(Meteor.settings, JSON.parse(process.env.METEOR_SETTINGS || Assets.getText("settings.json")));
  if (Meteor.settings && Meteor.settings["public"]) {
    Meteor.settings["public"].environment = environment;
    return __meteor_runtime_config__.PUBLIC_SETTINGS = Meteor.settings["public"];
  }
});
