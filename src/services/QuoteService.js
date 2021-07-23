const QuoteService = {
    baseUrlProd: "/feed", // Redirected to http://quotes.stormconsultancy.co.uk/:splat by netlify according to netlify.toml file
    baseUrlDev: "http://quotes.stormconsultancy.co.uk",
    baseUrl: '',

    doLoad(url) { // Base method for doing http Get requests
        if (!this.baseUrl) {
            if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
                     this.baseUrl = this.baseUrlDev;
            } else { this.baseUrl = this.baseUrlProd }
        }

        if (!url.includes(this.baseUrl)) { url = this.baseUrl + url; }

        // console.log(url)
        return fetch(url).then(response => {
            if (response.status === 404) { return ''; }
            if (response.status === 200) { return response.json(); }})
            .then(data => {
                // console.log(data);
                return data}).catch(e => { console.log('Error', e) });
    },

    getQuotes() {
        return this.doLoad('/quotes.json').then(jsonData => {
            return jsonData;
        }).catch(e => { console.log('Error', e) });
    },

    getPopularQuotes() {
        return this.doLoad('/popular.json').then(jsonData => {
            return jsonData;
        }).catch(e => { console.log('Error', e) });
    },

    getQuote(quoteId) {
        return this.doLoad(`/quotes/${quoteId}.json`).then(jsonData => {
            return jsonData;
        }).catch(e => { console.log('Error', e) });
    },

    getRandomQuote() {
        return this.doLoad("/random.json").then(jsonData => {
            return jsonData;
        }).catch(e => { console.log('Error', e) });
    },
}

export default QuoteService;
