const List = require('./dndapi');
const { v4: uuidv4 } = require('uuid')

let weaponblock = $('#weaponBlock');
let newWeaponButton = $('#newWeapon');
let savebnt =$('saveBnt');
let shownText = $('.text');
const charID = $('charname').val();
const weapon = []

const loadHistory = ()=> {
    var oldWeapons = JSON.parse(localStorage.getItem(`weapons_${charID}`));

    if (!oldWeapons){
        return;
    }
    else{
        for (var i=0;i<oldWeapons.length; i++){
            //loads old list of weapons
            weapon.push(oldNames[i]);
        }
}
}
const deleteItem = (e, array,) => {
    e.stopPropagation();

    const item = e.target;
    const wName = JSON.parse(item.siblings('#sellection').html());
    const itemid = JSON.parse(item.siblings('#sellection').getAttribute('id'));
    const formid = JSON.parse(item.parentElement.getAttribute('id'));
    const itemval = JSON.parse(item.siblings('#sellection').val());
    formid.remove();
   array.splice(array, {
        id:itemid,
        contnet: {
        name:wName,
        url:itemval,
        }
   })
  };
  
const saveToLocal = (location, content) => {
  localStorage.setItem(location, content);
};
  //creat save item
  const saveWeapon = async (e) => {
    e.stopPropagation();

    const item = e.target;
    const wName = JSON.parse(item.siblings('#sellection').html());
    const itemid = JSON.parse(item.siblings('#sellection').getAttribute('id'));
    const formid = JSON.parse(item.parentElement.getAttribute('id'));
    const itemval = JSON.parse(item.siblings('#sellection').val());
    weapon.push({
        id:itemid,
        contnet: {
        name:wName,
        url:itemval,
        }
      })
    formid.remove();
    saveToLocal(`weapons_${charID}`,weapon);
    createWeaponBlock(itemval);
  };

  const createWeaponBlock = async (url) =>{
     const itemInfo =  await List.getItem(url);
     var div = $('<div>');
     var title =$('<th>');
     title.text(itemInfo.name);
     title.attr('scope',"row");
     var discription = $('<td>');
     title.append(div);
     discription.append(div);
     div.append(weaponblock);
     const delBtnEl = $('<i>');
    delBtnEl.attr("id", "delBnt");
    delBtnEl.attr('class',
      //add style
    );
    $('#delBnt').click(deleteItem);
  
    div.append(delBtnEl);
  };
const newWeapon = async () =>  {
    var form = $('<form>');
    form.attr('value', uuidv4());
    var myChoice = $('<select>');
    myChoice.attr('required');
    myChoice.attr('id', 'sellection');
    let choice = await List.getItem('/api/equipment-categories/weapon');
    $.each(choice, function(){
        myChoice.append(
            $('<option></option>').val(value).html(choice.name).id(choice.index)
        );
    });
    form.append(myChoice);
    //adds delete button
    const delBtnEl = $('<i>');
    delBtnEl.attr("id", "delBnt");
    delBtnEl.attr('class',
      //add style
    );
    $('#delBnt').click(deleteItem);
  
    form.append(delBtnEl);
    const saveBnt = $('<i>');
    saveBnt.attr("id", "savBnt");
    saveBnt.attr('class',
      //add style
    );
    saveBnt.attr('type',"submit")
    $("savBnt").submit(saveWeapon);
  
    form.append(saveBnt);
    weaponblock.append(form);
};

