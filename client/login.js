Template.login.events({
  'submit form': function(event, tmpl) {
    event.preventDefault();
    Meteor.loginWithPassword(tmpl.$("input[name=loginUsername]").val(), tmpl.$("input[name=loginPassword]").val());
  },
  'click .registerLink': function(event, tmpl) {
    event.preventDefault();
    Session.set("isRegistering",true);
  }
});
