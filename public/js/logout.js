document.querySelector('.logoutcontainer')
.addEventListener('submit')

fetch('/logout', {
    method: 'POST',
    headers: {
        'Conte-Type': 'application/json'
    }
})
.then(function(response) {
   document.location.replace('/landing');
})
.catch(function(error) {
    console.error('Error:', error);
    });
