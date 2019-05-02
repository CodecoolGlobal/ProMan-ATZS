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
        dataHandler.getBoards(function (boards) {
            dom.showBoards(boards);
        });
    },

    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardList = '';
        boardList+=`<button id="new-board" class="board-add">Add Board</button>`;



        for (let board of boards) {
            boardList += `<section class="board" id="board-${board.id}">
            <div data-board-id="${board.id}"  class="board-header"><span class="board-title">${board.name}</span>
                <button class="board-add">Add Card</button>
                <button class="board-toggle"><i class="fas fa-chevron-down"></i></button>
            </div></section>`;
            dom.loadStatusesByBoardId(`${board.id}`);

        }
        this._appendToElement(document.querySelector('.board-container'), boardList);
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
        statusList +='<div class="board-columns">';
        for (let status of statuses) {
            statusList +=
                `<div id="status-${status.id}" class="board-column">
                    <div class="board-column-title">${status.name}</div>
                    <div class="board-column-content"></div>
                </div>`;


        }
        statusList +='</div>';
        //console.log(statusList);
        this._appendToElement(document.querySelector('#board-' + boardID), statusList);
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    },
    // here comes more features
};
