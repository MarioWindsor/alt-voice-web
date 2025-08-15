import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

async function initializeFirebase() {
	const response = await fetch('/firebase-config');
	const firebaseConfig = await response.json();

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);

	// Auth State
	onAuthStateChanged(auth, (user) => {
		if (user) {
			displayProfile(user);
		} else {
			window.location.href = "/";
		}
	});

	function displayProfile(user) {
		const userEmail = user.email;
		const userEmailElement = document.getElementById("user-email");
		if (userEmailElement) {
			userEmailElement.textContent = userEmail;
		}
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

	const signOutButton = document.getElementById("sign-out");
	if (signOutButton) {
		signOutButton.addEventListener("click", handleSignOut);
	}
}

initializeFirebase();