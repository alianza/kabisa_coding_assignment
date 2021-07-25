import firebase from "firebase/app";
import "firebase/app";

const FirebaseService = {
    getQuoteRatings(quote, user, setValue, setAverageRating, setNumberOfRatings) {
        const dbRefObject = firebase.database().ref('quoteRatings').child(quote.id);

        dbRefObject.on('value', snapshot => {
            let averageRating = 0
            let numberOfRatings = 0
            snapshot.forEach(rating => {
                averageRating += rating.val().rating
                numberOfRatings++;
                if (rating.key === user?.uid) {
                    setValue(rating.val().rating)
                }
            })
            setAverageRating(averageRating / snapshot.numChildren())
            setNumberOfRatings(numberOfRatings)
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

    addRating(newValue, quoteId, userId) {
        const quoteRatingRef = firebase.database().ref('quoteRatings').child(quoteId)
        const userRatingsRef = firebase.database().ref('userRatings').child(userId)

        const rating = {
            quoteId: quoteId,
            userId: userId,
            rating: newValue
        }

        quoteRatingRef.update({ [userId]: {...rating} })
        userRatingsRef.update({ [quoteId]: {...rating} })
    },
}

export default FirebaseService;
