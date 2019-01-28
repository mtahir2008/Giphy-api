$(document).ready(function () {
    var gifName = ["Adam Sandler", "Lion", "Rain", "Monkey", "Kevin Hart", "Football", "Basketball", "Sports", "Animals",];

    function displayGifButtons() {
        $("#button-view").empty();
        for (var i = 0; i < gifName.length; i++) {
            var newButton = $("<button>");
            newButton.addClass("worldGif");
            newButton.addClass("btn btn-primary")
            newButton.attr("data-name", gifName[i]);
            newButton.text(gifName[i]);
            $("#button-view").append(newButton);
        }
    }

    function addNewButton() {
        $("#addGif").on("click", function () {
            var newGif = $("#gif-input").val().trim();
            if (newGif == "") {
                return false;
            }
            gifName.push(newGif);

            displayGifButtons();
            return false;
        });
    }
    function removeLastButton() {
        $("removeGif").on("click", function () {
            gifName.pop(newGif);
            displayGifButtons();
            return false;
        });
    }

    function displayGifs() {
        var displayGif = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + displayGif + "&api_key=mporHfLn20YpKDHUUVyUz9ur4zYHZYYs&limit=10";
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function (response) {
            console.log(response);

           
            var results = response.data;
            if (results == "") {
                alert("There isn't a gif for this selected button");
            }
            for (var i = 0; i < results.length; i++) {

                var gifDiv = $("<div>");
                gifDiv.addClass("gifDiv");

                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);

                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                gifImage.attr("data-state", "still");
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                $("#viewGifHere").prepend(gifDiv);
            }
        });
    }
    displayGifButtons();
    addNewButton();
    removeLastButton();

    $(document).on("click", ".worldGif", displayGifs);
    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});

