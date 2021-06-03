const db = require('../config/db')

const data = () => {
    try{
        db.query('SELECT name, breed, dogAttachment FROM dogs INNER JOIN marks ON dogs.idDog = marks.idDog AND marks.idUser = ?', [req.user.idUser], (err, result) => {

            if (!result){
                return data = []
            }
            console.log(result)
            return data = result
        });
    }catch (error){
        console.log(error)
    }

}

const search = document.getElementById('search');
const matchList = document.getElementById('matchList');

search.addEventListener('input', () => searchMarks(search.value));

const searchMarks = async searchText => {
    const res = await fetch(data);
    
    let matches = res.filter(marks => {
        const regex = new RegExp(`^${searchText}`, 'gi')
        return marks.name.match(regex)
    })

    outputHtml(matches);
    console.log(matches)
};

const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => 
            `
            <div class="ui card" id="verticalCard">
                <img class="ui image" src="tmp/${match.dogAttachment}">
                <div class="content">       
                <h4>${match.name}</h4>
                <span class="breed">${match.breed}</span>
                </div>
            </div> 
            `
        ).join('');  

        matchList.innerHTML = html;
    };           
}