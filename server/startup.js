Meteor.startup(function() {
  if(!Posts.findOne()) {
    createFixtures();
  }
});
