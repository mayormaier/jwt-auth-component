/**
 * defines the status of the jwt-auth component by receiving 'auth-success' events
 */

document.querySelector("body").addEventListener('auth-success', (e) => {
    console.log("Event received!", e)
    const statusDiv = document.querySelector(".status")
    statusDiv.querySelector("h2").style.color = "green";

    const newDiv = document.createElement("div");
    const jwtDisplay = document.createTextNode(e.detail.token)
    newDiv.appendChild(jwtDisplay);
    statusDiv.insertAdjacentElement('beforeend', newDiv);
})