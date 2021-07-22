import firebase from "firebase";

export function isAuthenticated(): boolean {
    return firebase.auth().onAuthStateChanged(user => {
        return !!user;
    });
}

export function isLoggedIn(): boolean {
    return firebase.auth().currentUser !== null;
}
