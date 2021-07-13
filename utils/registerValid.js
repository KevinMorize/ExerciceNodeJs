const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const email = document.getElementsByName('email');
const password = document.getElementsByName('password');
const passwordConfirm = document.getElementsByName('passwordConfirm');

email[0].addEventListener('change', () => emailError(email[0].value))
password[0].addEventListener('keyup', () => passwordError(password[0].value))
passwordConfirm[0].addEventListener('change', () => passwordConfirmError(passwordConfirm[0].value))

function emailError (value){
    const emailErrorMessage = document.getElementById('emailErrorMessage')
  
    if(emailErrorMessage){
      email[0].parentNode.removeChild(emailErrorMessage)
    }
  
    if (!EMAIL_REGEX.test(value)){
      var message = document.createElement('div')
          message.className = ('ui red message')
          message.id = ('emailErrorMessage')
          email[0].parentNode.appendChild(message)
          var messageText = document.createTextNode("Une erreur s'est glissée ici !")
          message.appendChild(messageText)  
    }
  }

function passwordError(value){
      const maj = /[A-Z]/;
      const min = /[a-z]/;
      const nb = /[0-9]/;
      const spe = /[#?!@$ %^&*-]/;
      const limit = /[a-zA-Z0-9#?!@$ %^&*-]{8,}/ 
      const checkDiv = document.getElementById('checkListDiv');
      const majItem = checkDiv.getElementsByTagName('p')[0];
      const minItem = checkDiv.getElementsByTagName('p')[1];
      const nbItem = checkDiv.getElementsByTagName('p')[2];
      const speItem = checkDiv.getElementsByTagName('p')[3];
      const limitItem = checkDiv.getElementsByTagName('p')[4];

      if(maj.test(value) === true){
        majItem.className = "checkListItemValid"
      } else if (maj.test(value) === false) {
        majItem.className = "checkListItem"
      }

      if(min.test(value) === true){
        minItem.className = "checkListItemValid"
      } else if (min.test(value) === false) {
        minItem.className = "checkListItem"
      }

      if(nb.test(value) === true){
        nbItem.className = "checkListItemValid"
      } else if (nb.test(value) === false) {
        nbItem.className = "checkListItem"
      }

      if(spe.test(value) === true){
        speItem.className = "checkListItemValid"
      } else if (spe.test(value) === false) {
        speItem.className = "checkListItem"
      }

      if(limit.test(value) === true){
        limitItem.className = "checkListItemValid"
      } else if (limit.test(value) === false) {
        limitItem.className = "checkListItem"
      }
  }

function passwordConfirmError(value){
  const passwordConfirmErrorMessage = document.getElementById('passwordConfirmErrorMessage')

    if(passwordConfirmErrorMessage || value === password[0].value){
      passwordConfirm[0].parentNode.removeChild(passwordConfirmErrorMessage)
    }

    if (value !== password[0].value){
        var message = document.createElement('div')
            message.className = ('ui red message')
            message.id = ('passwordConfirmErrorMessage')
            passwordConfirm[0].parentNode.appendChild(message)
            var messageText = document.createTextNode("Les mots de passe ne correspondent pas")
            message.appendChild(messageText)  
      }
}

$(document).on('submit', "form", async function(e) {
  
    if (!EMAIL_REGEX.test(email[0].value)){
        e.preventDefault()
    }

    if (!PASSWORD_REGEX.test(password[0].value)){
        e.preventDefault()
    }

    if (passwordConfirm[0].value !== password[0].value){
        e.preventDefault()
    }

  
  });