
      $(document).ready(function() {
        
        /**
         * Function designed to take in a string and update the div with id fact with that string.
         */
        function displayJoke(jokeToDisplay) {
          $("#fact").text(jokeToDisplay);
        }

        /**
         * Function designed to take in a string and query the API with that string.
         */
        function getJokeBySearchTerm(termToSearch) {
          var queryURL =
            "https://api.chucknorris.io/jokes/search?query=" + termToSearch;
          $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            displayJoke(response.result[0].value);
          });
        }

        /**
         * Takes in a string.
         * If there is no array in local storage, it creates a new array with search term and sets local storage.
         * If there is an array, and a search term provided, update the array, and set local storage.
         * Else read the array from local storage.
         * Take the array, loop over it, and display it on the DOM
         */
        function readAndDisplay(searchTerm) {
          var searchTermsArray = localStorage.getItem("searchTerms");
          if (searchTermsArray === null) {
            localStorage.setItem("searchTerms", JSON.stringify([searchTerm]));
          } else if (searchTerm && searchTermsArray !== null) {
            searchTermsArray = JSON.parse(searchTermsArray);
            searchTermsArray.push(searchTerm);
            localStorage.setItem(
              "searchTerms",
              JSON.stringify(searchTermsArray)
            );
          } else {
            searchTermsArray = JSON.parse(searchTermsArray);
          }

          var recentSearches = $("#recent-searches");
          recentSearches.empty();
          for (var i = 0; i < searchTermsArray.length; i++) {
            recentSearches.append(
              "<div class='row'><button class='btn btn-info'>" +
                searchTermsArray[i] +
                "</button></div>"
            );
          }
        }

        // Click handler for the input search button.
        $("#new-query-button").on("click", function(event) {
          event.preventDefault();

          var searchTerm = $("#new-query").val();

          getJokeBySearchTerm(searchTerm);
          readAndDisplay(searchTerm);
        });

        // Click handler for the parent div, acting on dynamically created buttons.
        $("#recent-searches").on("click", ".btn-info", function() {
          var previousSearch = $(this).text();
          getJokeBySearchTerm(previousSearch);
        });

        // On page load, read from local storage and display.
        readAndDisplay();
      });