Template.login.events({
  'submit form': function(event, tmpl) {
    event.preventDefault();
    Meteor.loginWithPassword(tmpl.$("input[name=loginUsername]").val(), tmpl.$("input[name=loginPassword]").val(), function(error){
      if(error){
        sAlert.error(error.reason , {effect: 'scale', position: 'bottom', timeout: '2000', onRouteClose: false, stack: false});
      }
    });
  },
  'click .registerLink': function(event, tmpl) {
    event.preventDefault();
    Session.set("isRegistering",true);
  }
});
