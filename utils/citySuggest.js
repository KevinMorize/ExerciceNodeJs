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

    // if (matches.length > 0) {
    //     var html = matches.map(match => 
    //             `
    //             <div class="cityMatch" onclick="selectedCity('${match.nom}', '${match.code}')">
    //             ${match.nom} - ${match.code}
    //             </div> 
    //             `
    //     ).join(''); 

    //     console.log('--------', html)
    //     matchList.innerHTML = html;
    // };  

    var html = matches.map(match => {
        var output =
            match.codesPostaux.forEach((codePostal) => { 
                var div = 
                `
                <div class="cityMatch" onclick="selectedCity('${match.nom}', '${codePostal}')">
                ${match.nom} - ${codePostal}
                </div> 
                `

                outputDiv = output + div
            })
            console.log(outputDiv)
        }).join('');

        console.log(html)
        matchList.innerHTML = html;
};   
     


// function selectedCity (nom, codePostaux) {
//       search.value = nom + " - " + codePostaux
//       matchList.innerHTML = "";
//       matches = [];
// }