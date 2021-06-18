const search = document.getElementById('breedSearch');
const matchList = document.getElementById('breedList');

search.addEventListener('keyup', () => searchMarks(search.value));

const searchMarks = async searchText => {
    const res = await fetch('https://api.thedogapi.com/v1/breeds?');
    const breed = await res.json();
    
    let matches = breed.filter(match => {
        const regex = new RegExp(`^${searchText}`, 'gi')
        return match.name.match(regex)
    })

    if (searchText === ""){
      matchList.innerHTML = "";
      matches = [];
    }
    outputHtml(matches);
};

const outputHtml = (matches) => {
    if (matches.length > 0) {
        var html = matches.map(match =>
            `
            <div class="breedMatch" onclick="selectedBreed('${match.name}')">
              ${match.name}
            </div> 
            `
        ).join(''); 

        matchList.innerHTML = html;
    };           
}

function selectedBreed (name) {
      search.value = name
      matchList.innerHTML = "";
      matches = [];
}