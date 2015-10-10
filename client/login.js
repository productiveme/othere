Template.login.events({
  'submit form': function(event) {
    event.preventDefault();
    var usernameVar = event.target.loginUsername.value;
    var passwordVar = event.target.loginPassword.value;
    Meteor.loginWithPassword(usernameVar, passwordVar);
  }
});