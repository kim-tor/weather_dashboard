moment().format("L");

// click event for the search button

$("#select-city").on("click", function (event) {
    event.preventDefault();

    // get the input
    var cityName = $("#city-input").val().trim();

    //save the response
    var textContent = $(this).siblings("input").val();
    var storearr = [];
    localStorage.setItem("city", JSON.stringify(storearr));
    citySearch(cityName);
    // pageLoad();

});

// function to retrieve data on page load

function pageload() {
    var lastSearch = JSON.parse(localStorage.getItem("city"));
    var searchDiv = $("<button>").text(lastSearch);
    var psearch = $("<div>");
    psearch.append(searchDiv);
    $("searchHistory").prepend(psearch);
}


function citySearch(city) {
    var currentQueryURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=499cde1e1f8370961787055f87ad783b";
    var fiveDayQueryURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=499cde1e1f8370961787055f87ad783b";

    //api call to obtain data for the current weather of city entered
    $.ajax({
        url: currentQueryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(currentQueryURL);
            console.log(response);
            $("#current").empty();
            var date = moment().format("L");

            //create elements to hold data we want to retrieve
            var cityEl = $("<h2>").text(response.name);
            var displayDate = cityEl.append(" " + date);
            var tempEl = $("<p>").text("Temperature: " + response.main.temp);
            var humidityEl = $("<p>").text("Humidity: " + response.main.humidity);
            var windEl = $("<p>").text("Wind Speed: " + response.wind.speed);
            // var currentWeather = response.weather[0].main;

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
                $(".uv").empty();
                var uvResult = response.value;
                var uvEl = $("<button>").text("UV Index: " + uvResult);

                $(".uv").html(uvEl);

            });
        });

    //api call for 5 day forecase
    $.ajax({
        url: fiveDayQueryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(fiveDayQueryURL);
            console.log(response);

        })
};