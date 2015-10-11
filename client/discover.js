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

  Meteor.call("shouldUserVoteFirst", function(err, result) {
    if(!err) {
      DiscoverVM.state.set("shouldVoteFirst", result);
    }
  });
});

Template.discover.helpers({
  // voteFirst: function() {
  //   return DiscoverVM.state.get("shouldVoteFirst")
  // }
});
