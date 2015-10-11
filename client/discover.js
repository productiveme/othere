Template.discover.onRendered(function() {
  DiscoverVM.state = new ReactiveDict();

  this.autorun(function() {
    if(DiscoverVM.state.get("shouldVoteFirst")) {
      DiscoverVM.showVoting();
    }
  });

  this.autorun(function() {
    if(DiscoverVM.state.get("closeVoting")) {
      DiscoverVM.hideVoting();
    }
  });


  this.autorun(function() {
    coords = Session.get("coordinates");
    if(_.isObject(coords)) {
      Meteor.call("shouldUserVoteFirst", coords.lng, coords.lat, function(err, result) {
        if(!err) {
          DiscoverVM.state.set("shouldVoteFirst", result);
        }
      });
    }
  });

});

Template.discover.helpers({
  // voteFirst: function() {
  //   return DiscoverVM.state.get("shouldVoteFirst")
  // }
});
