$(document).ready(function() {

var tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

function createTweetElement(tweet) {
  const tweetElement = $("<article>").addClass("tweet");

  //retrieve header info
  const $header = $("<header>");
   const $avatar = $("<img>").attr('src', tweet.user.avatars.small).addClass('avatar');
  const $name = $("<h2>").text(tweet.user.name).addClass("name");
  const $handle = $("<span>").text(tweet.user.handle).addClass('handle');
  console.log($handle);
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

var $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet)


});