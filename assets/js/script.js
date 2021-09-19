//variables
var blockDisplay = $('#displayContainer');
var currentTimeDisplayEl = $('#currentTime')
const clearLocal = $('<button>').addClass('col-4 clearBtn').text('reset.');
const pageDisplay = $('#pageDisplay');


const today = moment();

var dayRightNow = today.format("dddd, MMMM Do YYYY"); 
$('#currentDay').text(dayRightNow);

currentTimeDisplayEl.text(today.format("h:mm:ss a"));
function updateTime() {
        var timeRightNow = moment().format("h:mm:ss a");
        currentTimeDisplayEl.text(timeRightNow);
}

function displaySchedule(date) {
    date = moment().hour(9);

    for (let i = 0; i < 9; i++) {

        //issue - unlimited amount of rows can be entered. undesired. 
        const rowDisplay = $('<div>').addClass('row').attr('id', i); 
        const hourBlock = $('<p>').addClass('col-1 hour time-block').text(date.format('h a')).attr('id', i);
        const textBox = $('<textarea>').addClass('col-8 event textarea description').attr('id',  'text' + [i]);
        const saveBtn = $('<button>').addClass('col-1 saveBtn btn').text('save.').attr('id', i);
        const deleteBtn = $('<button>').addClass('col-1 deleteBtn btn').text('X').attr('id', i);

        blockDisplay.append(
            rowDisplay.append(
            hourBlock,
            textBox,
            saveBtn,
            deleteBtn
            )
        );
        
        date.add(1, 'hour');
        
//issue - the correct hour block is not displaying green. currently 1 hour behind
        if (today.isBefore(date, 'hour')) {
            textBox.addClass('future');
        } else if (today.isAfter(date, 'hour')) {
            textBox.addClass('past');
        } else {
            textBox.addClass('present');
        }        
    }

    function displayInputs() {
        for (let i = 0; i < 9; i++) {
            let storedInput = localStorage.getItem('text' + i);
            $('#text' + i).text(storedInput);
        }
    }

    function addInputs(event) {
        event.preventDefault();
        localStorage.setItem($(this)[0].previousElementSibling.id, $(this)[0].previousElementSibling.value);
    }

    //doesnt work un unrefreshed pages
    function deleteBlock(event) {
        event.preventDefault();
        localStorage.setItem("text" + $(this)[0].id, "");
        displayInputs();
    }

    $('.deleteBtn').on('click', deleteBlock);

    $('.saveBtn').on('click', addInputs);
    displayInputs();
}

function clearLocalStorage() {
    localStorage.clear();
    location.reload();
}

pageDisplay.append(clearLocal);
clearLocal.on('click', clearLocalStorage);

$(window).on("load", displaySchedule());

setInterval(updateTime, 1000);