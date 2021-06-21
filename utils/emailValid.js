const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const email = document.getElementsByName('email');
const emailConfirm = document.getElementsByName('emailConfirm');

emailConfirm[0].addEventListener('change', () => emailConfirmError(emailConfirm[0].value))
email[0].addEventListener('change', () => emailError(email[0].value))

function emailConfirmError (value){
  const emailConfirmErrorMessage = document.getElementById('emailConfirmErrorMessage')

  if(emailConfirmErrorMessage){
    emailConfirm[0].parentNode.removeChild(emailConfirmErrorMessage)
  }

  if (email[0].defaultValue !== value){
    var message = document.createElement('div')
        message.className = ('ui red message')
        message.id = ('emailConfirmErrorMessage')
        emailConfirm[0].parentNode.appendChild(message)
        var messageText = document.createTextNode("Une erreur s'est glissée ici !")
        message.appendChild(messageText)  
  }
}

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

$(document).on('submit', "form", async function(e) {
  if (emailConfirm[0].value !== email[0].value){
    e.preventDefault()
  }

  if (!EMAIL_REGEX.test(email[0].value)){
    e.preventDefault()
  }

});