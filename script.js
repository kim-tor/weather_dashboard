var currentQueryURL = "api.openweathermap.org/data/2.5/weather?q="+city+"&appid={499cde1e1f8370961787055f87ad783b}";
var fiveDayQueryURL = "api.openweathermap.org/data/2.5/forecast?q="+city+"&appid={499cde1e1f8370961787055f87ad783b}";

$.ajax({
    url: currentQueryURL,
    method: "GET"
})
.then(function(response){
    console.log(currentQueryURL);
    console.log(response);

    $("city").html("<h1>" + response.name );

});

// create a on click event for search button, on click should generate a new list
// item to be added to the "ul list-city class"

// that gives us the variable city that is input into our URLs
//create an ajax function for the five day URL and complete the 
// current then function
