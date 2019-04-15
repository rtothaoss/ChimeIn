$(function () {

  // Grab the articles as a json
  $.getJSON("/articles", function (data) {
    console.log(data)


    for (var i = 0; i < data.length; i++) {

    //   var cardHtml = `<div data-id=` + data[i]._id + `> 
    //   <div class="card text-center">
    //   <div class="card-header">
    //     Featured
    //   </div>
    //   <div class="card-body"> 
    //   <img src="` + data[i].image + `" alt="">
    //   <h5 class="card-title">` + data[i].title + `</h5>
    //   <p class="card-text">`+ data[i].summary + `</p>
    //   <a href="`+ data[i].link + `"class="btn btn-primary">Go somewhere</a>
    //   </div>
    //   <div class="card-footer text-muted">
    //     2 days ago
    //   </div>
    // </div>
    // </div>`

    var littleCards = `<div class='newCards' style='margin: 10px 10px;'>
    <div data-id=` + data[i]._id + `> 
    <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="`+ data[i].image + `" alt="Card image cap">
    <div class="card-body">
    <h5 class="card-title">` + data[i].title + `</h5>
      <p class="card-text">`+ data[i].summary + `</p>
      <div class='text-center'>
      <a href="`+ data[i].link + `" class="btn btn-primary">Checkout Article</a>
      </div>
    </div>
    <a href="`+ data[i].link + `"style='margin-bottom: 10px;' class="btn btn-primary">Notes</a>
    </div>
  </div>
  </div>
  </div>`

      $('#articles').append(littleCards)

    }
  });


  // Whenever someone clicks a p tag
  $(document).on("click", "p", function () {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function (data) {
        console.log(data);
        // The title of the article
        $("#notes").append("<h2>" + data.title + "</h2>");
        // An input to enter a new title
        $("#notes").append("<input id='titleinput' name='title' >");
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });

  // When you click the savenote button
  $(document).on("click", "#savenote", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function (data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });

  function bgChanger() {
    if(this.scrollY > this.innerHeight / 1.5) {
        document.body.classList.add('bg-active')
    } else {
        document.body.classList.remove('bg-active')
    }
}

window.addEventListener('scroll', bgChanger);

})