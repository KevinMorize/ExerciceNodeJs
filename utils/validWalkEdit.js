
//time;
const walkDate = document.getElementById('walkDate');
const day = document.getElementById('day');
const start = document.getElementById('start');
const end = document.getElementById('end');
    
$('form').submit(async function(e){
    
        // timeCheck
        var startHour = start.value.slice(0, 2)
        var endHour = end.value.slice(0, 2)
        var startMin = start.value.slice(3)
        var endMin = end.value.slice(3)
        var checkDate = Date.parse(day.value) - Date.now()
    
        if (startHour === "00"){
            var startHour = "24"
        } else if (endHour === "00"){
            var endHour = "24"
        }
    
        if(startHour && startMin && endHour && endMin && (startHour + startMin >= endHour + endMin)){

            e.preventDefault()

            const timeError = document.getElementById('timeErrorMessage');
            const dateError = document.getElementById('dayErrorMessage');

            if (timeError){
                walkDate.removeChild(timeError)
            }

            if (dateError){
                walkDate.removeChild(dateError)
            }
            
            var message = document.createElement('div')
            message.className = ('ui red message')
            message.id = ('timeErrorMessage')
            walkDate.appendChild(message)
            var messageText = document.createTextNode("L'heure de retour doit être supérieure à l'heure de départ")
            message.appendChild(messageText)
        }

        if(checkDate < 0){
            e.preventDefault()
            var message = document.createElement('div')
            message.className = ('ui red message')
            message.id = ('dayErrorMessage')
            walkDate.appendChild(message)
            var messageText = document.createTextNode("Les voyages dans le temps sont malheureusement impossibles")
            message.appendChild(messageText)
        }
    });
    