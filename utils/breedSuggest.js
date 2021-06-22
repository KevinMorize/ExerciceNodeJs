const breedSearch = document.getElementById('breedSearch');
const matchBreedList = document.getElementById('breedList');

breedSearch.addEventListener('keyup', () => searchMarks(breedSearch.value));

const searchMarks = async searchText => {
    const res = await fetch('https://api.thedogapi.com/v1/breeds?');
    const breed = await res.json();
    
    let matches = breed.filter(match => {
        const regex = new RegExp(`^${searchText}`, 'gi')
        return match.name.match(regex)
    })

    if (searchText === ""){
    matchBreedList.innerHTML = "";
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

        matchBreedList.innerHTML = html;
    };           
}

function selectedBreed (name) {
    breedSearch.value = name
    matchBreedList.innerHTML = "";
    matches = [];
}