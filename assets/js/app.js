$(document).ready(function(){

  
  var config = {
    apiKey: "AIzaSyDqMFDq_ks9w-7WoZT38l2ujKZyfwvMwL4",
    authDomain: "group-project-1-4da50.firebaseapp.com",
    databaseURL: "https://group-project-1-4da50.firebaseio.com",
    storageBucket: "group-project-1-4da50.appspot.com",
  };
  firebase.initializeApp(config);


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
