var rootURL = 'https://bb-election-api.herokuapp.com/';

$(document).ready(function() {
  $('body').css('background-size', '100%');
  $('body').css('background-repeat', 'no-repeat');
  $('body').css('background-image', 'url(images/bikini-bottom.jpg)');
  $.ajax({
    url: rootURL,
    method: 'GET',
    dataType: 'json'
      // data: { limit: 2, stuff: 4 }
  }).done(function(data) {
    var candidates = data.candidates;
    for (var i = 0; i < candidates.length; i++) {
      $('#results').append(candidateItem(candidates[i]));
    }
    bindPostRequests();
    setTimeout(refresh, 1000);
  }).fail(function() {
    $('#errors').append('<p class="error">[Error loading election results.]</p>');
  }).always(function() {});



  $('#results').css('list-style', 'none');
  $('#results').css('padding', '0');
  $('body').css('text-align', 'center');
  $('body').css('background-size', '100%');
  $('body').css('background-repeat', 'no-repeat');
  $('body').css('background-image', 'url(images/bikini-bottom.jpg)');
  // Imagination!

});

function candidateItem(candidate) {
  var output = $('<li></li>');
  var voteForm = $('<form method="POST", class="vote-form"></form>');
  var button = $('<input type="submit", value="Vote!">');
  var hidden = $('<input type="hidden", name="id">');
  output.html(
    '<strong>' +
    candidate.name +
    ':</strong> <em>' +
    candidate.votes +
    '</em>'
  );
  voteForm.attr('action', rootURL + 'vote');
  hidden.val(candidate.id);
  voteForm.append(hidden).append(button);
  return output.append(voteForm);
}

function bindPostRequests() {
  $('.vote-form').on('submit', function(e) {
    e.preventDefault();
    console.log($(this).serialize());
    $.ajax({
      url: $(this).attr('action'),
      method: $(this).attr('method'),
      dataType: 'json',
      data: $(this).serialize()
    }).done(function(data) {
      console.log(data)

    }).fail(function() {
      $('#errors').append('<p class="error">[Voting Error.]</p>');
    }).always();
  });
}

function refresh() {
  $.ajax({
    url: rootURL,
    method: 'GET',
    dataType: 'json'
      // data: { limit: 2, stuff: 4 }
  }).done(function(data) {
    var candidates = data.candidates;
    $('#results > li').each(function(index) {
      $(this).find('strong').html(candidates[index].name + ':');
      $(this).find('em').html(candidates[index].votes);
    });
    // console.log(data);
    setTimeout(refresh, 5000);
  }).fail(function() {
    $('#errors').append('<p class="error">[Error loading election results.]</p>');
  }).always(function() {});
}
