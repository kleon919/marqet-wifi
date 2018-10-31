
function loginSurvey(firebase) {

  firebase.auth().signInAnonymously().catch(function(error) {
    
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("Error with code: " + errorCode + " and message: " + errorMessage);
  
  });

  firebase.auth().onAuthStateChanged(function(user) {

    if (user) {

      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var answerObject;

      if(answerObject = getAnswers(firebase, user)){
                
        var answersRef = firebase.database().ref('answers');
        answersRef.push().set(answerObject);

        //window.location = "../index.html";
      }

    } else {
        console.log("User is signed out");
    }
    
  });
}
		
function getAnswers(firebase, user){

  var answer = {

    age:$('input[name=age]:checked', '#wholeForm').val(),
    transport:$('option[name=transport]:selected', '#transport-selector').val(),
   
    stars : {
      food : $('input[name=food-rate]:checked', '#food-selector').val(),
      support:$('input[name=support-rate]:checked', '#support-selector').val(),
      clean: $('input[name=clean-rate]:checked', '#clean-selector').val(),
      do: $('input[name=do-rate]:checked', '#do-selector').val(),
      cost: $('input[name=cost-rate]:checked', '#cost-selector').val()
    },

    media: $('option[name=media]:selected', '#multi').val(),
    message: $('textarea[name=msg]').val()

  };

  return answer;

}