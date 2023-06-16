document.querySelector('.logoutcontainer')
.addEventListener('submit')

fetch('/logout', {
    method: 'POST',
    headers: {
        'Conte-Type': 'application/josn'
    }
})
.then(function(response) {
    window.location.href = '/api/dndllogin';
})
.catch(function(error) {
    console.error('Error:', error);
    });
