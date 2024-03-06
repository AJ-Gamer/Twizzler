$(document).ready(() => {
  const $body = $('body');
  $body.html(''); // Clear the body

  // Tweets container
  const $tweetsDiv = $('<div id="tweets">');
  $body.append($tweetsDiv);

  let nameTracker;

  function makeNewTweets(array) {
    array.forEach(tweet => {
      let $tweet = $('<div></div>');
      let $userName = $(`<span class="username">@${tweet.user}</span>`);

      let timeAgo = moment(tweet.created_at).fromNow();
      $tweet.text(`: ${tweet.message} - ${timeAgo}`);

      $tweetsDiv.prepend($tweet);
      $tweet.prepend($userName);

      $userName.on('click', function () {
        let username = $(this).text();
        console.log(username);

        $tweetsDiv.html('');
        $tweetsDiv.prepend(makeNewTweets(streams.users[tweet.user]));
      });
    });
  }

  // Create a button that updates the feed
  $button = $('<button id="update-feed">Refresh</button>')
  $body.prepend($button);

  $button.click(function () {
    let tweets = streams.home;
    nameTracker = null;
    $tweetsDiv.html('');
    $tweetsDiv.prepend(makeNewTweets(tweets));
  });

  // Input fields for username and tweet message
  let $userInput = $('<input type="text" id="user-input" placeholder="Type user here">');
  let $tweetInput = $('<input type="text" id="tweet-input" placeholder="Type tweet here">');
  let $tweetButton = $('<button id="tweet-button">Tweet</button>');

  $body.prepend($tweetInput);
  $body.prepend($userInput);
  $body.prepend($tweetButton);

  // Event handler for posting a tweet
  $tweetButton.click(function () {
    let message = $tweetInput.val();
    let user = $userInput.val();
    window.visitor = user;
    streams.users[user] = [];
    writeTweet(message);
    makeNewTweets(streams.users[user]);
  });

  // Display initial tweets
  makeNewTweets(streams.home);
});
