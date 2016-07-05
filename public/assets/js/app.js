
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

setTimeout(function(){
  $('#gifDisplay #graphDiv').addClass('magictime puffIn');
}, 100);

  /*.ajax({
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

/*$.ajax({
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
});*/

function pushUserTofireBase() {
    
    var user = {
    name: $('#inputName').val(),
    text: $('#textArea').val(),
  }
  db.ref().push({
    userInfo: user,
  })
}
function makeChart(arr) {

  var data = {
        labels: ["1", "2", "3", "4", "5", "6", "7"],
        datasets: [
            {
                label: "Message Plot",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: arr,
            }
        ]
    };
    var ctx = $("#myChart");
    var myLineChart = new Chart(ctx, {
      type: 'line',
        data: data,
        options: {
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Sentiment'
              } 
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Message Number'
              } 
            }]
          }
        }
    });
}
function flipToNegative(arr){
  if(arr.sentiment === "negative"){
    sent = arr.confidence *= -1;
    sentScore.push(sent);
  } else {
    sentScore.push(arr.confidence);
  }
  console.log(sentScore);

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
    $("#testP").text("sentiment of text: " + data.sentiment),
    flipToNegative(data);
    console.log(data),
    console.log(sentScore)

    makeChart(sentScore)
 },

    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Key", "oLjs2Jn5P5mshFPhcnNjVDuwES30p1p0ZXujsnLNxRCXS6YdCO");
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Enter here your Mashape key
    }
  });
  }
function printEmotions(arr){ 
  $("#emotionPrint").empty();
  for (var i=0; i<arr.emotions.length; i++) {
      $("#emotionPrint").append($('<p class="emotionP">').text(arr.emotions[i]).attr('value', arr.emotions[i]));
  }

}
function printEmotions2(arr){ 
  $("#emotionPrint2").empty();
  for (var i=0; i<arr.emotions.length; i++) {
      $("#emotionPrint2").append($('<p class="emotionP">').text(arr.emotions[i]).attr('value', arr.emotions[i]));
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
    printEmotions2(emotion[1]),
    getGif(emotion[0]),
    getGif2(emotion[1])
  },
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

 db.ref().limitToLast(5).on("child_added", function(childSnapshot){
    var snap = childSnapshot.val().userInfo;
    console.log(snap.text);
    getsent(snap);
    getEmotions(snap);
    
  });


function getGif(arr) {
  $('#gifs1').empty();
  for (var i=0; i<arr.emotions.length; i++) {
      var word = arr.emotions[i];
      console.log(word);
      var queryURL = "http://api.giphy.com/v1/stickers/translate?s=" + word + "&api_key=dc6zaTOxFJmzC";
    $.ajax({url: queryURL, method: 'GET', async: false})

     .done(function(response) {
         console.log(response);

          var div = $('<div class ="gifdiv">');
          div.append($('<img class="gifs">').attr('src',response.data.images.original.url));
          div.append(($('<p>').html(word)));
         $('#gifs1').append(div);
    }); 
    
} 
}
     
function getGif2(arr) {
  $('#gifs2').empty();
  for (var i=0; i<arr.emotions.length; i++) {
      var word = arr.emotions[i];
      console.log(word);
      var queryURL = "http://api.giphy.com/v1/stickers/translate?s=" + word + "&api_key=dc6zaTOxFJmzC";
    $.ajax({url: queryURL, method: 'GET', async: false})
     .done(function(response) {
         console.log(response);
       var div = $('<div class ="gifdiv">');
      div.append($('<img class="gifs">').attr('src',response.data.images.original.url));
      div.append(($('<p>').html(word)));
      $('#gifs2').append(div);
    }); 
} 
  
  } 
$(document).on('ready', function(){
  
  $("#emotionPrint").empty();

})
$('#reset').on('click', function() {
  db.remove();


})