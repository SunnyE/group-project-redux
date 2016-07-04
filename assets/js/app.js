
  var config = {
    apiKey: "AIzaSyDqMFDq_ks9w-7WoZT38l2ujKZyfwvMwL4",
    authDomain: "group-project-1-4da50.firebaseapp.com",
    databaseURL: "https://group-project-1-4da50.firebaseio.com",
    storageBucket: "group-project-1-4da50.appspot.com",
  };
  firebase.initializeApp(config);

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

console.log("this is working");