Template.discover.onRendered(function() {
  var tmpl = this;
  DiscoverVM.state = new ReactiveDict();

  tmpl.autorun(function() {
    if(DiscoverVM.state.get("shouldVoteFirst")) {
      DiscoverVM.showVoting();
    }
  });

  tmpl.autorun(function() {
    if(DiscoverVM.state.get("closeVoting")) {
      DiscoverVM.hideVoting();
    }
  });

  tmpl.autorun(function() {
    coords = Session.get("coordinates");
    if(_.isObject(coords)) {
      tmpl.subscribe("bestposts", coords.lng, coords.lat);
      tmpl.subscribe("worstposts", coords.lng, coords.lat);

      Meteor.call("shouldUserVoteFirst", coords.lng, coords.lat, function(err, result) {
        if(!err) {
          DiscoverVM.state.set("shouldVoteFirst", result);
        }
      });
    }
  });

});

Template.discover.helpers({
  bestposts: function() {
    return Posts.find({ likeCount: { $gte: 0 } }, { sort: { likeCount: -1 }, limit: 5 } );
  },
  worstposts: function() {
    return Posts.find({ unlikeCount: { $gte: 0 } }, { sort: { unlikeCount: -1 }, limit: 5 } );
  }
  // voteFirst: function() {
  //   return DiscoverVM.state.get("shouldVoteFirst")
  // }
});
