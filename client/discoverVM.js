DiscoverVM = {
  state: null,
  showVoting: function() {
    $('#votingTemplate').one(_animationEnded, function() {
      $(this).removeClass("animated slideInLeft");
    });
    $("#votingTemplate").toggleClass("hidingLeft animated slideInLeft");
  },
  hideVoting: function() {
    vm = this;
    $('#votingTemplate').one(_animationEnded, function() {
      vm.state.set("shouldVoteFirst", false);
      $(this).toggleClass("animated slideOutLeft hidingLeft");
    });
    $("#votingTemplate").addClass("animated slideOutLeft");
  }
}
