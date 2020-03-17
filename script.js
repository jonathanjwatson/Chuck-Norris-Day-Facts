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
});
