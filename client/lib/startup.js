Meteor.startup(function() {
  Tracker.autorun(function() {
    var handle;
    if(Meteor.userId()) {
      handle = Meteor.setInterval(function() {
        Session.set("coordinates", Geolocation.latLng());
      }, 5000);
    } else {
      Meteor.clearInterval(handle);
    }
  });
});
