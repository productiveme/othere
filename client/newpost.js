Template.newpost.onCreated( function() {
  var tmpl = this;
  tmpl.photoSrc = new ReactiveVar();
});

Template.newpost.onRendered( function() {
  var tmpl = this;
  tmpl.photoSrc.set(null);
});

Template.newpost.helpers({
  photo: function () {
    var tmpl = Template.instance();
    return tmpl.photoSrc.get();
  }
});

Template.newpost.events({
  'click button[name=snap]': function (ev, tmpl) {
    var cameraOptions = {
      width: 800,
      height: 800
    };

    MeteorCamera.getPicture(cameraOptions, function (error, data) {
      tmpl.photoSrc.set(data);
    });
  },
  'click button[name=submit]': function (ev, tmpl) {
    Posts.insert({
      photoSrc: tmpl.photoSrc.get(),
      title: tmpl.$("input[name=title]").val(),
      description: tmpl.$("textarea[name=description]").val(),
      owner: Meteor.userId(),
      geo: Geolocation.latLng(),
      timestamp: new Date(),
      active: true
    });
    Router.go('/');
  }
});