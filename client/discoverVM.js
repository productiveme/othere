DiscoverVM = {
  state: null,
  showVoting: function() {
    $('#votingTemplate').one(_animationEnded, function() {
      $(this).removeClass("animated slideInUp");
    });
    $("#votingTemplate").toggleClass("hidingBottom animated slideInUp");
  },
  hideVoting: function() {
    vm = this;
    $('#votingTemplate').one(_animationEnded, function() {
      vm.state.set("shouldVoteFirst", false);
      $(this).toggleClass("animated slideOutDown hidingBottom");
    });
    $("#votingTemplate").addClass("animated slideOutDown");
  }
}
