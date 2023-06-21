const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    console.log(id);
    var confirm = window.confirm("Would you like to delete this character?");
    if (confirm) {
      const response = await fetch(`/api/characters/delChar/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        window.location.reload();
      } else {
        alert("Failed to delete project");
      }
    } else {
    }
  }
};
setTimeout(async () => {
  const charBlock = document.querySelector(".CharacterBlock");
  if (charBlock != null) {
    charBlock.addEventListener("click", delButtonHandler);
  }
}, 2000);
