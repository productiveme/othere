Meteor.startup(function() {
  if(!Meteor.users.findOne()) {
    createFixtures();
  }
});
