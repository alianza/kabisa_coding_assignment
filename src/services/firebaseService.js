import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, remove, update } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

let firebaseConfig = {
    apiKey: "AIzaSyABvMNKLEoX1Z67xRgzFMQvQFIZ5wOkxy4",
    authDomain: "kabisa-coding-assignment-jw.firebaseapp.com",
    projectId: "kabisa-coding-assignment-jw",
    storageBucket: "kabisa-coding-assignment-jw.appspot.com",
    messagingSenderId: "543412482975",
    appId: "1:543412482975:web:d4464aa22a7bb1c93843aa",
    databaseURL: "https://kabisa-coding-assignment-jw-default-rtdb.europe-west1.firebasedatabase.app/",
    measurementId: "G-4L0QHDM97F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
getAnalytics(app);

export function getQuoteRatings(quote, user, setRating, setAverageRating, setNumberOfRatings) {
    const dbRefObject = ref(db,`quoteRatings/${quote.id}`)

    onValue(dbRefObject,snapshot => {
        let averageRating = 0
        let numberOfRatings = 0
        snapshot.forEach(rating => {
            averageRating += rating.val().rating
            numberOfRatings++;
            if (rating.key === user?.uid) { setRating({ rating: rating.val().rating, timestamp: rating.val()?.timestamp }) } // User rating
        })
        setAverageRating(averageRating / snapshot.size) // Average rating
        setNumberOfRatings(numberOfRatings) // Number of ratings
    })
}

export function getMyQuotes(user): Promise {
    const dbRefObject = ref(db, `userRatings/${user?.uid}`)

    return new Promise((resolve => {
        let numberOfQuotes
        const quoteRefList = []
        onValue(dbRefObject, snapshot => {
            numberOfQuotes = snapshot.size
            snapshot.forEach(quoteRating => {
                quoteRefList.push(quoteRating.val())
            })
            resolve({numberOfQuotes, quoteRefList});
        })
    }))
}

export function getNumberOrRatings(userId, setNumberOfRatings) {
    const dbRefObject = ref(db, `userRatings/${userId}`)

    onValue(dbRefObject, snapshot => {
        setNumberOfRatings(snapshot.size)
    })
}

export function addRating(newValue, quoteId, userId) {
    const quoteRatingRef = ref(db, `quoteRatings/${quoteId}`)
    const userRatingsRef = ref(db, `userRatings/${userId}`)

    const rating = {
        quoteId: quoteId,
        userId: userId,
        rating: newValue,
        timestamp: + new Date()
    }

    update(quoteRatingRef, { [userId]: {...rating} })
    update(userRatingsRef, { [quoteId]: {...rating} })
}

export function removeRating(quoteId, userId) {
    const quoteRatingRef = ref(db, `quoteRatings/${quoteId}/${userId}`)
    const userRatingsRef = ref(db, `userRatings/${userId}/${quoteId}`)

    remove(quoteRatingRef)
    remove(userRatingsRef)
}

export function logout(): Promise<Boolean> {
    return new Promise((resolve) => {
        auth.signOut().then(() => { resolve(true) })
    })
}
