//const;
const walkDate = document.getElementById('walkDate');
const day = document.getElementById('day');
const start = document.getElementById('start');
const end = document.getElementById('end');

// events
day.addEventListener('change', () => selectDay(day.value))
start.addEventListener('change', () => selectTime())
end.addEventListener('change', () => selectTime())

function selectDay(value){
    const dateError = document.getElementById('dayErrorMessage');
    var checkDate = Date.parse(value) - Date.now()

    if (dateError){
        walkDate.removeChild(dateError)
    }

    if(checkDate < 0){
        var message = document.createElement('div')
        message.className = ('ui red message')
        message.id = ('dayErrorMessage')
        walkDate.appendChild(message)
        var messageText = document.createTextNode("Les voyages dans le temps sont malheureusement impossibles")
        message.appendChild(messageText)      
    }
}

function selectTime(){
    const timeError = document.getElementById('timeErrorMessage');
    var startHour = start.value.slice(0, 2)
    var endHour = end.value.slice(0, 2)
    var startMin = start.value.slice(3)
    var endMin = end.value.slice(3)

    if (startHour === "00"){
        var startHour = "24"
    } 

    if (endHour === "00"){
        var endHour = "24"
    }

    if (timeError){
        walkDate.removeChild(timeError)
    }

    if((startHour + startMin >= endHour + endMin)){
        var message = document.createElement('div')
        message.className = ('ui red message')
        message.id = ('timeErrorMessage')
        walkDate.appendChild(message)
        var messageText = document.createTextNode("L'heure de retour doit être supérieure à l'heure de départ")
        message.appendChild(messageText)
    }
}
    
$('form').submit(async function(e){
    var checkDate = Date.parse(day.value) - Date.now()
    var startHour = start.value.slice(0, 2)
    var endHour = end.value.slice(0, 2)
    var startMin = start.value.slice(3)
    var endMin = end.value.slice(3)

    if (startHour === "00"){
        var startHour = "24"
    } 

    if (endHour === "00"){
        var endHour = "24"
    }

    if(checkDate < 0){  
        e.preventDefault() 
    }

    if((startHour + startMin >= endHour + endMin)){
        e.preventDefault()
    }
});
    