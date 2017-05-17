$(document).ready(function() {

function createTweetElement(tweet) {
  const tweetElement = $("<article>").addClass("tweet");

  //retrieve header info
  const $header = $("<header>");
   const $avatar = $("<img>").attr('src', tweet.user.avatars.small).addClass('avatar');
  const $name = $("<h2>").text(tweet.user.name).addClass("name");
  const $handle = $("<span>").text(tweet.user.handle).addClass('handle');
  $header.append($avatar, $name, $handle);

  //retrieve body info
  const $body = $("<p>").text(tweet.content.text).addClass("content");

  //retrieve footer info
  const $footer = $("<footer>");
  const $time = moment(tweet.created_at).fromNow();
  const $timeStamp = $("<span>").text($time).addClass("time-stamp");
  const $heart = $('<i class="fa fa-heart icon" aria-hidden="true">').addClass('icons');
  const $retweet = $('<i class="fa fa-retweet icon" aria-hidden="true"></i>').addClass('icons');
  const $flag = $('<i class="fa fa-flag icon" aria-hidden="true"></i>').addClass('icons')
  $footer.append($timeStamp, $heart, $retweet, $flag)

  tweetElement.append($header, $body, $footer);
  return tweetElement;
}

function renderTweets(tweets) {
  //clears the tweet container before appending tweets
  $('#tweets-container').empty();
  for (let tweet of tweets) {
    $('#tweets-container').prepend(createTweetElement(tweet))
  }
}


$('form').submit(function(event) {
  event.preventDefault();

  let $content = $('.new-tweet textarea').val()

 //form validation
  if ($content === '') {
      $('.new-tweet .too-short').fadeIn(function() {
        setTimeout(function() {
          $('.too-short').fadeOut();
        }, 2000);
      });
      return;
    }

  if ($content.length > 140) {
    $('.new-tweet .too-long').fadeIn(function() {
      setTimeout(function() {
        $('.too-long').fadeOut();
      }, 2000);
    });
      return;
  }

   $.ajax({
    data: $(this).serialize(),
    url: '/tweets',
    method: 'POST'
  }).done(function() {
    loadTweets();
    //reset input fields
    $('.new-tweet textarea').val('');
    $('.new-tweet .counter').text('140');
  })
})


function loadTweets() {
  $.ajax({
    url: '/tweets',
    method: 'GET'
  }).done(function(tweets) {
    renderTweets(tweets);
  })
}

loadTweets();

}); //end

