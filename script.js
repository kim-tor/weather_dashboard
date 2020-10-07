moment().format("L");

// click event for the search button

$("#select-city").on("click", function (event) {
    event.preventDefault();

    // get the input
    var cityName = $("#city-input").val().trim();

    //save the response
    var textContent = $(this).siblings("input").val();
    var storearr = [];
    storearr.push(textContent);
    localStorage.setItem("city", JSON.stringify(storearr));
    citySearch(cityName);
});

// function to retrieve data on page load
// i feel like this should be saving my searches but it is not working 
function pageload() {
    var lastSearch = JSON.parse(localStorage.getItem("city"));
    var searchDiv = $("<button>").text(lastSearch);
    var psearch = $("<div>");
    psearch.append(searchDiv);
    // console.log(psearch);
    $("#searchHistory").prepend(psearch);
}

function citySearch(city) {
    var currentQueryURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=499cde1e1f8370961787055f87ad783b";
    var fiveDayQueryURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=499cde1e1f8370961787055f87ad783b";

    //api call to obtain data for the current weather of city entered
    $.ajax({
        url: currentQueryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(currentQueryURL);
        // console.log(response);
        $("#current").empty();
        var date = moment().format("L");

        //create elements to hold data we want to retrieve
        var cityEl = $("<h2>").text(response.name);
        var displayDate = cityEl.append(" " + date);

        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        var tempEl = $("<p>").text("Temperature: " + tempF.toFixed(2));
        var humidityEl = $("<p>").text("Humidity: " + response.main.humidity);
        var windEl = $("<p>").text("Wind Speed: " + response.wind.speed);



        var newDiv = $("<div>");
        newDiv.append(displayDate, tempEl, humidityEl, windEl)
        $("#current").html(newDiv);


        //api call just to get uv index
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var uvURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=499cde1e1f8370961787055f87ad783b";

        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (response) {
            // console.log(response);
            $("#uv").empty();
            var uvResult = response.value;
            var uvEl = $("<p>").text("UV Index: " + uvResult);

            $("#uv").html(uvEl);

        });
    });

    //api call for 5 day forecase
    $.ajax({
        url: fiveDayQueryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(fiveDayQueryURL);
        // console.log(response);

        //variable to store an array of the results
        var results = response.list;

        $("#five-day").empty();

        // create a for loop to iterate through the 5 day responses, creating a div and individual variables for each element
        for (var i = 0; i < results.length; i += 8) {
            var fiveDiv = $("<div>");

            // variables to hold data
            var date = results[i].dt_txt;
            var shortDate = date.substr(0, 10);
            var temp = results[i].main.temp;
            var humidity = results[i].main.humidity;

            // console.log(shortDate);
            // console.log(temp);
            // console.log(humidity);

            // create elements for html
            var dateLabel = $("<h5>").text(shortDate);

            var tempLabel = $("<p>").text("Temperature: " + temp);
            var humidtyLabel = $("<p>").text("Humidity: " + humidity);


            fiveDiv.append(dateLabel);
            fiveDiv.append(tempLabel);
            fiveDiv.append(humidtyLabel);
            $("#five-day").append(fiveDiv);

        }
    });
}
pageload();
