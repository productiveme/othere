Meteor.methods({
  shouldUserVoteFirst: function(lng, lat) {
    return true; //#JS
    check(this.userId, String);
    check(lng, Number);
    check(lat, Number);

    var filters = {
      "user._id": this.userId,
      timestamp: {
        $gte: moment().subtract(Meteor.settings.numberOfDaysToCheckVotes,'days').toDate()
      }
    };

    var options = {
      fields: {
        _id: 1
      }
    };

    shouldVote = Votes.find(filters, options).count() < Meteor.settings.minimumVotes;
    somethingToVoteOn = Posts.find(Posts.filterUnseenPostsNearMe(this.userId, lng, lat)).count() > 0;
    return shouldVote && somethingToVoteOn;
  }
});
