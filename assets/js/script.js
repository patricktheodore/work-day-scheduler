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




// full disclosure, the below is something I worked on with my tutor to fix an issue i was having with textarea input being to long. 
// this is outside of my current skill scope, but as it achieved the goal and makes the app behave as intended, I have decided to leave the code in

function countBy(iterable, callback){
    let count = 0;
    for (let index = 0; index < iterable.length; index++) {
        const character = iterable[index];
        
        if(callback(character)){
            count++;
        }
    }
    return count;
}

function textareaRowLimiter(event){
    const currentInput = event.target.value;
    const currentKeystroke = currentInput.slice(-1);

    // check if current keystroke is \n or not
    if(currentKeystroke !== '\n'){
        return;
    }

    // detect the total \n 
    const count = countBy(currentInput, function(character){
        return character === '\n';
    })

    // if total is > 3
    if(count > 2){
        // stop the user from adding
        event.target.value = currentInput.slice(0, currentInput.length - 1)
    }
}

$(document).on('input', 'textarea' ,textareaRowLimiter)

//--------------------------



function displaySchedule(date) {
    const hourNow = Number(today.format("HH")); //changing to 24 hour format

    console.log('hournot', hourNow)
    date = moment().hour(9);

    for (let i = 0; i < 9; i++) {
 
        //assigning each an id equal to i to call upon later in the code
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

        const blockHour = i + 9; //this is where 24 hour format is useful 
        
        if(hourNow > blockHour){
            // past
            textBox.addClass('past');
        }
        if (hourNow === blockHour){
            // present
            textBox.addClass('present');
        }

        if(hourNow < blockHour){
            // future
            textBox.addClass('future');
        }

        date.add(1, 'hour');
      
    }

    
    function displayInputs() { //using previously assigned id's to display stored data from local storage
        for (let i = 0; i < 9; i++) {
            let storedInput = localStorage.getItem('text' + i);
            $('#text' + i).val(storedInput);
        }
    }

    function addInputs(event) {
        event.preventDefault(); //using jquery to traverse the dom into intended html element of text areas
        localStorage.setItem($(this)[0].previousElementSibling.id, $(this)[0].previousElementSibling.value);
    }

    function deleteBlock(event) { //adding functionality to delete just a time block instead of manually backspacing or deleting whole page
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

$(window).on("load", displaySchedule()); //loading data stored in local storage on page load

setInterval(updateTime, 1000); //updating the time every second