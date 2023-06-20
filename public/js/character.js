const List = require('./dndapi');
const { v4: uuidv4 } = require('uuid')

let weaponBlock = $('#weapondiv');
let spellBlock = $('#spelldiv');
let newWeaponButton = $('#newWeapon');
let newSpellButton = $('#newSpell');
let newOtherButton = $('#newOther');
let savebnt =$('#saveBnt');
const charID = $('#charater').val();

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
    const formid = JSON.parse(item.parentElement.getAttribute('value'));
    formid.remove();
//creates the weapon block
    var div = $('<tr>');
    div.attr('class',"weaponSlab")
    var title =$('<th>');
    title.text(itemInfo.data.name);
    title.attr("name",`${itemInfo.data.name}`)
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
  div.attr('class',"spellSlab")
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
//creats new other block.
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
  div.attr("id", formid);
  div.attr('class',"otherSlab")
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

  //creats a new weapon form.
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
    //adds save bnt
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

//creats spell selection form.
const newSpell = async () =>  {
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
//creats other selection form.
const newOther = async () =>  {
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

const saveWeapons = async(e) => {
  e.stopPropagation();
  let currentWeapons = [];
await $('.weaponSlab').map( () => {
  let wName = $(this).childElement.getAttribute('name');
  let wDamage = $(this).val();
  currentWeapons.push({
    name:wName,
    damage:wDamage
  });
})
.then(() =>{
  fetch('api/weapons',{
    method: 'POST',
    body: currentWeapons,
    headers: {
      'Content-Type': 'application/json',
    },
  });
 });
};
const saveSpells = async(e) => {
  e.stopPropagation();
  let currentSpells = [];
await $('.spellSlab').map( () => {
  let sName = $(this).childElement.getAttribute('name');
  let sDamage = $(this).val();
  currentSpells.push({
    name:sName,
    damage:sDamage
  });
})
.then(() =>{
  fetch('api/spells',{
    method: 'POST',
    body: currentspells,
    headers: {
      'Content-Type': 'application/json',
    },
  });
 });
};
const saveOther = async(e) => {
  e.stopPropagation();
  let currentOther = [];
await $('.otherSlab').map( () => {
  let oName = $(this).childElement.getAttribute('name');
  let oDamage = $(this).val();
  let oId = $(this).getAttribute('id')
  currentOther.push({
    id:oId,
    name:oName,
    damage:oDamage
  });
})
.then(() =>{
  fetch('api/other',{
    method: 'POST',
    body: currentOther,
    headers: {
      'Content-Type': 'application/json',
    },
  });
 });
};
const saveToDB = async(e) => {
  e.stopPropagation();
  //gets others name
  let currentOther = [];
await $('.otherSlab').map( () => {
  let oId = $(this).getAttribute('id');
  currentOther.push(oId);
})
//gets spells name
let currentSpells = [];
await $('.spellSlab').map( () => {
  let sName = $(this).childElement.getAttribute('name');
  currentSpells.push(sName);
});
  // gets weapons names
  let currentWeapons = [];
await $('.weaponSlab').map( () => {
  let wName = $(this).childElement.getAttribute('name');
  currentWeapons.push(wName);
});
//grabs needed info for post.
let cname = $('#characterName').value.trim();
let campaignName= $('#campaignName').value.trim();
let cclass= $('#class').value.trim();
let cLevel= $('#level').value.trim();
let crace= $('#race').value.trim();
let chp= $('#hitpoints').value.trim();
let armorClass= $('#armorClass').value.trim();
let cinitiative= $('#initiative').value.trim();
let cspeed= $('#speed').value.trim();
let cstrength= $('#str').value.trim();
let cdexterity= $('#dex').value.trim();
let cconstitution= $('#con').value.trim();
let cintelligence= $('#int').value.trim();
let cwisdom= $('#wis').value.trim();
let ccharisma= $('#cha').value.trim();
if (charID && cname && campaignName && cclass && cLevel && crace && chp && armorClass && cinitiative &&
  cspeed && cstrength && cdexterity && cconstitution && cintelligence && cwisdom && ccharisma) {
  const response = await fetch(`/api/characters/character`, {
    method: 'POST',
    body: JSON.stringify({charID,cname, campaignName,cclass,cLevel,crace,chp,armorClass,cinitiative,
      cspeed, cstrength, cdexterity, cconstitution, cintelligence, cwisdom, ccharisma,
      currentSpells, currentWeapons,currentOther}),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    console.log('Character saved');
  } else {
    alert('Failed to Save Character');
  }
}
};
const saveCharacter = async (e) => {
  e.stopPropagation();
  await saveWeapons();
  await saveOther();
  await saveSpells();
  await saveToDB();
  
}
newWeaponButton.on('click',newWeapon());
newSpellButton.on('click',newSpell());
newOtherButton.on('click',newOther());
savebnt.on('click',saveCharacter());