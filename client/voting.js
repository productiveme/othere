var remaining = new ReactiveVar();

function likeCard($ctrl) {
  $ctrl.find('button').hide();
  $ctrl.addClass('rotate-left').delay(700).fadeOut(1);
  $('.post').find('.status').remove();
  $ctrl.append('<div class="status like">Like!</div>');
  remaining.set(remaining.get()-1);
}

function unlikeCard($ctrl) {
  $ctrl.find('button').hide();
  $ctrl.addClass('rotate-right').delay(700).fadeOut(1);
  $('.post').find('.status').remove();
  $ctrl.append('<div class="status dislike">Dislike!</div>');
  remaining.set(remaining.get()-1);
}

Template.voting.onRendered(function() {
  this.autorun(function() {
    Meteor.subscribe("postToVote", function() {
      remaining.set(Posts.find().count());
    })
  });

  this.autorun(function() {
    if(remaining.get() <= 0) {
      DiscoverVM.state.set("closeVoting", true);
    }
  });
});

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

Template.post.events({
  "click button[name=love]": function(ev, tmpl) {
    likeCard(tmpl.$('.post'));
    Meteor.call("likePost", this._id);
  },
  "click button[name=hate]": function(ev, tmpl) {
    unlikeCard(tmpl.$('.post'));
    Meteor.call("unlikePost", this._id);
  }
});
