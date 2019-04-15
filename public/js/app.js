$(function () {

  // Grab the articles as a json
  $.getJSON("/articles", function (data) {
    
    for (var i = 0; i < data.length; i++) {

    var littleCards = `<div class='newCards' data-id=` + data[i]._id + ` style='margin: 10px 10px;'>
    <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="`+ data[i].image + `" alt="Card image cap">
    <div class="card-body">
    <h5 class="card-title">` + data[i].title + `</h5>
      <p class="card-text">`+ data[i].summary + `</p>
      <div class='text-center'>
      <a href="`+ data[i].link + `" class="btn">Checkout Article</a>
      </div>
    </div>
    <button style='border-style: none;background-color: white; margin-bottom: 10px; color: dodgerblue' data-id=` + data[i]._id + ` id='cardNotes' class="btn btn-primary">Notes</button>
    </div>
  </div>
  </div>
  </div>`

      $('#articles').append(littleCards)

    }
  });



  $(document).on('click','#cardNotes', function() {

   
    var noteID = $(this).attr('data-id')
    console.log(noteID)
    $('#myModal').modal('toggle')
    $('#notesText').val('');

 
    $.ajax({
      method: "GET",
      url: "/articles/" + noteID
    })
      .then(function (data) {
        $('#saveChanges').attr('data-id', noteID)
        console.log(data)
        if (data.note) {

          $("#notesText").val(data.note.body);
        }
      });

     
  })

  $(document).on('click','#saveChanges', function() {
    var noteID = $(this).attr('data-id')

    $.ajax({
      method: "POST",
      url: "/articles/" + noteID,
      data: {
       
        body: $("#notesText").val()
      }
    })
     
  .then(function (data) {
   
    console.log(data);

   
    
    $('#myModal').modal('toggle')
  })
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