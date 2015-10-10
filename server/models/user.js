Meteor.methods({
  shouldUserVoteFirst: function() {
    debugger;
    check(this.userId, String);

    var filters = {
      userId: this.userId,
      timestamp: {
        $gte: moment().subtract(Meteor.settings.numberOfDaysToCheckVotes,'days').toDate()
      }
    };

    var options = {
      fields: {
        _id: 1
      }
    };

    return Votes.find(filters, options).count() < Meteor.settings.minimumVotes;
  }
});
