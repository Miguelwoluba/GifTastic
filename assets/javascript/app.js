$(document).ready(function () {


    var topics = ["motorcycles", "dirtbikes", "cars", "trials motorcycles", "motorcross", "f1", "rally", "downhill bikes", "tricycles", "bicycle"];
    
    for(var i =0; i < topics.length; i++){
        var button = $("<button>");
        var buttonText = $("<p>"+topics[i]+"</p>");
        
        $("#buttons").append(button);
        button.append(buttonText);
        button.attr("data-button", topics[i]);
        button.addClass("singleButton");

    }
    
    $(".singleButton").on("click", function () {
        
        var topicsGifs = $(this).attr("data-button");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topicsGifs + "&api_key=qtLhTGYOvWfD24dxX5x988LKgcJz8nOy&limit=10";

            $.ajax({
        url: queryURL,
    method: "GET"
})
                .then(function (response) {
                var results = response.data;
                console.log(response);
                    $("#gifs-container").empty();
                    for (var i = 0; i < results.length; i++) {
                        var gifDiv = $("<div class='item'>");

                        var rating = results[i].rating;

                        var p = $("<p>").text("Rating: " + rating);

                        var topicImage = $("<img>");
                        topicImage.attr("src", results[i].images.fixed_height.url);

                        gifDiv.prepend(p);
                        gifDiv.prepend(topicImage);

            $("#gifs-container").prepend(gifDiv);
        }
    });
});

});    