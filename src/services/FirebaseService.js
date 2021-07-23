import firebase from "firebase";

const FirebaseService = {
    // getNumberOfRatings(userId): number {
    //     const dbRefObject = firebase.database().ref(`userRatings/${userId}`)
    //
    //     dbRefObject.once('value', snapshot => {
    //         return snapshot.numChildren()
    //     }).then(r => {
    //         console.log(r.numChildren());
    //     return r.numChildren()})
    // },
    //
    // async getQuoteRating(quoteId, userId): number {
    //     let ownRating = 0;
    //
    //     const dbRefObject = firebase.database().ref('quoteRatings').child(quoteId).orderByChild('userId').equalTo(userId);
    //
    //     dbRefObject.on('value', snapshot => {
    //         console.log(snapshot.val());
    //         snapshot.forEach(rating => {
    //         return ownRating = rating.val().rating
    //         })
    //
    //         return ownRating;
    //     })
    // },

    // getQuoteRatings(quoteId, userId?): { ownRating: number, averageRating: number, numberOfRatings: number } {
    //     let ownRating = 0;
    //     let averageRating = 0;
    //     let numberOfRatings = 0;
    //
    //     const dbRefObject = firebase.database().ref('quoteRatings').child(quoteId);
    //
    //     dbRefObject.once('value', snapshot => {
    //         snapshot.forEach(rating => {
    //             averageRating += rating.val().rating
    //             numberOfRatings++;
    //             if (rating.key === userId) {
    //                 ownRating = rating.val().rating
    //             }
    //         })
    //         averageRating = averageRating / snapshot.numChildren()
    //
    //         return {ownRating, averageRating, numberOfRatings}
    //     })
    // },

    addRating(newValue, quoteId, userId) {

        const quoteRatingRef = firebase.database().ref('quoteRatings').child(quoteId)
        const userRatingsRef = firebase.database().ref('userRatings').child(userId)

        const rating = {
            quoteId: quoteId,
            userId: userId,
            rating: newValue
        }

        const quoteRating = {
            [userId]: {...rating}
        }

        const userRating = {
            [quoteId]: {...rating}
        }

        quoteRatingRef.update(quoteRating)
        userRatingsRef.update(userRating)
    }
}

export default FirebaseService;
