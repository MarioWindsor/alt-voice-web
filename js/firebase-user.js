import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Your Web App's Firebase config
const firebaseConfig = {
	apiKey: "AIzaSyDJrImD5M29U1JsOM9-632yyvmOE43U6QQ",
	authDomain: "alt-voice-9f2d7.firebaseapp.com",
	projectId: "alt-voice-9f2d7",
	storageBucket: "alt-voice-9f2d7.firebasestorage.app",
	messagingSenderId: "12255343510",
	appId: "1:12255343510:web:46094c8010086a4a8823b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const user = auth.currentUser;



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
		window.location.href = "/"
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

