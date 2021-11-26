import { writable, derived } from 'svelte/store'

export const fetchedNakamals = writable([])

export const fetchedProducers = writable([])

export const fetchedReviews = writable([])

export const testArray = writable([])

export const reviewedNakamals = derived( [fetchedNakamals, fetchedReviews], ([nakamals, reviews], set) => {
        
        nakamals.forEach( (nakamal) => {

            let ratings = reviews.filter((review) => { if (review.nakamal_id === nakamal._id) {return review} });
            let numRatings = ratings.length;
            let kavRating = 0;
            let kavStars = 0;
            let nakRating = 0;
            let nakStars = 0;
            
            if (numRatings !== 0) {
                kavRating = Math.round(10 * ratings.reduce((total, vote) => total + vote.kava_rating, 0) / ratings.length)/10;
                kavStars = Math.round(kavRating);
                nakRating = Math.round(10 * ratings.reduce((total, vote) => total + vote.nakamal_rating, 0) / ratings.length)/10;
                nakStars = Math.round(nakRating);
            }

            nakamal.reviews = {
                ratings, numRatings, kavRating, kavStars,nakRating, nakStars
            }
        });

        set(nakamals);
    }
);

export const reviewedProducers = derived( [fetchedProducers, fetchedReviews], ([nakamals, reviews], set) => {
        
        nakamals.forEach( (nakamal) => {

            let ratings = reviews.filter((review) => { if (review.nakamal_id === nakamal._id) {return review} });
            let numRatings = ratings.length;
            let kavRating = 0;
            let kavStars = 0;
            let nakRating = 0;
            let nakStars = 0;
            
            if (numRatings !== 0) {
                kavRating = Math.round(10 * ratings.reduce((total, vote) => total + vote.kava_rating, 0) / ratings.length)/10;
                kavStars = Math.round(kavRating);
                nakRating = Math.round(10 * ratings.reduce((total, vote) => total + vote.nakamal_rating, 0) / ratings.length)/10;
                nakStars = Math.round(nakRating);
            }

            nakamal.reviews = {
                ratings, numRatings, kavRating, kavStars,nakRating, nakStars
            }
        });

        set(nakamals);
    }
);

export const selectedID = writable('');

export const selectedNakamal = derived([reviewedNakamals, selectedID], ([nakamals, id], set) => {
        set(nakamals.find((nakamal) => {return nakamal._id === id}))
    }
);

export const filterBy = writable({
    type: 'nakamal',
    country: 'all',
    city: 'all',
    kakaiTick: false,
    alcoholTick: false,
    tvTick: false,
    poolTick: false,
    nakStars: false,
    kavStars: false,
    sortBy: false,
});

export const locateUser = writable(false);

export const markerIDinRange = writable([]);

export const filteredNakamals = derived([reviewedNakamals, filterBy], ([nakamals, filters], set) => {

        
    let filtered = nakamals
        .filter(nakamal => filters.country === 'all' ? true : nakamal.country === filters.country)
        .filter(nakamal => filters.city === 'all' ? true : nakamal.city === filters.city)
        .filter(nakamal => filters.kakaiTick === false ? true : nakamal.kakai === true)
        .filter(nakamal => filters.alcoholTick === false ? true : nakamal.alcohol === true)
        .filter(nakamal => filters.tvTick === false ? true : nakamal.tv === true)
        .filter(nakamal => filters.poolTick === false ? true : nakamal.pool === true)
        .filter(nakamal => filters.kavStars === false ? true : nakamal.reviews.kavStars === filters.kavStars)
        .filter(nakamal => filters.nakStars === false ? true : nakamal.reviews.nakStars === filters.nakStars)
        // .filter(nakamal => locate === false ? true : inRange.some(id => id === nakamal._id))

        set(filtered);
    }
)

export const inRangeNakamals = derived([filteredNakamals, markerIDinRange, locateUser], ([nakamals, inRange], set) => {

    // let displayed = nakamals.filter(nakamal => locate === false ? true : inRange.some(id => id === nakamal._id))
    let displayed = nakamals.filter(nakamal => inRange.some(id => id === nakamal._id))

        set(displayed);
    }
)
