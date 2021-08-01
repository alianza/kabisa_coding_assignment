import firebase from "firebase/app";
import "firebase/app";

const FirebaseService = {
    getQuoteRatings(quote, user, setRating, setAverageRating, setNumberOfRatings) {
        const dbRefObject = firebase.database().ref('quoteRatings').child(quote.id);

        dbRefObject.on('value', snapshot => {
            let averageRating = 0
            let numberOfRatings = 0
            snapshot.forEach(rating => {
                averageRating += rating.val().rating
                numberOfRatings++;
                if (rating.key === user?.uid) { setRating({ rating: rating.val().rating, timestamp: rating.val()?.timestamp }) } // User rating
            })
            setAverageRating(averageRating / snapshot.numChildren()) // Average rating
            setNumberOfRatings(numberOfRatings) // Number of ratings
        })
    },

    getMyQuotes(user, setNumberOfQuotes, setQuoteRefList) {
        const dbRefObject = firebase.database().ref(`userRatings/${user?.uid}`)

        dbRefObject.on('value', snapshot => {
            setNumberOfQuotes(snapshot.numChildren())
            snapshot.forEach(quoteRating => {
                setQuoteRefList(prevQuoteRefs => [...prevQuoteRefs, quoteRating.val()])
            })
        })
    },

    getNumberOrRatings(userId, setNumberOfRatings) {
        const dbRefObject = firebase.database().ref(`userRatings/${userId}`)

        dbRefObject.on('value', snapshot => {
            setNumberOfRatings(snapshot.numChildren())
        })
    },

    addRating(newValue, quoteId, userId) {
        const quoteRatingRef = firebase.database().ref('quoteRatings').child(quoteId)
        const userRatingsRef = firebase.database().ref('userRatings').child(userId)

        const rating = {
            quoteId: quoteId,
            userId: userId,
            rating: newValue,
            timestamp: + new Date()
        }

        quoteRatingRef.update({ [userId]: {...rating} })
        userRatingsRef.update({ [quoteId]: {...rating} })
    },

    removeRating(quoteId, userId) {
        const quoteRatingRef = firebase.database().ref('quoteRatings').child(quoteId).child(userId)
        const userRatingsRef = firebase.database().ref('userRatings').child(userId).child(quoteId)

        quoteRatingRef.remove()
        userRatingsRef.remove()
    },
    logout(): Promise<Boolean> {
        return new Promise((resolve) => {
            firebase.auth().signOut().then(() => { resolve(true) })
        })
    }
}

export default FirebaseService;
