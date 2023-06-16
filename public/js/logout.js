document.querySelector('.logoutcontainer')
.addEventListener('submit')

fetch('/logout', {
    method: 'POST',
    headers: {
        'Conte-Type': 'application/josn'
    }
})
.then(function(response) {
    res.render = ('/views/layouts/main');
})
.catch(function(error) {
    console.error('Error:', error);
    });
