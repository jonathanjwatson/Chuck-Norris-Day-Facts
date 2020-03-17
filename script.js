$(document).ready(function() {
  console.log("Hello World");

  function displayJoke(jokeToDisplay) {
    $("#fact").text(jokeToDisplay);
  }
  $("#new-fact").on("click", function() {
    $.ajax({
      url: "https://api.chucknorris.io/jokes/random",
      method: "GET"
    }).then(function(response) {
      console.log(response.value);
      displayJoke(response.value);
    });
  });
  $("#new-banana-fact").on("click", function() {
    $.ajax({
      url: "https://api.chucknorris.io/jokes/search?query=banana",
      method: "GET"
    }).then(function(response) {
      var indexToReturn = Math.round(Math.random() * response.result.length);
      console.log(response.result[indexToReturn].value);
      displayJoke(response.result[indexToReturn].value);
    });
  });
});
