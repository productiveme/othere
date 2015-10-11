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
