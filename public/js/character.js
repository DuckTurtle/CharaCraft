const List = require('./dndapi');
const { v4: uuidv4 } = require('uuid')

let weaponblock = $('#weaponBlock');
let newWeaponButton = $('#newWeapon');
let savebnt =$('saveBnt');
let shownText = $('.text');
const charID = $('charname').val();
//show an element
const show = (elem) => {
    elem.style.display = 'inline';
  };
  
  // Hide an element
  const hide = (elem) => {
    elem.style.display = 'none';
  };

const deleteItem = async (e) => {
    e.stopPropagation();

    const item = e.target;
    const itemid = JSON.parse(item.parentElement.getAttribute('id'));
    const itemval = JSON.parse(item.parentElement.getAttribute('value'));
    itemid.remove();
   await  fetch('/api/character/:id', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemval),
    });
  };
  

  //creat save item
  const saveWeapon = async (e) => {
    e.stopPropagation();

    const item = e.target;
    const wName = ;
    const itemid = JSON.parse(item.parentElement.getAttribute('id'));
    const itemval = JSON.parse(item.parentElement.getAttribute('value'));
    itemid.remove();
    await  fetch('/api/character/:id', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        id:itemid,
        name:,
        url:JSON.stringify(itemval),
      }
    });
  }
const newWeapon = async () =>  {
    var form = $('<form>');
    form.attr('value', uuidv4());
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
  
    form.append(delBtnEl);
    const saveBnt = $('<i>');
    saveBnt.addClass(
      //add style
    );
    saveBnt.addEventListener('click', saveitem);
  
    form.append(delBtnEl);
    weaponblock.append(form);
};

