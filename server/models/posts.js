Meteor.startup(function() {
  var initializing = true;
  Votes.find().observe({
    added: function(doc) {
      if (!initializing) {
        var operation = { $inc: {} };
        if(doc.voted > 0) {
          operation.$inc.likeCount = 1;
        } else {
          operation.$inc.unlikeCount = 1;
        }
        Posts.update({_id: doc.post._id}, operation);
      }
    }
  });
  initializing = false;
});

Meteor.methods({
  likePost: function(postId) {
    check(postId, String);
    check(this.userId, String);

    var vote = {
      user: {
        _id: this.userId
      },
      post: {
        _id: this._id
      },
      voted: 1,
      timestamp: new Date()
    };
    return Votes.insert(vote);
  },
  unlikePost: function(postId) {
    check(postId, String);
    check(this.userId, String);

    var vote = {
      user: {
        _id: this.userId
      },
      post: {
        _id: this._id
      },
      voted: -1,
      timestamp: new Date()
    };
    return Votes.insert(vote);
  }
})
