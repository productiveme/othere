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

     var uploader = new Slingshot.Upload("myFileUploads");

     uploader.send(document.getElementById('input').files[0], function (error, downloadUrl) {
       if (error) {
         // Log service detailed response
         console.error('Error uploading', uploader.xhr.response);
         alert (error);
       }
       else {
         Meteor.users.update(Meteor.userId(), {$push: {"profile.files": downloadUrl}});
       }
     });


    coordinates = Session.get("coordinates");
    Meteor.call("insertPost", tmpl.photoSrc.get(), tmpl.$("input[name=title]").val(), tmpl.$("textarea[name=description]").val(), coordinates.lng, coordinates.lat)
    Router.go('/discover');
  }
});

Template.progressBar.helpers({
  progress: function () {
    return Math.round(this.uploader.progress() * 100);
  }
});
