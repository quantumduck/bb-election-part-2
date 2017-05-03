$(document).ready(function() {
  var rootURL = 'https://bb-election-api.herokuapp.com/';
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
      $('#results').append(
        '<li><strong>' +
        candidates[i].name +
        ':</strong> <em>' +
        candidates[i].votes +
        '</em></li>'
      );
    }
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
