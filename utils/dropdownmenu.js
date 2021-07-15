const dropdownbutton = document.getElementById('dropdown');

const dropdonwnimg = document.getElementById('dropdownimg')

dropdonwnimg.addEventListener('click', () => dropdownExist())

function dropdownExist(){
  const dropdownglobalmenu = document.getElementById('dropdownglobalmenu')

  if (dropdownglobalmenu){
    dropdownbutton.removeChild(dropdownglobalmenu)
  } else {
    dropdownlist()
  }
}

function dropdownlist() {

  var dropdownmenu = document.createElement('div');
  dropdownmenu.id = "dropdownglobalmenu";
  dropdownbutton.appendChild(dropdownmenu)

  var dropdownmenu1 = document.createElement('div');
  var dropdownmenu2 = document.createElement('div');
  var dropdownmenu3 = document.createElement('div');

  dropdownmenu.appendChild(dropdownmenu1)
  dropdownmenu.appendChild(dropdownmenu2)
  dropdownmenu.appendChild(dropdownmenu3)

  var dropdownlink1 = document.createElement('a');
  dropdownlink1.href = "/user-update"
  dropdownlink1.innerHTML = "Modifier mon profil"
  var dropdownlink2 = document.createElement('a');
  dropdownlink2.innerHTML = "Gérer mes paramètres automatiques"
  var dropdownlink3 = document.createElement('a');
  dropdownlink3.innerHTML = "Supprimer mon profil"
  dropdownlink3.href = "/user-delete"
  dropdownlink3.onclick = function () {
    return confirm('Oh quel dommage de nous quitter, êtes-vous vraiment sûr(e) de vouloir partir ?')
  }
  dropdownlink3.id = "deletelinkprofil"
  dropdownmenu1.appendChild(dropdownlink1)
  dropdownmenu2.appendChild(dropdownlink2)
  dropdownmenu3.appendChild(dropdownlink3)

}
