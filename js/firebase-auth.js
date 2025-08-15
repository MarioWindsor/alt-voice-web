import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Your Web App's Firebase config
const firebaseConfig = {
	apiKey: apiKey,
	authDomain: authDomain,
	projectId: projectId,
	storageBucket: storageBucket,
	messagingSenderId: messagingSenderId,
	appId: appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();
const user = auth.currentUser;

// Register:
// Form Submit
const formRegister = document.getElementById('form-register');

formRegister.addEventListener("submit", function(event) {
	// Input 
	const emailRegister = document.getElementById('email-register').value;
	const passwordRegister = document.getElementById('password-register').value;

	event.preventDefault();
	createUserWithEmailAndPassword(auth, emailRegister, passwordRegister)
		.then((userCredential) => {
			// Signed up 
			const user = userCredential.user;
			// ..
			alert("Success: New User = " + user.email);
			window.location.href = "soundboard.html"
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// ..
			alert(errorMessage);
		});
});



// Login:
// Form Submit
const formLogin = document.getElementById('form-login');

formLogin.addEventListener("submit", function(event) {
	// Input 
	const emailLogin = document.getElementById('email-login').value;
	const passwordLogin = document.getElementById('password-login').value;

	event.preventDefault();
	signInWithEmailAndPassword(auth, emailLogin, passwordLogin)
		.then((userCredential) => {
			// Logged in
			const user = userCredential.user;
			// ..
			alert("Success: Login = " + user.email);
			window.location.href = "soundboard.html"
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// ..
			alert(errorMessage);
		});
});


// Auth State
onAuthStateChanged(auth, (user) => {
	if (user) {
		// User is signed in, see docs for a list of available properties
		// https://firebase.google.com/docs/reference/js/auth.user
		const uid = user.uid;
		// ...
		displayProfile(user);
	} else {
		// User is signed out
		document.getElementById("user-email").style.display = 'none';
		document.getElementById("sign-out").style.display = 'none';
	}
});

function displayProfile(user) {
	// const userName = user.displayName;
	const userEmail = user.email;

	document.getElementById("user-email").textContent = userEmail;
}


// Sign Out
const handleSignOut = async () => {
	try {
		await signOut(auth);
		console.log("Sign out successful.");
	} catch (error) {
		console.error("Error signing out:", error);
	}
};

document.getElementById("sign-out").addEventListener("click", handleSignOut);


// Google:
const googleLogin = document.getElementById('google-login');

googleLogin.addEventListener("click", function(event) {
	signInWithPopup(auth, provider)
		.then((result) => {
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			const user = result.user;
			// ...
			alert("Success: Login = " + user.email);
			window.location.href = "soundboard.html"
		}).catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			const email = error.customData.email;
			const credential = GoogleAuthProvider.credentialFromError(error);
			// ...
			alert(errorMessage);
		});
});
