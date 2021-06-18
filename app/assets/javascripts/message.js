$(function(){

  function buildHTML(message) {
    if ( message.image ){
      var html =
        `<div class = "chat-main__message-list--name-day" >
          <div class = "chat-main__message-list--name-day--name" >
            ${message.user_name}
          </div>
          <div class = "chat-main__message-list--name-day--day" >
            ${message.created_at}
          </div>
        </div>
        <div class= "chat-main__message-list--comment" >
          <p class= "chat-main__message-list--comment--content" >
            ${message.content}
          </p>
        <img src= ${message.image} >
        </div>`
    } else {
      var html =
        `<div class = "chat-main__message-list--name-day" >
          <div class = "chat-main__message-list--name-day--name" >
            ${message.user_name}
          </div>
          <div class = "chat-main__message-list--name-day--day" >
            ${message.created_at}
          </div>
        </div>
        <div class= "chat-main__message-list--comment" >
          <p class= "chat-main__message-list--comment--content" >
            ${message.content}
          </p>
        </div>`
      }
    $('.chat-main__message-list').append(html);
  }

  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({scrollTop: $('.chat-main__message-list')[0].scrollHeight}, 'fast');
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    return false;
  })
})


