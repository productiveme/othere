function likeCard($ctrl) {
  $ctrl.addClass('rotate-left').delay(700).fadeOut(1);
  $('.post').find('.status').remove();
  $ctrl.append('<div class="status like">Like!</div>');
}

function unlikeCard($ctrl) {
  $ctrl.addClass('rotate-right').delay(700).fadeOut(1);
  $('.post').find('.status').remove();
  $ctrl.append('<div class="status dislike">Dislike!</div>');
}

Template.voting.helpers({
  posts: function() {
    return Posts.find();
  }
});

Template.voting.events({
  "swiperight .post": function(ev, tmpl) {
    likeCard($(ev.currentTarget));
    Meteor.call("likePost", this._id);
  },
  "swipeleft .post": function(ev, tmpl) {
    unlikeCard($(ev.currentTarget));
    Meteor.call("unlikePost", this._id);
  }
});
