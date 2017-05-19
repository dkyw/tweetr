$(document).ready(function() {

function createTweetElement(tweet) {
  //attach 'id' data attribute to every tweet in the container
  const tweetElement = $("<article>").data('id',tweet._id).addClass("tweet");

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
  const $heart = $('<i class="fa fa-heart like-button">').addClass('icons');
  //attach 'likes' data attribute to the counter and assign value to intial value 0
  const $likes = $('<span class="icons likes-counter"></span>').data('likes', tweet.likes).text(tweet.likes);
  const $retweet = $('<i class="fa fa-retweet"></i>').addClass('icons');
  const $flag = $('<i class="fa fa-flag"></i>').addClass('icons')
  $footer.append($timeStamp, $heart, $likes, $retweet, $flag)
  //combine header,body and footer to create tweet article
  tweetElement.append($header, $body, $footer);
  return tweetElement;
}

//----event handler for displaying and incrementing tweets------
$('#tweets-container').on('click', '.like-button', function(e) {
  let $heart = $(this);
  //specifically target the counter the event click happnened on
  let $likesCounter = $heart.siblings('.likes-counter');

  //retrieve the id of the tweet the event occured on to use in the url for ajax
  let $parent = $heart.parents('.tweet')
  let tweetId = $parent.data('id');

  //get current number of likes and increment by one for every click event
  let currentCount = $likesCounter.data('likes');
  currentCount++;
  //display and set the incremented count on 'likes' data attribute
  $likesCounter.text(currentCount);
  $likesCounter.data('likes', currentCount);


  $.ajax({
    url: `/tweets/${tweetId}/like`,
    method: 'POST',
  })
})


function renderTweets(tweets) {
  //clears the tweet container before appending tweets
  $('#tweets-container').empty();
  //prepend new tweet element onto DOM
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
    url: '/tweets/',
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

