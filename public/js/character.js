const List = require('./dndapi');

let newWeaponButton = $('#newWeapon');
let savebnt =$('saveBnt');
let shownText = $('.text')
//show an element
const show = (elem) => {
    elem.style.display = 'inline';
  };
  
  // Hide an element
  const hide = (elem) => {
    elem.style.display = 'none';
  };

const deleteItem = (e) => {
    e.stopPropagation();

    const item = e.target;
    const itemid = JSON.parse(item.getAttribute('id'));

    get
  };
  
const newWeapon = async () =>  {
    var form = $('<form>');
    var myChoice = $('<select>');
    let choice = await List.getItem('equipment-categories/weapon');
    $.each(choice, function(name,value){
        myChoice.append(
            $('<option></option>').val(value).html(name)
        );
    });
    form.append(myChoice);
    //adds delete button
    const delBtnEl = $('<i>');
    delBtnEl.addClass(
      //add style
    );
    delBtnEl.addEventListener('click', deleteItem);
  
    form.append(delBtnEl)
};

