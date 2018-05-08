$(document).ready(function () {


    var topics = ["Motorcycles", "Dirtbikes", "Cars", "Trials Motorcycles", "Motorcross", "F1", "Rally", "Downhill Bikes", "Tricycles", "Bicycle"];
    

    for(var i =0; i < topics.length; i++){
        var button = $("<button>");
        var buttonText = $("<p>"+topics[i]+"</p>");
        
        $("#buttons").append(button);
        button.append(buttonText);
        button.attr("data-button", topics[i]);
        button.addClass("singleButton");

    };
    
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
                        topicImage.attr("data-still", results[i].images.fixed_height_still.url);
                        topicImage.attr("data-animate", results[i].images.fixed_height.url);
                        topicImage.attr("data-state","still");
                        topicImage.attr("class", "gif");

                                                

                        gifDiv.prepend(p);
                        gifDiv.prepend(topicImage);

                    $("#gifs-container").prepend(gifDiv);

                   


        };
                    $(".gif").on("click", function () {
                        var state = $(this).attr("data-state");

                        if (state === "still") {

                            var animatedURL = $(this).attr("data-animate");
                            $(this).attr("src", animatedURL).attr("data-state", "animate");

                        } else if (state === "animate") {

                            var stillURL = $(this).attr("data-still");
                            $(this).attr("src", stillURL).attr("data-state", "still");
                        }
                    });
    });
});

});    