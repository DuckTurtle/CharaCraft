
//login for user
function login(username, password) {
    const requestBody = {
        username: username,
        password: password,
    }
}

fetch('api/dnd/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'}
    },
    body: JSON.stringify({email, password}),
)
.then(response => response.json())
.then(data => {

if (data.sucess) {

} else {

}
})
.catch(error => {
    console.error('Error:', error)
    alert('Failed to login.')
})

