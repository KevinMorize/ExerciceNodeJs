//suggest
const addDogArea = document.getElementById('ddDogs');
const search = document.getElementById('search');
const matchList = document.getElementById('matchList');
const selectedArea = document.getElementById('selectedArea');

//selected
const selectedMatch = document.getElementsByClassName('hiddenInputMatch');
const selectedDogInput = document.getElementsByClassName('dogInputMatch');
const selectedDogArea = document.getElementById('addDogs');

//time
const walkDate = document.getElementById('walkDate');
const day = document.getElementById('day');
const start = document.getElementById('start');
const end = document.getElementById('end');

search.addEventListener('focus', () => searchMarks(search.value));
search.addEventListener('input', () => searchMarks(search.value));

matchList.style.display = "none"

const searchMarks = async searchText => {
    const res = await (<%- JSON.stringify(marks) %>);
    
    let matches = res.filter(marks => {
        const regex = new RegExp(`^${searchText}`, 'gi')
        return marks.name.match(regex)
    })

    matchList.style.display = "block"
    outputHtml(matches);
};

const outputHtml = (matches) => {
    if (matches.length > 0) {
        var html = matches.map(match =>
            `
            <div class="ui card" id="verticalCard" class="selectedMatch" value="${match.idDog}" onclick="selectedFriend('${match.dogAttachment}','${match.name}','${match.idDog}')">
                <img class="ui image" src="tmp/${match.dogAttachment}">
                <div class="content">       
                <h4>${match.name}</h4>
                <span class="breed">${match.breed}</span>
                </div>
            </div> 
            `
        ).join(''); 

        matchList.innerHTML = html;
        addMatchTitle()
    };           
}

function selectedFriend(image, name, id) {

    var newMatchDiv = document.createElement('div')
    newMatchDiv.className = "selectedDiv"

    var deleteMatchButton = document.createElement('button')
    deleteMatchButton.type = "button"
    deleteMatchButton.onclick = function(){
        this.parentNode.parentNode.removeChild(this.parentNode)
    }
    deleteMatchButton.className = "circular ui icon button"
    newMatchDiv.appendChild(deleteMatchButton)
    var icoDeleteMatchButton = document.createElement('i')
    icoDeleteMatchButton.className = "close icon"
    deleteMatchButton.appendChild(icoDeleteMatchButton)

    var newMatchImg = document.createElement('img')
    newMatchImg.src = 'tmp/' + image
    newMatchImg.className = 'ui avatar image'
    newMatchDiv.appendChild(newMatchImg)
    selectedArea.appendChild(newMatchDiv)

    var newMatchName = document.createElement('span')
    newMatchDiv.appendChild(newMatchName)
    var name = document.createTextNode(name)
    newMatchName.appendChild(name)

    var newMatchinput = document.createElement('input')
    newMatchinput.type = 'hidden'
    newMatchinput.name = 'invited'
    newMatchinput.className = "hiddenInputMatch"
    newMatchinput.value = id
    newMatchDiv.appendChild(newMatchinput)

    matchList.style.display = "none"
}

function addMatchTitle(){
        var title = document.createElement('p')
        matchList.insertBefore(title, matchList.childNodes[0]);
        var titleText = document.createTextNode('Suggestions:')
        title.appendChild(titleText)
}

$('form').submit(async function(e){
    
    //selectedCHeck
    // await Array.from(selectedDogInput).map(function(elem){
    //     if(elem.checked === true){
    //         e.preventDefault()
    //         var message = document.createElement('div')
    //         message.className = ('ui red message')
    //         selectedDogArea.appendChild(message)
    //         var messageText = document.createTextNode("Veuillez inviter au moins un compagnon")
    //         message.appendChild(messageText)
    //     }
    // })
    
    if(selectedMatch.length < 1){
        e.preventDefault()
        var message = document.createElement('div')
        message.className = ('ui red message')
        selectedArea.appendChild(message)
        var messageText = document.createTextNode("Les balades c'est mieux à deux")
        message.appendChild(messageText)
    }
    
    // timeCheck
    var startHour = start.value.slice(0, 2)
    var endHour = end.value.slice(0, 2)
    var startMin = start.value.slice(3)
    var endMin = end.value.slice(3)
    var checkDate = moment().format('X') - moment(day.value).format('X');
    
    if (startHour === "00"){
        var startHour = "24"
    } else if (endHour === "00"){
        var endHour = "24"
    }
    
    if(startHour && startMin && endHour && endMin && (startHour + startMin >= endHour + endMin)){
        e.preventDefault()
        var message = document.createElement('div')
        message.className = ('ui red message')
        message.id = ('timeErrorMessage')
        walkDate.appendChild(message)
        var messageText = document.createTextNode("L'heure de retour doit être supérieure à l'heure de départ")
        message.appendChild(messageText)
    }
    
    if(checkDate > 0){
        e.preventDefault()
        var message = document.createElement('div')
        message.className = ('ui red message')
        message.id = ('dayErrorMessage')
        walkDate.appendChild(message)
        var messageText = document.createTextNode("Les voyages dans le temps sont malheureusement impossibles")
        message.appendChild(messageText)
    }
});
