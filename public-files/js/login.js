
 var config = {
	apiKey: "AIzaSyCy_NWeSibzt198jOGY0C4tgXwYhjeL7iU",
	authDomain: "marqetwifi.firebaseapp.com",
	databaseURL: "https://marqetwifi.firebaseio.com",
	projectId: "marqetwifi",
	storageBucket: "marqetwifi.appspot.com",
	messagingSenderId: "1023959308608"
};

  firebase.initializeApp(config);
 
	function loginWithGoogle() {

		var provider = new firebase.auth.GoogleAuthProvider();	
						
		firebase.auth().signInWithPopup(provider).catch(function(error) {
			console.log("Error authenticating user:", error);
		});

	}

	function loginWithFacebook() {
		
		var provider = new firebase.auth.FacebookAuthProvider();	
						
		firebase.auth().signInWithPopup(provider).catch(function(error) {
			console.log("Error authenticating user:", error);
		});
		
	}

 
  firebase.auth().onAuthStateChanged(function(user) {
	  
	if (user) {
							
	// now is the time you can give access to WIFI network
	//init(user);
	
	}
	
  });