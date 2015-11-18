Router.configure({
  layoutTemplate: 'main'
});

Router.onBeforeAction(function () {
  if (!Meteor.userId()) {
    this.render('login');
  } else {
    this.next();
  }
});

Router.route('/', function() {
  this.render('discover');
});

Router.route("newpost");

Router.route("discover");
Router.route("/logout", function(){
  Accounts.logout();
  this.render('login');
});
