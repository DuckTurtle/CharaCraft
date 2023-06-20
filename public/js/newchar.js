//import List from './dndapi'
//const { v4: genID } = require('uuid');

let weaponBlock = document.querySelector('#weapondiv');
let spellBlock = document.querySelector('#spelldiv');
let newWeaponButton = document.querySelector('#newWeapon');
let newSpellButton = document.querySelector('#newSpell');
let newOtherButton = document.querySelector('#newOther');
let saveChar = document.querySelector('#saveBnt');


function genID() {
  var S4 = function() {
     return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
};
//api call

  const getCall = async (call) => {
      var dndAPI = "https://www.dnd5eapi.co" + call;
      let dataResults = await fetch(dndAPI)
      .then(function(response){
          var results = response.json();
          console.log(results);
              return results;
          });
          let data = await dataResults;
          console.log(data);
          return data;
          
  };
  
//takes api call and converts it to list

  const getItem = async (call) =>{
      const item = call
    let got = await getCall(item)
    console.log(got);
      //.then((rows)=> {
         // let got = rows
          const gotThings = got.equipment.map(({index, name, url}) => ({
              index: index,
              name: name,
              value: url
          }));
          console.log(gotThings);
          return gotThings
     // })
  };


  function genID() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  };
  
  const deleteItem = (e, array,) => {
      e.stopPropagation();
      const item = e.target;
      const formid = JSON.parse(item.parentElement.getAttribute('id'));
      formid.remove();
    };
    
  
    //grabs item with e then collects its data and creates a weapon div.
    const createWeaponBlock = async (e) =>{
      e.stopPropagation();
      //deletes old form and relaces with info.
      const item = e.target;
      const wName = JSON.parse(item.siblings('.sellection').value());
      //api call to get info.
      const itemInfo =  await List.getItem(wName);
      const formid = JSON.parse(item.parentElement.getAttribute('value'));
      formid.remove();
  //creates the weapon block
      var div = document.createElement('tr');
      div.setAttribute('class',"weaponSlab")
      var title = document.createElement('th');
      title.innerHTML(itemInfo.data.name);
      title.setAttribute("name",`${itemInfo.data.name}`)
      title.setAttribute('scope',"row");
      if(itemInfo.damage.damage_dice===undefined){
        div.setAttribute("value", `${itemInfo.desc[1]} ${itemInfo.desc[2]}`);
      } else {
        div.setAttribute("value", itemInfo.data.damage.damage_dice);
      }
      //on hover function that displays damage info
      div.addEventListener("mouseover", () => {
        var discription = document.createElement('<div>'); 
        div.setAttribute("class","hoverinfo");
        discription.innerHTML((this.setAttribute("value")));
        discription.append(div);
      })
      title.append(div);
      const delBtnEl = document.createElement('i');
      //adds delete button.
      delBtnEl.setAttribute("id", "delBnt");
      delBtnEl.setAttribute('class',
        //add style
      );
      document.querySelector('#delBnt').addEventListener('click', deleteItem);
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
    const itemInfo =  await getItem(wName);
    const formid = JSON.parse(item.parentElement.getAttribute('id'));
    formid.remove();
  //creates the spell block
    var div = document.createElement('tr');
    div.setAttribute('class',"spellSlab")
    var title = document.createElement('th');
    title.innerHTML(itemInfo.name);
    title.setAttribute('scope',"row");
    div.setAttribute("value", `${itemInfo.desc[1]} ${itemInfo.desc[2]}`);
    //on hover function that displays damage info
    div.addEventListener("mouseover", () => {
      var discription = document.createElement('div'); 
      var range = document.createElement('p');
      range.innerHTML(itemInfo.range)
      var dec = document.createElement('p');
      dec.innerHTML(itemInfo.desc[1])
      div.setAttribute("class","hoverinfo");
      discription.innerHTML((this.setAttribute("value")));
      discription.append(div);
    })
    title.append(div);
    //adds delete button.
    const delBtnEl = document.createElement('i');
      //adds delete button.
      delBtnEl.setAttribute("id", "delBnt");
      delBtnEl.setAttribute('class',
        //add style
      );
      document.querySelector('#delBnt').addEventListener('click', deleteItem);
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
    var div =  document.createElement('tr');
    div.setAttribute("id", formid);
    div.setAttribute('class',"otherSlab")
    var title =  document.createElement('th');
    title.innerHTML(name);
    title.setAttribute('scope',"row");
    div.setAttribute("value", desc);
    //on hover function that displays damage info
    div.addEventListener("mouseover", () => {
      var discription =  document.createElement('div'); 
      div.setAttribute("class","hoverinfo");
      discription.innerHTML(this.setAttribute("value"));
      discription.append(div);
    })
    title.append(div);
    //adds delete button.
    const delBtnEl = document.createElement('i');
    //adds delete button.
    delBtnEl.setAttribute("id", "delBnt");
    delBtnEl.setAttribute('class',
      //add style
    );
    document.querySelector('#delBnt').addEventListener('click', deleteItem);
    div.append(delBtnEl);
     spellBlock.append(div);
  };
  
    //creats a new weapon form.
    const newWeapon = async () =>  {
      var form =  document.createElement('form');
      form.setAttribute('value', genID());
      var myChoice =  document.createElement('select');
      myChoice.setAttribute('required', 'true');
      myChoice.setAttribute('class', 'sellection');
      let choice = await getItem('/api/equipment-categories/weapon');
      for (var i=0;i<choice.length; i++){
        var object =  document.createElement('option')
        object.setAttribute("value", choice[i].url)
        object.textContent = choice[i].name
        object.setAttribute('id', choice[i].index);
           myChoice.append(object);
      }
     /* choice.forEach(element => {
          var object =  document.createElement('option').value(element.url).innerHTML(element.name).setAttribute('id', element.index)
           myChoice.append(object);
      });*/
      form.append(myChoice);
      const delBtnEl = document.createElement('i');
      //adds delete button.
      delBtnEl.setAttribute("id", "delBnt");
      delBtnEl.setAttribute('class',
        'deletebutton'
      );
      delBtnEl.addEventListener('click', deleteItem);
      form.append(delBtnEl);
      //adds save bnt
      const saveBnt = document.createElement('i');
      saveBnt.setAttribute("id", "smallSavBnt");
      saveBnt.setAttribute('class',
        'savebutton'
      );
      saveBnt.setAttribute('type',"submit");
      saveBnt.addEventListener('submit', createWeaponBlock(myChoice.value));
      form.append(saveBnt);
      weaponBlock.append(form);
  };
  
  //creats spell selection form.
  const newSpell = async () =>  {
    var form = document.createElement('<form>');
    form.setAttribute('value', genID());
    var myChoice = document.createElement('<select>');
    myChoice.setAttribute('required');
    myChoice.setAttribute('class', 'sellection');
    let choice = await getItem('/api/equipment-categories/weapon');
    choice.array.forEach(element => {
      myChoice.append(
         document.createElement('option').val(element.url).html(element.name).id(element.index)
       );
    });
    form.append(myChoice);
    const delBtnEl = document.createElement('i');
    //adds delete button.
    delBtnEl.setAttribute("id", "delBnt");
    delBtnEl.setAttribute('class',
      //add style
    );
    document.querySelector('#delBnt').addEventListener('click', deleteItem);
    form.append(delBtnEl);
    const saveBnt = document.createElement('i');
    saveBnt.setAttribute("id", "savBnt");
    saveBnt.setAttribute('class',
      //add style
    );
    saveBnt.setAttribute('type',"submit");
    document.querySelector('#savBnt').addEventListener('submit', createWeaponBlock(myChoice.val()));
    form.append(saveBnt);
    spellBlock.append(form);
  };
  //creats other selection form.
  const newOther = async () =>  {
    var form = document.createElement('<form>');
    form.setAttribute('value', genID());
    var myTitle = document.createElement('<input>');
    myTitle .setAttribute('type',"text");
    myTitle .setAttribute('placeholder','Title.')
    myTitle .setAttribute('required');
    myTitle .setAttribute('class', 'inputTitle');
    form.append(myTitle);
    var myDesc = document.createElement('<input>');
    myDesc.setAttribute('type',"text");
    myDesc.setAttribute('placeholder','Description')
    myDesc.setAttribute('required');
    myDesc.setAttribute('class', 'inputDesc');
    form.append(myDesc);
    const delBtnEl = document.createElement('i');
    //adds delete button.
    delBtnEl.setAttribute("id", "delBnt");
    delBtnEl.setAttribute('class',
      //add style
    );
    document.querySelector('#delBnt').addEventListener('click', deleteItem);
    form.append(delBtnEl);
    //adds saveBnt
    const saveBnt = document.createElement('i');
      saveBnt.setAttribute("id", "savBnt");
      saveBnt.setAttribute('class',
        //add style
      );
      saveBnt.setAttribute('type',"submit");
      document.querySelector('#savBnt').addEventListener('submit', createWeaponBlock(form.getAttribute('id')));
  
    form.append(saveBnt);
    spellBlock.append(div);
  };
  
  const saveWeapons = async(e) => {
    e.stopPropagation();
    let currentWeapons = [];
  await document.querySelectorAll('.weaponSlab').map( () => {
    let wName = this.childElement.getAttribute('name');
    let wDamage = this.value();
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
  await document.querySelectorAll('.spellSlab').map( () => {
    let sName = this.childElement.getAttribute('name');
    let sDamage = this.value();
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
  await document.querySelectorAll('.otherSlab').map( () => {
    let oName = this.childElement.getAttribute('name');
    let oDamage = this.value();
    let oId = this.getAttribute('id')
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
  await document.querySelectorAll('.otherSlab').map( () => {
    let oId = this.getAttribute('id');
    currentOther.push(oId);
  })
  //gets spells name
  let currentSpells = [];
  await document.querySelectorAll('.spellSlab').map( () => {
    let sName = this.childElement.getAttribute('name');
    currentSpells.push(sName);
  });
    // gets weapons names
    let currentWeapons = [];
  await document.querySelectorAll('.weaponSlab').map( () => {
    let wName = this.childElement.getAttribute('name');
    currentWeapons.push(wName);
  });
  //grabs needed info for post.
  let cname = document.querySelector('#characterName').value.trim();
  let campaignName= document.querySelector('#campaignName').value.trim();
  let cclass= document.querySelector('#class').value.trim();
  let cLevel= document.querySelector('#level').value.trim();
  let crace= document.querySelector('#race').value.trim();
  let chp= document.querySelector('#hitpoints').value.trim();
  let armorClass= document.querySelector('#armorClass').value.trim();
  let cinitiative= document.querySelector('#initiative').value.trim();
  let cspeed= document.querySelector('#speed').value.trim();
  let cstrength= document.querySelector('#str').value.trim();
  let cdexterity= document.querySelector('#dex').value.trim();
  let cconstitution= document.querySelector('#con').value.trim();
  let cintelligence= document.querySelector('#int').value.trim();
  let cwisdom= document.querySelector('#wis').value.trim();
  let ccharisma= document.querySelector('#cha').value.trim();
  if (charID && cname && campaignName && cclass && cLevel && crace && chp && armorClass && cinitiative &&
    cspeed && cstrength && cdexterity && cconstitution && cintelligence && cwisdom && ccharisma) {
    const response = await fetch(`/api/characters/newcharacter`, {
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
  newWeaponButton.addEventListener('click',newWeapon);
  newSpellButton.addEventListener('click',newSpell);
  newOtherButton.addEventListener('click',newOther);
  savebnt.addEventListener('click',saveCharacter);