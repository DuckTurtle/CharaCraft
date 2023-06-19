

const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
  console.log(email,password)
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/UserPortal');
        console.log('you in');
      } else {
        alert('Failed to log in.');
      }
    }
  };
  document.querySelector('#loginformcontainer').addEventListener('submit', loginFormHandler);