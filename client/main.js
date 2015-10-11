Template.main.onRendered(function() {
  this.autorun(function() {
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

Template.main.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});
