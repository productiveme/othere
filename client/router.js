Router.configure({
  layoutTemplate: 'main'
});

Router.onBeforeAction(function () {
  if (!Meteor.userId()) {
    this.render('login');
  } else {
    this.next();
  }
})

Router.route("newpost");
Router.route('/', function() {
  this.render('splash');
});