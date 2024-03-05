
$(document).ready(() => {
  const $body = $('body');
  const $tweetsContainer = $('<div id="tweets-container"></div>');
  $body.append($tweetsContainer);

  let currentUser = ''; // Global variable to store the user's chosen username

  // Function to update tweets
  const updateTweets = () => {
    $tweetsContainer.html('');

    // Display tweets in reverse chronological order
    const reversedTweets = streams.home.slice().reverse();

    reversedTweets.forEach((tweet) => {
      const $tweet = $('<div class="tweet"></div>');
      const $username = $(`<span class="username" onclick="clickUsername('${tweet.user}')">@${tweet.user}</span>`);
      const $message = $(`<span class="message">${formatMessage(tweet.message)}</span>`);
      const $timestamp = $(`<span class="timestamp">${moment(tweet.created_at).fromNow()}</span>`);

      $tweet.append($username, ': ', $message, ' - ', $timestamp);
      $tweetsContainer.append($tweet);
    });
  };

  // Function to show user's timeline
  const showUserTimeline = (username) => {
    $tweetsContainer.html('');
    const userTweets = streams.users[username];

    userTweets.forEach((tweet) => {
      const $tweet = $('<div class="tweet"></div>');
      const $message = $(`<span class="message">${formatMessage(tweet.message)}</span>`);
      const $timestamp = $(`<span class="timestamp">${moment(tweet.created_at).fromNow()}</span>`);

      $tweet.append($message, ' - ', $timestamp);
      $tweetsContainer.append($tweet);
    });
  };

  // Function to format messages and linkify hashtags
  const formatMessage = (message) => {
    return message.replace(/#(\w+)/g, '<span class="hashtag" onclick="showHashtag(\'$1\')">#$1</span>');
  };

  // Function to show tweets with a specific hashtag
  const showHashtag = (hashtag) => {
    $tweetsContainer.html('');

    // Display tweets with the clicked hashtag
    const hashtagTweets = streams.home.filter((tweet) => tweet.message.includes(`#${hashtag}`)).reverse();

    hashtagTweets.forEach((tweet) => {
      const $tweet = $('<div class="tweet"></div>');
      const $username = $(`<span class="username" onclick="clickUsername('${tweet.user}')">@${tweet.user}</span>`);
      const $message = $(`<span class="message">${formatMessage(tweet.message)}</span>`);
      const $timestamp = $(`<span class="timestamp">${moment(tweet.created_at).fromNow()}</span>`);

      $tweet.append($username, ': ', $message, ' - ', $timestamp);
      $tweetsContainer.append($tweet);
    });
  };

  // Function to handle tweet submission
  const submitTweet = () => {
    const tweetMessage = $tweetInput.val();
    if (tweetMessage) {
      writeTweet(tweetMessage);
      updateTweets();
      $tweetInput.val('');
    }
  };

  // Function to handle clicking on a username
  window.clickUsername = (username) => {
    if (username === currentUser) {
      showUserTimeline(username);
    }
  };

  // Function to update tweets every 30 seconds
  const scheduleUpdateTweets = () => {
    updateTweets();
    setTimeout(scheduleUpdateTweets, 30000);
  };
  scheduleUpdateTweets();

  // Input field for username
  const $usernameInput = $('<input id="username-input" placeholder="Set your username...">');
  const $setUsernameButton = $('<button id="set-username-button">Set Username</button>');

  $setUsernameButton.click(() => {
    currentUser = $usernameInput.val();
    if (currentUser) {
      $usernameInput.prop('disabled', true);
      $setUsernameButton.prop('disabled', true);
      $tweetInput.prop('placeholder', `Compose your tweet as @${currentUser}...`);
    }
  });

  // Input field for composing tweets
  const $tweetInput = $('<input id="tweet-input" placeholder="Compose your tweet...">');
  const $tweetButton = $('<button id="tweet-button">Tweet</button>');

  $tweetButton.click(submitTweet);

  $body.append($usernameInput, $setUsernameButton, $tweetInput, $tweetButton);

  // Initial tweet display
  updateTweets();
});
