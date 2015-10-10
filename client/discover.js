Template.discover.onCreated(function() {
  var tmpl = this;
  tmpl.shouldVoteFirst = new ReactiveVar();
});

Template.discover.onRendered(function() {
  var tmpl = this;
  Meteor.call("shouldUserVoteFirst", function(err, result) {
    if(!err) {
      tmpl.shouldVoteFirst.set(result);
    }
  });
});

Template.discover.helpers({
  voteFirst: function() {
    var tmpl = Template.instance();
    return tmpl.shouldVoteFirst.get();
  },
  name: function() {
    return Meteor.settings.public.appname;
  }
});
