function likeCard($ctrl) {
  $ctrl.addClass('rotate-left').delay(700).fadeOut(1);
  $('.post').find('.status').remove();

  $ctrl.append('<div class="status like">Like!</div>');
  if ( $ctrl.is(':last-child') ) {
    $('.post:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
  } else {
    $ctrl.next().removeClass('rotate-left rotate-right').fadeIn(400);
  }
}

function unlikeCard($ctrl) {
  $ctrl.addClass('rotate-right').delay(700).fadeOut(1);
  $('.post').find('.status').remove();
  $ctrl.append('<div class="status dislike">Dislike!</div>');

  if ( $ctrl.is(':last-child') ) {
    $('.post:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
    alert('Na-na!');
  } else {
    $ctrl.next().removeClass('rotate-left rotate-right').fadeIn(400);
  }
}

Template.voting.events({
  "swiperight .post": function(ev, tmpl) {
    likeCard($(ev.currentTarget));
  }
});
