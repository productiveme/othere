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

Router.route('/register', function() {
  this.render('register');
});

Router.route("newpost");

Router.route("discover");
