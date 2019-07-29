var topics = ["Inception", "Titanic","Stars Wars", "Forrest Gump"]
var gif = []
var freezeFrame = []
var movingGif = []


function checkMovies() {
  
  gif = $("#input-text").val().trim();
  console.log(topics.indexOf(gif))
  if (topics.indexOf(gif) == -1) {
    topics.push(gif)
  }
  else if (topics.indexOf(gif) !== -1) {
    topics = topics
  }
}
function displayGifInfo() {
  
  
  $('#displayGifs').empty()
 
    var nameGif = $(this).attr("data-name")
    link = "https://api.giphy.com/v1/gifs/search?api_key=sFPiiELnIvW7Jo0uhoeJKQSZGFddUCGZ&q=" + nameGif + "&limit=10&offset=0&lang=en"
    
    $.ajax({
  method: "GET",
  url: link
}).then(function(response) {
    console.log(response)
    for (i=0; i<response.data.length; i++) {
        freezeFrame = response.data[i].images.fixed_height_still.url
        movingGif = response.data[i].images.fixed_height.url
   var image = $('<img>').attr("src",response.data[i].images.fixed_height_still.url)
   image.attr("state", "still")
   image.attr("state-still", freezeFrame)
   image.attr("state-moving", movingGif)
    var imageMoving = $('<img>').attr("src",response.data[i].images.fixed_height.url)
    $('img').addClass("gif-img")
    var gifDiv = $('<div>')
    var gifRate = $('<p>').text("Rating: " + response.data[i].rating)
    gifRate.addClass('gifRate')
    gifDiv.append(image)
    gifDiv.append(gifRate)
    $('#displayGifs').append(gifDiv)
    
 
    
    }
    $('img').on("click", function(){
      if ($(this).attr("state") == "animate") {
        $(this).attr("src", $(this).attr("state-still"))
        $(this).attr("state", "still") 
  
      }
  
      else if ($(this).attr("state") == "still") {
        $(this).attr("src", $(this).attr("state-moving"))
        $(this).attr("state", "animate") 
      
      
      }
      
    })
});

}

// function adds click event to button to dynamically add buttons 
$("#add-gif").on("click", function(event) {
  
    event.preventDefault();

    // function that checks if country is already in array
    checkMovies()

    // Calling renderButtons which handles the processing of our movie array
    supplyButtons();

  });

function supplyButtons() {
  
  $("#displayButtons").empty();
    
for (i=0; i<topics.length; i++) {
    var button = $('<button>').text(topics[i])
    button.addClass("btn-style btn btn-secondary")
    button.attr("data-name",topics[i])
    $('#displayButtons').append(button)
    
}
}

$(document).on("click", ".btn-style", displayGifInfo);



      // Calling the renderButtons function to display the intial buttons
      supplyButtons();
      


      // $('#add-gif').on("click",function(){
      //   $("#gif-form")[0].reset()
      // })
  
      
      