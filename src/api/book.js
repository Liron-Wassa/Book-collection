let controller = null;

export const fetchBooks = (term, pageNumber) => {
    controller  = new AbortController();
    const url = `https://openlibrary.org/search.json?q=${term}&jscmd=data&limit=20&page=${pageNumber}`;
    return fetch(url, {signal: controller.signal}).then(response => response.json()
    .then(json => {
        const bookLists = json.docs;
        const maxPages = json.numFound;
        return {
            bookLists: bookLists,
            maxPages: maxPages
        };
    })
    .catch(error => error));
};

export const abortFetchBooks = () => {
    if(controller) {
        controller.abort();
    };
};