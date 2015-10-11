Template.register.events({
  'submit form': function(event, tmpl){
    event.preventDefault();
    Accounts.createUser({
      username: tmpl.$("input[name=registerUsername]").val(), 
      email: tmpl.$("input[name=registerEmail]").val(), 
      password: tmpl.$("input[name=registerPassword]").val()
    });
  },
 'click .loginLink': function(event, tmpl) {
    event.preventDefault();
    Session.set("isRegistering",false);
  }
});