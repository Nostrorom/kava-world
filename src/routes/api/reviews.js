let reviews = [];

export const get = async () => {

    if (reviews.length === 0) {
        try {
            const res = await fetch('https://kava-world-api.herokuapp.com/reviews');
            const data = await res.json();
            reviews = data;

        } catch (err) {
            return {
                body: {
                    error: "Error fetching data"
                }
            };
        };
    };

    return {
        body: {
            reviews
        }
    };
};