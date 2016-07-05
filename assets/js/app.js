$(document).ready(function(){

    var config = {
    apiKey: "AIzaSyBCRayuQL3qhkpb9vraVTz2KWlul4QVsdY",
    authDomain: "group-project-redux.firebaseapp.com",
    databaseURL: "https://group-project-redux.firebaseio.com",
    storageBucket: "group-project-redux.appspot.com",
  };
    firebase.initializeApp(config);
    var db = firebase.database();
    var sentScore = [];



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

// this is for the gifs that populate to go here
 // $(.gifImage).hover(function () {
 // $(this).addClass('magictime puffIn');
// });

// the image that generates goes here. 
  setTimeout(function(){
    $('#phones').addClass('magictime puffIn');
}, 100);


  //$('#images').hover(function () {
  //$(this).addClass('magictime puffIn');
//});

// CHANGE THIS TO THE GRAPHS THAT LOAD IN THE PAGE INSTEAD OF THE DIV ITSELF //
// the image that generates goes here. 
 // setTimeout(function(){
   // $('.graphImage').addClass('magictime puffIn');
//}, 100);
  //$('#graph').hover(function () {
  //$(this).addClass('magictime swashIn');
//});

// a load feature I can't get to work //
 /*$('submit').click(function() {
    var addLoadfeature= $('<div>');
    addLoadfeature.addId('fountainG_1')
    addLoadfeature.addId('fountainG_2')
    addLoadfeature.addId('fountainG_3')
    addLoadfeature.addId('fountainG_4')
    addLoadfeature.addId('fountainG_5')
    addLoadfeature.addId('fountainG_6')
    addLoadfeature.addId('fountainG_7')
    addLoadfeature.addClass('fountainG');
  $('#fountainG').prepend(addLoadfeature);
  console.log('#fountainG');
    
});*/
 
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

