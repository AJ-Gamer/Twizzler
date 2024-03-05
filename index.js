
$(document).ready(() => {
  const $body = $('body');
  const $tweetsContainer = $('<div id="tweets-container"></div>');
  $body.append($tweetsContainer);

  const updateTweets = () => {
    $tweetsContainer.html('');

    // Display tweets in reverse chronological order
    const reversedTweets = streams.home.slice().reverse();

    reversedTweets.forEach((tweet) => {
      const $tweet = $('<div class="tweet"></div>');
      const $username = $(`<span class="username">@${tweet.user}</span>`);
      const $message = $(`<span class="message">${tweet.message}</span>`);
      const $timestamp = $(`<span class="timestamp">${moment(tweet.created_at).fromNow()}</span>`);

      
    })
   }
});
