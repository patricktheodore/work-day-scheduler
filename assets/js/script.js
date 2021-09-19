//variables
var blockDisplay = $('#displayContainer');
var currentTimeDisplayEl = $('#currentTime')
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

        const rowDisplay = $('<div>').addClass('row').attr('id', i); 
        const hourBlock = $('<p>').addClass('col-1 hour').text(date.format('h a')).attr('id', i);
        const textBox = $('<textarea>').addClass('col-10 event textarea').attr('id',  'text' + [i]);
        const saveBtn = $('<button>').addClass('col-1 saveBtn').text('save').attr('id', i);
        
        blockDisplay.append(
            rowDisplay.append(
            hourBlock,
            textBox,
            saveBtn
            )
        );
        
        date.add(1, 'hour');
        
//issue where the correct hour block is not displaying green. currently 1 hour behind
        if (today.isBefore(date, 'hour')) {
            textBox.addClass('future');
        } else if (today.isAfter(date, 'hour')) {
            textBox.addClass('past');
        } else {
            textBox.addClass('present');
        }        
    }
    //check local storage for existing data

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
    //save any new input to local storage
    //if there is a click on a button - take the value of its nearest textarea sibling - and save it to local storage
    $('.saveBtn').on('click', addInputs);
    displayInputs();
}




$(window).on("load", displaySchedule());

setInterval(updateTime, 1000);



//clicking a timeblock allows an input
//event listener on row divs, buttons. if click save text area content to local storage with id = i
//saving an input also saves it to local storage
//refreshing the page, saved events persist