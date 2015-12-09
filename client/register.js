Template.register.events({
  'submit form': function(event, tmpl){
    event.preventDefault();
    Accounts.createUser({
      username: tmpl.$("input[name=registerUsername]").val(),
      email: tmpl.$("input[name=registerEmail]").val(),
      password: tmpl.$("input[name=registerPassword]").val()
    }, function(error){
      if(error){
        sAlert.error(error.reason , {effect: 'scale', position: 'bottom', timeout: '2000', onRouteClose: false, stack: false});
      }
    });
  },
 'click .loginLink': function(event, tmpl) {
    event.preventDefault();
    Session.set("isRegistering",false);
  }
});
