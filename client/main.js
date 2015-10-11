Template.main.helpers({
  'isRegistering': function(){
      return Session.get("isRegistering");
  }
});

Template.main.events({
  'click .logout': function(event){
      event.preventDefault();
      Meteor.logout();
  }
});