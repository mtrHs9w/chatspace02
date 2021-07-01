$(function(){
  function buildHTML(message) {
    if ( message.image ){
      let html =
        `<div class = "chat-main__message-list" data-message-id=${message.id}>
          <div class = "chat-main__message-list--name-day" >
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
          </div>
          <img src= ${message.image} >
        </div>`
      return html;
    } else {
      let html =
        `<div class = "chat-main__message-list" data-message-id=${message.id}>
          <div class = "chat-main__message-list--name-day" >
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
          </div>
        </div>`
      return html;
    };
  }
  $("#new_message").on("submit", function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action')

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({scrollTop: $('.chat-main__message-list')[0].scrollHeight}, 'fast');
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
    return false;
  });
  let reloadMessages = function() {
    let last_message_id = $('.chat-main__message-list:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 30000);
  }
});


