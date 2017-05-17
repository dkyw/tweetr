$(document).ready(function() {

// var data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];
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

function renderTweets(tweets) {
  //clears the tweet container before appending tweets
  $('.tweets').empty();

  for (let tweet of tweets) {
    $('#tweets-container').append(createTweetElement(tweet))
  }
}



$('form').submit(function(event) {
  event.preventDefault();

  $.ajax({
    data: $(this).serialize(),
    url: '/tweets',
    method: 'POST'
  }).done(function() {
    loadTweets();
  })
})


function loadTweets() {
  $.ajax({
    url: '/tweets',
    method: 'GET'
  }).done(function(tweets) {
    let sorted = tweets.sort(function(a ,b) {
      return b.created_at - a.created_at
    })
    renderTweets(sorted);
  })
}

//renderTweets(data);
loadTweets();

}); //end