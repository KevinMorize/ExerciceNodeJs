const walkSectionInvited = document.getElementById('walkSectionInvited')
const walkSectionAccepted = document.getElementById('walkSectionAccepted')
const walkSectionCreated = document.getElementById('walkSectionCreated')

if (!(walkSectionInvited.children.length)){
    const message = document.createElement('p');
    walkSectionInvited.appendChild(message)
    const text = document.createTextNode("\" Ici les balades auxquelles vous êtes invité(e) \"")
    message.appendChild(text)
} 

if (!(walkSectionAccepted.children.length)) {
    const message = document.createElement('p');
    walkSectionAccepted.appendChild(message)
    const text = document.createTextNode("\" Ici les balades auxquelles vous participez \"")
    message.appendChild(text)
}

if(!(walkSectionCreated.children.length)){
    const message = document.createElement('p');
    walkSectionCreated.appendChild(message)
    const text = document.createTextNode("\" Ici les balades que vous avez proposé \"")
    message.appendChild(text)
}