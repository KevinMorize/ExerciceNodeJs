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

    console.log(matches)

    if (searchText === ""){
      matchList.innerHTML = "";
      matches = [];
    }

    outputHtml(matches);
};

const outputHtml = (matches) => {

    if (matches.length > 0) {

        var html = matches.map(match => {
            match.codesPostaux.forEach(function(codePostal){
                `
                <div class="cityMatch" onclick="selectedCity('${match.nom}', '${codePostal}')">
                ${match.nom} - ${codePostal}
                </div> 
                `
                console.log('-----------', codePostal)
            }) 
        }      
        ).join(''); 

        matchList.innerHTML = html;
    };           
}

function selectedCity (nom, codePostaux) {
      search.value = nom + " - " + codePostaux
      matchList.innerHTML = "";
      matches = [];
}