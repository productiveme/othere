Template.voting.events({
  "click button[name=doneButton]": function(ev, tmpl) {
    DiscoverVM.state.set("closeVoting", true);
  }
});
