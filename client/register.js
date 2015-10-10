Template.register.events({
  'submit form': function(event){
    event.preventDefault();
    var usernameVar = event.target.registerUsername.value;
    var emailVar = event.target.registerEmail.value;
    var passwordVar = event.target.registerPassword.value;
    Accounts.createUser({
      username: usernameVar,
      email: emailVar,
      password: passwordVar
    });
  }
});