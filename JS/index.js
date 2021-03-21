let myName = ''

function start() {
    MyProfile()
    Messages()
    PeopleFollow()
}

function MyProfile() {
    let profileContent = ''
    if(localStorage.myProfile === undefined) {
        DummyProfile()
    } else {
        let myProfile = JSON.parse(localStorage.myProfile)
        myName = myProfile.name
        profileContent += `
            Username: <span id="my-name">${myProfile.name}</span> <br/>
            Occupation: <span id="my-occupation">${myProfile.occupation}</span> <br/>
            Bio: <span id="my-bio">${myProfile.bio}</span> <br/>
            <button id="set-profile-button" class="align-center" onclick="setProfile()">Change Profile</button>`
        document.querySelector('#profile-content').innerHTML = profileContent
    }
}

function setProfile() {
    let profileContent = `Username: <input type="text" id="set-profile-name" placeholder="You like to be known as.."/> <br/><br/>
        Occupation: <input type="text" id="set-profile-occupation" placeholder="What do you do?"/> <br/><br/>
        Bio: <input type="text" id="set-profile-bio" placeholder="Write what all you like &#10024"/> <br/><br/>
        <button onclick="saveSetProfile(
            document.querySelector('#set-profile-name').value,
            document.querySelector('#set-profile-occupation').value,
            document.querySelector('#set-profile-bio').value
        )">Save Changes</button>
        <button onclick="cancelSetProfile()">Cancel Changes</button>`

    document.querySelector('#profile-content').innerHTML = profileContent
}

function saveSetProfile(name, occupation, bio) {
    localStorage.myProfile = JSON.stringify({
        name: name,
        occupation: occupation,
        bio: bio
    })
    MyProfile()
}

function cancelSetProfile() {
    start()
}


function sendMessage(message) {
    let messages = JSON.parse(localStorage.messages)
    messages.push({
        writtenBy: myName,
        content: message
    })
    localStorage.messages = JSON.stringify(messages)
    Messages()
}

function Messages() {
    if(localStorage.messages === undefined) DummyMessages()

    let messages = JSON.parse(localStorage.messages)
    let sectionContent = ''
    for(let i = 0; i < messages.length; i++) {
        sectionContent += `<div class="message-box">
            <div style="font-weight:bold;">${messages[i].writtenBy} says:</div>
            <br>
            <div>${messages[i].content}</div>
            
        </div>`
    }
    document.querySelector('#messages').innerHTML = sectionContent

}

function DummyMessages() {
    let messages = [
        {
            content: "lorem ipsum dolor sit amet!!",
            writtenBy: "FreakyTalons"
            
        }, {
            content: "Integer porttitor vel magna in sagittis. Integer suscipit tristique scelerisque. Sed condimentum sit amet mi a rhoncus.",
            writtenBy: "CodeRed125"
        }, {
            content: "In hac habitasse platea dictumst. Curabitur et nunc ultrices, interdum ligula nec, dignissim augue. Praesent varius nunc enim, ac efficitur augue hendrerit et.",
            writtenBy: "KanekiKen"
        }
    ]
    localStorage.messages = JSON.stringify(messages)
}

function DummyProfile() {
    localStorage.myProfile = JSON.stringify({
        name: "Boop",
        occupation: "ummm, you guys have jobs?",
        bio: "I'm just an electricity dependent life form"
    })
    MyProfile()
}

start()
