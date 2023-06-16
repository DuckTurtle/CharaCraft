//sign up for user
document.querySelector('SignUpForm').addEventListener('submit', function (event){
    event.preventDefault();
})

const username = document.querySelector('#username').value.trim;
const email = document.querySelector('#email').value.trim;
const password = document.querySelector('#password').value.trim;

signup(username, email, password);


function signUp(username, email, password) {
    const requestLogin = {
        username: username, 
        email: email,
        password: password,
    }

fetch ('/api//signup', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestLogin)
})
.then(response => response.json())
.then(data => {
    if (data.success) {
 
    }else{

    }
})
.catch(error => {
    console.error('Error:', error);
    alert('Failed to sign up')
});
}
