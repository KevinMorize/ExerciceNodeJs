const search = document.getElementById('citySearch');
const matchList = document.getElementById('cityList');

search.addEventListener('keyup', () => searchMarks(search.value));

const searchMarks = async searchText => {
    const res = await fetch('https://geo.api.gouv.fr/communes');
    const city = await res.json();
    
    let matches = city.filter(match => {
        const regex = new RegExp(`^${searchText}`, 'gi')
        return match.nom.match(regex) || match.code.match(regex)
    })

    if (searchText === ""){
      matchList.innerHTML = "";
      matches = [];
    }

    outputHtml(matches);
};

const outputHtml = (matches) => {
    matchList.innerHTML = "";
    matches.map(match => {
        match.codesPostaux.forEach((codePostal) => {
            outPutDiv(match, codePostal)
        })
    })
};   

function outPutDiv (match, codePostal){
        var newMatchDiv = document.createElement('div')
        newMatchDiv.className = "cityMatch"
        newMatchDiv.onclick = function(){
            search.value = match.nom + " " + codePostal
            matchList.innerHTML = "";
            matches = [];
        }
        newMatchDiv.innerHTML = match.nom + " - " + codePostal
        cityList.appendChild(newMatchDiv)
}