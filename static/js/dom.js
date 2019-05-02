// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    _appendToElement: function (elementToExtend, textToAppend, prepend = false) {
        // function to append new DOM elements (represented by a string) to an existing DOM element
        let fakeDiv = document.createElement('div');
        fakeDiv.innerHTML = textToAppend.trim();

        for (let childNode of fakeDiv.childNodes) {
            if (prepend) {
                elementToExtend.prepend(childNode);
            } else {
                elementToExtend.appendChild(childNode);
            }
        }

        return elementToExtend.lastChild;
    },
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (all_data) {
            dom.showBoards(all_data);
        });
    },

    showBoards: function (all_data) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardList = '';
        boardList+=`<button id="new-board" class="board-add">Add Board</button>`;



        for (let data of all_data) {
            boardList += `<section class="board" id="board-${data.board_id}">
            <div data-board-id="${data.board_id}"  class="board-header"><span class="board-title">${data.board_name}</span>
                <button class="board-add">Add Card</button>
                <button class="board-toggle" ><i class="fas fa-chevron-down"></i></button>
            </div></section>`;
            dom.loadStatusesByBoardId(`${data.board_id}`);
            dom.loadCardsByStatusId(`${data.status_id}`);


        }
        this._appendToElement(document.querySelector('.board-container'), boardList);
        dataHandler.boardsShowHide();
        let newBoardButton = document.querySelector('#new-board');
        newBoardButton.addEventListener('click', function(){
            dataHandler.createNewBoard('Kiskutya', function () {

            });

        });

    },


    loadStatusesByBoardId: function (boardID) {
        dataHandler.getStatusesByBoardId(boardID, function (statuses) {
            dom.showStatusesByBoardId(boardID, statuses);
        });
    },

    showStatusesByBoardId: function (boardID, statuses) {
        let statusList = '';
        statusList += '<div class="board-columns show">';
        for (let status of statuses) {
            statusList +=
                `<div id="status-${status.id}" class="board-column">
                    <div class="board-column-title">${status.name}</div>
                    
                </div>`;
        }
        statusList += '</div>';
        this._appendToElement(document.querySelector('#board-' + boardID), statusList);
    },
    loadCardsByStatusId: function (statusID) {
        dataHandler.getCardsByStatusId(statusID, function (cards) {
            dom.showCardsByStatusId(cards, statusID)

        })
        // retrieves cards and makes showCardsByStatusId called
    },
    showCardsByStatusId: function (cards, statusID) {
        let cardList = '';
        for (let card of cards) {
            cardList +=
                `<div class="board-column-content">
                <div class="card">
                <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                <div class="card-title">${card.card_name}</div>
                </div> </div>`;
        }
        cardList += '</div>';
        this._appendToElement(document.querySelector('#status-' + statusID, '.board-column-content'), cardList)
        dataHandler.deleteCards();
        // shows the cards of a board
        // it adds necessary event listeners also
    },
    // here comes more features
};
// <div class="card">
// <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
// <div class="card-title">Card 1</div>
// </div>

