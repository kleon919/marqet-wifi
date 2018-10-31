var database = firebase.database();
var answersRef = database.ref("answers");

answersRef.on("child_added", function(snapshot) {

  var wholeObject = snapshot.val();

  console.log(wholeObject);
 
  for (var child in wholeObject) {
    if (wholeObject.hasOwnProperty(child)) {
      
      if(child !== "stars" && child !== "message"){

        //console.log("child " + child + " wholeObject[child] "+ wholeObject[child]);
        storeData(database, child, wholeObject[child]);

        if(wholeObject[child] !== "not"){
          updateTotal(database, child);
        }

      } else if (child === "stars"){

          var starsObject = wholeObject[child];
          //console.log(JSON.stringify(starsObject));

          for(var childOfStar in starsObject){
            if (starsObject.hasOwnProperty(childOfStar)) { 

              //console.log("childOfStar " + childOfStar + " starsObject[childOfStar] "+ starsObject[childOfStar]);
              storeDataStars(database, childOfStar, starsObject[childOfStar]);

              updateTotal(database, child);

            }
          }

      } else {

          //console.log("Message: " + wholeObject[child]);
          if (wholeObject[child] !== ""){
            pushMessage(database, child, wholeObject[child])
          }

      }
    }
  }

  snapshot.ref.remove();

});

// Functions

function storeData(database, child, value){

  //console.log("child " + child + " value "+ value);

  var sampleRef= database.ref("questions/question-" + child + "/" + value + "/quantity");

  sampleRef.once('value', function(snapshot) {
    var count = snapshot.val();
    sampleRef.set(++count);
  });
}

function storeDataStars(database, child, value){

  //console.log("child " + child + " value "+ value);

  var sampleRef= database.ref("questions/question-stars/" + child + "/totalSum");

  sampleRef.once('value', function(snapshot) {
    var count = snapshot.val();
    sampleRef.set(parseInt(count) + parseInt(value));
  });
}

function updateTotal(database, child){

  //console.log("child " + child);

  var sampleRef= database.ref("questions/question-" + child + "/total");

  sampleRef.once('value', function(snapshot) {
    var count = snapshot.val();
    sampleRef.set(++count);
  });
}

function pushMessage(database, child, value){

  //console.log("child " + child + " value "+ value);

  var sampleRef= database.ref("questions/question-" + child);

  sampleRef.push().set({
      message: value
  });
}