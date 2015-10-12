Posts._ensureIndex({'loc':'2dsphere'});
Posts._ensureIndex({'voters': 1});

// extend Posts collection
Posts.filterNearMe = function(lng, lat) {
  try {
    check(lng, Number);
    check(lat, Number);
  } catch (err) {
    return { __blocked: true };
  }

  filters = {
    "loc": {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [
            lng, lat
          ],
          $maxDistance: Meteor.settings.nearInMetres
        }
      }
    }
  }
  return filters;
}

Posts.filterUnseenPostsNearMe = function(userId, lng, lat) {
  check(userId, String);
  var filters = Posts.filterNearMe(lng, lat);
  filters = _.extend(filters, {
    voters: {
      $ne: userId
    }
  });
  return filters;
};

Meteor.startup(function() {
  var initializing = true;
  Votes.find().observe({
    added: function(doc) {
      if (!initializing) {
        var operation = {
          $addToSet: {
            voters: doc.user._id
          },
          $inc: {}
        };
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

Meteor.publish("bestposts", function(lng, lat) {
  return Posts.find(Posts.filterNearMe(lng, lat), {sort: {likeCount: -1}, limit: 5, fields: {photoSrc: 1, title: 1, description: 1, likeCount: 1, unlikeCount: 1}});
});

Meteor.publish("worstposts", function(lng, lat) {
  return Posts.find(Posts.filterNearMe(lng, lat), {sort: {unlikeCount: -1}, limit: 5, fields: {photoSrc: 1, title: 1, description: 1, likeCount: 1, unlikeCount: 1}});
});

Meteor.publish("postsToVote", function(lng, lat) {
  return Posts.find(Posts.filterUnseenPostsNearMe(this.userId, lng, lat), {fields: {photoSrc: 1, title: 1, description: 1}})
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
        _id: postId
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
        _id: postId
      },
      voted: -1,
      timestamp: new Date()
    };
    return Votes.insert(vote);
  },
  insertPost: function(photoSrc, title, description, lng, lat) {
    check(photoSrc, String);
    check(title, String);
    check(description, String);
    check(lng, Number);
    check(lat, Number);

    Posts.insert({
      photoSrc: photoSrc,
      title: title,
      description: description,
      owner: this.userId,
      "loc": {
        "type" : "Point",
        "coordinates" : [ lng, lat ]
      },
      timestamp: new Date(),
      active: true
    });
  },
})
