function likeCard($ctrl, vote) {
  $ctrl.addClass('rotate-left').delay(700).fadeOut(1);
  $('.post').find('.status').remove();
  $ctrl.append('<div class="status like">Like!</div>');

  return Votes.insert(vote);
}

function unlikeCard($ctrl, vote) {
  $ctrl.addClass('rotate-right').delay(700).fadeOut(1);
  $('.post').find('.status').remove();
  $ctrl.append('<div class="status dislike">Dislike!</div>');
  return Votes.insert(vote);
}

Template.voting.helpers({
  posts: function() {
    return Posts.find();
  }
});

Template.voting.events({
  "swiperight .post": function(ev, tmpl) {
    var vote = {
      user: {
        _id: Meteor.userId()
      },
      post: {
        _id: this._id
      },
      voted: 1,
      timestamp: new Date()
    };
    likeCard($(ev.currentTarget), vote);
  },
  "swipeleft .post": function(ev, tmpl) {
    var vote = {
      user: {
        _id: Meteor.userId()
      },
      post: {
        _id: this._id
      },
      voted: -1,
      timestamp: new Date()
    };
    unlikeCard($(ev.currentTarget), vote);
  }
});
