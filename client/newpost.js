Template.newpost.onCreated( function() {
  var tmpl = this;
  tmpl.photoSrc = new ReactiveVar();
});

Template.newpost.onRendered( function() {
  var tmpl = this;
  tmpl.photoSrc.set(null);
  Tracker.afterFlush(function () {
    var cameraOptions = {
      width: 800,
      height: 800,
      quality: 75,
      // sourceType: Camera.PictureSourceType.CAMERA;
    };

    if ( Meteor.isCordova ) {
      cameraOptions.sourceType = Camera.PictureSourceType.CAMERA;
    };

    MeteorCamera.getPicture(cameraOptions, function(error, data) {
      if (error) {
        console.log('error', error);
      }
      if (data) {
        tmpl.photoSrc.set(data);
      }
    });
  });
});

Template.newpost.helpers({
  photo: function() {
    var tmpl = Template.instance();
    return tmpl.photoSrc.get();
  }
});

Template.newpost.events({
  'click button[name=submit]': function(ev, tmpl) {
    coordinates = Session.get("coordinates");
    Meteor.call("insertPost", tmpl.photoSrc.get(), tmpl.$("input[name=title]").val(), tmpl.$("textarea[name=description]").val(), coordinates.lng, coordinates.lat)
    Router.go('/discover');
  }
});
