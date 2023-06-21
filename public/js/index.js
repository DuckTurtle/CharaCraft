const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      console.log(id);
      var confirm = window.confirm("Would you like to delete this character?")
      if(confirm){
        const response = await fetch(`/api/characters/${id}`, {
            method: 'DELETE',
          });
      
          if (response.ok) {
            window.location.reload();
          } else {
            alert('Failed to delete project');
          }
      } else{

      }
      
    }
  };
setTimeout(async () => {
    document
  .querySelector('.CharacterBlock')
  .addEventListener('click', delButtonHandler)
  }, 2000);
;