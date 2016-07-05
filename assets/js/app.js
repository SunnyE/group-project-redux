
    var config = {
    apiKey: "AIzaSyBCRayuQL3qhkpb9vraVTz2KWlul4QVsdY",
    authDomain: "group-project-redux.firebaseapp.com",
    databaseURL: "https://group-project-redux.firebaseio.com",
    storageBucket: "group-project-redux.appspot.com",
  };
    firebase.initializeApp(config);
    var db = firebase.database();
    var sentScore = [];


  $('.gif').hover(function () {
  $(this).addClass('magictime twisterInup');
});

  $('#images').hover(function () {
  $(this).addClass('magictime puffIn');
});

  $.ajax({
    url: 'https://shl-mp.p.mashape.com/webresources/jammin/emotionV2', // The URL to the API. You can get this in the API page of the API you intend to consume
    type: 'POST', // The HTTP Method, can be GET POST PUT DELETE etc
    dataType: 'json',
    data: {
      "lang": "en",
      "text": "I love my life"
    }, // Additional parameters here
    success: function(data) {
    console.log(data) },
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Key", "oLjs2Jn5P5mshFPhcnNjVDuwES30p1p0ZXujsnLNxRCXS6YdCO");
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Enter here your Mashape key
    }
});

$.ajax({
    url: "https://textanalysis-text-sentiment-v1.p.mashape.com/twitter-sentiment", // The URL to the API. You can get this in the API page of the API you intend to consume
    type: 'POST', // The HTTP Method, can be GET POST PUT DELETE etc
    dataType: 'json',
    data: {
      "lang": "en",
      "text": "I love my life"
    }, // Additional parameters here
    success: function(data) {
    console.log(data) },
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Key", "oLjs2Jn5P5mshFPhcnNjVDuwES30p1p0ZXujsnLNxRCXS6YdCO");
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Enter here your Mashape key
    }
});

function pushUserTofireBase() {
    
    var user = {
    name: $('#inputName').val(),
    text: $('#textArea').val(),
  }
  db.ref().push({
    userInfo: user,
  })
}
function getsent(arr) {
    $.ajax({
    url: "https://textanalysis-text-sentiment-v1.p.mashape.com/twitter-sentiment", // The URL to the API. You can get this in the API page of the API you intend to consume
    type: 'POST', // The HTTP Method, can be GET POST PUT DELETE etc
    dataType: 'json',
    data: {
      "lang": "en",
      "text": arr.text
    }, // Additional parameters here
    success: function(data) {
    $("#testP").text(data.sentiment),
    sentScore.push(data.confidence),
    console.log(data) },

    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Key", "oLjs2Jn5P5mshFPhcnNjVDuwES30p1p0ZXujsnLNxRCXS6YdCO");
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Enter here your Mashape key
    }
  });
  }
function printEmotions(arr){ 
  for (var i=0; i<arr.emotions.length; i++) {
      $("#emotionPrint").append($('<p class="emotionP">').text(arr.emotions[i]));
  }

}
function getEmotions(arr){
  $.ajax({
    url: 'https://shl-mp.p.mashape.com/webresources/jammin/emotionV2', // The URL to the API. You can get this in the API page of the API you intend to consume
    type: 'POST', // The HTTP Method, can be GET POST PUT DELETE etc
    dataType: 'json',
    data: {
      "lang": "en",
      "text": arr.text,
    }, // Additional parameters here
    success: function(data) {
    emotion = data.groups,
    console.log(emotion),
    console.log(data),
    printEmotions(emotion[0]),
    printEmotions(emotion[1])},
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Key", "oLjs2Jn5P5mshFPhcnNjVDuwES30p1p0ZXujsnLNxRCXS6YdCO");
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Enter here your Mashape key
    }
});
}

$('#submitbtn').on('click', function(){ 
  pushUserTofireBase();

})

 db.ref().on("child_added", function(childSnapshot){
    var snap = childSnapshot.val().userInfo;
    console.log(snap.text);
    getsent(snap);
    getEmotions(snap);
    
  });


