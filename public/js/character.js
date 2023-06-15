const List = require('./dndapi');
const { v4: uuidv4 } = require('uuid')

let weaponBlock = $('#weapondiv');
let spellBlock = $('#spelldiv');
let newWeaponButton = $('#newWeapon');
let savebnt =$('saveBnt');
let shownText = $('.text');
const charID = $('charname').val();

const deleteItem = (e, array,) => {
    e.stopPropagation();
    const item = e.target;
    const formid = JSON.parse(item.parentElement.getAttribute('id'));
    formid.remove();
  };
  

  //grabs item with event then collects its data and creates a weapon div.
  const createWeaponBlock = async (e) =>{
    e.stopPropagation();
    //deletes old form and relaces with info.
    const item = e.target;
    const wName = JSON.parse(item.siblings('.sellection').val());
    //api call to get info.
    const itemInfo =  await List.getItem(wName);
    const formid = JSON.parse(item.parentElement.getAttribute('id'));
    formid.remove();
//creates the weapon block
    var div = $('<tr>');
    var title =$('<th>');
    title.text(itemInfo.data.name);
    title.attr('scope',"row");
    if(itemInfo.data.damage.damage_dice===undefined){
      div.attr("value", `${itemInfo.data.desc[1]} ${itemInfo.data.desc[2]}`);
    } else {
      div.attr("value", itemInfo.data.damage.damage_dice);
    }
    //on hover function that displays damage info
    div.on("mouseover", () => {
      var discription = $('<div>'); 
      div.attr("class","hoverinfo");
      discription.text(($(this).attr("value")));
      discription.append(div);
    })
    title.append(div);
    const delBtnEl = $('<i>');
    //adds delete button.
    delBtnEl.attr("id", "delBnt");
    delBtnEl.attr('class',
      //add style
    );
    $('#delBnt').click(deleteItem);
    div.append(delBtnEl);
    weaponBlock.append(div);
  };
const newWeapon = async () =>  {
    var form = $('<form>');
    form.attr('value', uuidv4());
    var myChoice = $('<select>');
    myChoice.attr('required');
    myChoice.attr('class', 'sellection');
    let choice = await List.getItem('/api/equipment-categories/weapon');
    $.each(choice, function(){
        myChoice.append(
            $('<option></option>').val(choice.data.url).html(choice.data.name).id(choice.data.index)
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
    $("savBnt").submit(createWeaponBlock(myChoice.val()));
  
    form.append(saveBnt);
    weaponBlock.append(form);
};

//creates spell card.
const createSpellBlock = async (e) =>{
  e.stopPropagation();
  //deletes old form and relaces with info.
  const item = e.target;
  const wName = JSON.parse(item.siblings('.sellection').val());
  //api call to get info.
  const itemInfo =  await List.getItem(wName);
  const formid = JSON.parse(item.parentElement.getAttribute('id'));
  formid.remove();
//creates the spell block
  var div = $('<tr>');
  var title =$('<th>');
  title.text(itemInfo.data.name);
  title.attr('scope',"row");
  div.attr("value", `${itemInfo.data.desc[1]} ${itemInfo.data.desc[2]}`);
  //on hover function that displays damage info
  div.on("mouseover", () => {
    var discription = $('<div>'); 
    var range = $('<p>');
    range.text = itemInfo.data.range
    var dec = $('<p>');
    dec.text = itemInfo.data.desc[1]
    div.attr("class","hoverinfo");
    discription.text(($(this).attr("value")));
    discription.append(div);
  })
  title.append(div);
  //adds delete button.
  const delBtnEl = $('<i>');
  delBtnEl.attr("id", "delBnt");
  delBtnEl.attr('class',
    //add style
  );
  $('#delBnt').click(deleteItem);
  div.append(delBtnEl);
   spellBlock.append(div);
};

//creats spell selection form.
const newspell = async () =>  {
  var form = $('<form>');
  form.attr('value', uuidv4());
  var myChoice = $('<select>');
  myChoice.attr('required');
  myChoice.attr('class', 'sellection');
  let choice = await List.getItem('/api/equipment-categories/weapon');
  $.each(choice, function(){
      myChoice.append(
          $('<option></option>').val(choice.data.url).html(choice.data.name).id(choice.data.index)
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
  $("savBnt").submit(createSpellBlock(myChoice.val()));

  form.append(saveBnt);
  spellBlock.append(form);
};

const createOtherBlock = async (e) =>{
  e.stopPropagation();
  //deletes old form and relaces with info.
  const item = e.target;
  const name = JSON.parse(item.siblings('.inputTitle').val());
  const desc = JSON.parse(item.siblings('.inputDesc').val());
  const formid = JSON.parse(item.parentElement.getAttribute('id'));
  formid.remove();
//creates the spell block
  var div = $('<tr>');
  var title =$('<th>');
  title.text(name);
  title.attr('scope',"row");
  div.attr("value", desc);
  //on hover function that displays damage info
  div.on("mouseover", () => {
    var discription = $('<div>'); 
    div.attr("class","hoverinfo");
    discription.text(($(this).attr("value")));
    discription.append(div);
  })
  title.append(div);
  //adds delete button.
  const delBtnEl = $('<i>');
  delBtnEl.attr("id", "delBnt");
  delBtnEl.attr('class',
    //add style
  );
  $('#delBnt').click(deleteItem);
  div.append(delBtnEl);
   spellBlock.append(div);
};
//creats other selection form.
const newother = async () =>  {
  var form = $('<form>');
  form.attr('value', uuidv4());
  var myTitle = $('<input>');
  myTitle .attr('type',"text");
  myTitle .attr('placeholder','Title.')
  myTitle .attr('required');
  myTitle .attr('class', 'inputTitle');
  form.append(myTitle);
  var myDesc = $('<input>');
  myDesc.attr('type',"text");
  myDesc.attr('placeholder','Description')
  myDesc.attr('required');
  myDesc.attr('class', 'inputDesc');
  form.append(myDesc);
  //adds delete button
  const delBtnEl = $('<i>');
  delBtnEl.attr("id", "delBnt");
  delBtnEl.attr('class',
    //add style
  );
  $('#delBnt').click(deleteItem);

  form.append(delBtnEl);
  //adds saveBnt
  const saveBnt = $('<i>');
  saveBnt.attr("id", "savBnt");
  saveBnt.attr('class',
    //add style
  );
  saveBnt.attr('type',"submit")
  $("savBnt").submit(createOtherBlock(myChoice.val()));

  form.append(saveBnt);
  spellBlock.append(div);
};
