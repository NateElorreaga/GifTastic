$(document).ready(function(){ 
var searchTerm;

var animalArray = ["dog", "cat","frog","crocodile"];

function makeButton () {
$("#button-maker").empty();
for (var i=0; i<animalArray.length; i++){
    var newBtn = $("<button>");
    newBtn.attr("class","btn btn-info secondClassToFixProblem");
    // newBtn.attr("class", "new-button");
    newBtn.attr("data-tag", animalArray[i]);
    newBtn.text(animalArray[i])
    $("#button-maker").append(newBtn);
};
};
makeButton();

 $("#search-button").on("click", function(event) {
  event.preventDefault();
  var userInput = $("#user-input").val();
  animalArray.push(userInput);
  makeButton(userInput);
  $("#user-input").val("");
  
 });

 $("body").on("click", ".secondClassToFixProblem", function(){
  searchTerm= $(this).attr("data-tag");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q="+searchTerm +"&api_key=alCH7T5dr2ePgVVERX81lhTw9zn9JW9v&limit=10";
  $.ajax({
    url:queryURL,
    method: "GET"
  })
  .then(function(response){
    var results= response.data;
    for (var i = 0; i < results.length; i++) {
      var imageURL=results[i].images.fixed_height_still.url;
      var gifImage= $("<img>");
      gifImage.attr("src", imageURL);
      gifImage.attr("class", "gif");
      gifImage.attr("alt-image", results[i].images.fixed_height.url);
      $(".container").prepend(gifImage);
      
    };
      $(".gif").on("click", function(){
        console.log($(this))
        var dynamicGif = $(this).attr("alt-image");
        $(this).attr("src", dynamicGif);
      });
    });
  });
});
