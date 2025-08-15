import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

async function initializeFirebase() {
	const response = await fetch('/firebase-config');
	const firebaseConfig = await response.json();

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);
	auth.languageCode = 'en';
	const provider = new GoogleAuthProvider();

	// Register:
	const formRegister = document.getElementById('form-register');
	if (formRegister) {
		formRegister.addEventListener("submit", function (event) {
			const emailRegister = document.getElementById('email-register').value;
			const passwordRegister = document.getElementById('password-register').value;

			event.preventDefault();
			createUserWithEmailAndPassword(auth, emailRegister, passwordRegister)
				.then((userCredential) => {
					const user = userCredential.user;
					alert("Success: New User = " + user.email);
					window.location.href = "soundboard.html";
				})
				.catch((error) => {
					alert(error.message);
				});
		});
	}

	// Login:
	const formLogin = document.getElementById('form-login');
	if (formLogin) {
		formLogin.addEventListener("submit", function (event) {
			const emailLogin = document.getElementById('email-login').value;
			const passwordLogin = document.getElementById('password-login').value;

			event.preventDefault();
			signInWithEmailAndPassword(auth, emailLogin, passwordLogin)
				.then((userCredential) => {
					const user = userCredential.user;
					alert("Success: Login = " + user.email);
					window.location.href = "soundboard.html";
				})
				.catch((error) => {
					alert(error.message);
				});
		});
	}

	// Auth State
	onAuthStateChanged(auth, (user) => {
		if (user) {
			displayProfile(user);
		} else {
			const userEmailElement = document.getElementById("user-email");
			const signOutButton = document.getElementById("sign-out");
			if (userEmailElement) userEmailElement.style.display = 'none';
			if (signOutButton) signOutButton.style.display = 'none';
		}
	});

	function displayProfile(user) {
		const userEmail = user.email;
		const userEmailElement = document.getElementById("user-email");
		if (userEmailElement) userEmailElement.textContent = userEmail;
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

	// Google:
	const googleLogin = document.getElementById('google-login');
	if (googleLogin) {
		googleLogin.addEventListener("click", function (event) {
			signInWithPopup(auth, provider)
				.then((result) => {
					const user = result.user;
					alert("Success: Login = " + user.email);
					window.location.href = "soundboard.html";
				}).catch((error) => {
					alert(error.message);
				});
		});
	}
}

initializeFirebase();