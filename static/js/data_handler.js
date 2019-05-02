// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)
export let dataHandler = {
    _data: {}, // it contains the boards and their cards and statuses. It is not called from outside.
    _api_get: function (url, callback) {
        // it is not called from outside
        // loads data from API, parses it and calls the callback with it

        fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        })
            .then(response => response.json())  // parse the response as JSON
            .then(json_response => callback(json_response));  // Call the `callback` with the returned object
    },
    _api_post: function (url, data, callback) {
        // it is not called from outside
        // sends the data to the API, and calls callback function
    },
    init: function () {
    },
    getBoards: function (callback) {
        // the boards are retrieved and then the callback function is called with the boards

        // Here we use an arrow function to keep the value of 'this' on dataHandler.
        //    if we would use function(){...} here, the value of 'this' would change.
        this._api_get('/get-boards', (response) => {
            this._data = response;
            callback(response);
        });
    },
    getBoard: function (boardId, callback) {
        // the board is retrieved and then the callback function is called with the board
    },
    getStatuses: function (callback) {
        // the statuses are retrieved and then the callback function is called with the statuses
    },
    getStatus: function (statusId, callback) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByStatusId: function (statusID, callback) {
        this._api_get('/get-cards/' + statusID, (response) => {
            this._data = response;
            callback(response)
        });
        // the cards are retrieved and then the callback function is called with the cards
    },
    getStatusesByBoardId: function (boardId, callback) {
        this._api_get('/get-statuses/' + boardId, (response) => {
            this._data = response;
            callback(response);
        });
    },
    getCard: function (cardId, callback) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: function (boardTitle, callback) {
        // creates new board, saves it and calls the callback function with its data
    },
    createNewCard: function (cardTitle, boardId, statusId, callback) {
        // creates new card, saves it and calls the callback function with its data
    },
    // here comes more features

    boardsShowHide: function () {
        let favBoards = document.querySelectorAll('.board-toggle');
        favBoards.forEach((board) => {
            board.addEventListener('click', function (e) {
                console.log(e.target.parentElement.nextElementSibling);
                if (e.target.parentElement.parentElement.nextElementSibling.classList.contains('hide')) {
                    e.target.parentElement.parentElement.nextElementSibling.classList.replace('hide', 'show')

                } else {
                    e.target.parentElement.parentElement.nextElementSibling.classList.replace('show', 'hide')
                }
            })
        })
    }
};


