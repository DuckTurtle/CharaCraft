
const weaponBlock = document.getElementById('weapondiv');
const spellBlock = document.getElementById('spelldiv');
const otherBlock = document.getElementById('otherdiv');
const newWModal = document.getElementById('newWeapon');
const init = () => {
  loadList();
};

function genID() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}
//api call

const getCall = async (call) => {
  var dndAPI = "https://www.dnd5eapi.co" + call;
  let dataResults = await fetch(dndAPI).then(function (response) {
    var results = response.json();
    console.log(results);
    return results;
  });
  let data = await dataResults;
  console.log(data);
  return data;
};

//takes api call and converts it to list
const getfirst = async (call) => {
  const item = call;
  let got = await getCall(item);
  console.log(got);
  const gotThings = got.equipment.map(({ index, name, url }) => ({
    index: index,
    name: name,
    value: url,
  }));
  console.log(gotThings);
  return gotThings;
};
const getspell = async (call) => {
  const item = call;
  let got = await getCall(item);
  console.log(got);
  const gotThings = got.map(({ index, name, url }) => ({
    index: index,
    name: name,
    value: url,
  }));
  console.log(gotThings);
  return gotThings;
};
const getItem = async (call) => {
  const item = call;
  let got = await getCall(item);
  console.log(got);
        const gotThings = got.results.map(({index, name, url}) => ({
            index: index,
            name: name,
            value: url
        }));
        console.log(gotThings);
        return gotThings;
};
const getItem = async (call) =>{
  const item = call
let got = await getCall(item);
      console.log(got);
      return got;
};
  
  const deleteItem = (e) => {
      e.stopPropagation();
      const item = e.target;
      const formid = item.parentElement;
      formid.remove();
    };
    
  
    //grabs item with e then collects its data and creates a weapon div.
    const createWeaponBlock = async (event) =>{
      event.preventDefault()
      event.stopPropagation()
      //deletes old form and relaces with info.
      const item = document.getElementById('weapon-select')
      const wName = item.value;
      //api call to get info.
      const itemInfo =  await getItem(wName);
      //creates the weapon block
      var div = document.createElement('tr');
      div.setAttribute('class',"weaponSlab gethoverd")
      var title = document.createElement('th');
      title.textContent = itemInfo.name;
      title.setAttribute("name",`${itemInfo.name}`)
      title.setAttribute('scope',"row");
      var discription = document.createElement('td'); 
        //discription.setAttribute("class","hoverinfo");
      if(undefined == itemInfo.damage){
        discription.textContent = `${itemInfo.desc[1]} ${itemInfo.desc[2]}`;
      } else {
        discription.textContent = itemInfo.damage.damage_dice;
      }
      //on hover function that displays damage info
      div.append(title);
      div.append(discription);
      const delBtnEl = document.createElement('i');
      //adds delete button.
      delBtnEl.setAttribute("id", "delBnt");
      delBtnEl.setAttribute('class','bi bi-trash');
      delBtnEl.addEventListener('click', deleteItem);
      title.append(delBtnEl);
      title.append(delBtnEl);
      weaponBlock.append(div);
    };
  
  //creates spell card.
  const createSpellBlock = async (e) =>{
    e.stopPropagation();
    //deletes old form and relaces with info.
    const item = document.getElementById('spell-select')
    const wName = item.value;
    console.log(wName)
    //api call to get info.
    const itemInfo =  await getItem(wName);
    var div = document.createElement('tr');
    div.setAttribute('class',"spellSlab gethoverd")
    var title = document.createElement('th');
    title.textContent = itemInfo.name;
    title.setAttribute('scope',"row");
    var discription = document.createElement('td'); 
    discription.textContent = `${itemInfo.range} ${itemInfo.desc[0]}`
    div.append(title);
    div.append(discription);
    //adds delete button.
    const delBtnEl = document.createElement('i');
      //adds delete button.
      delBtnEl.setAttribute("id", "delBnt");
      delBtnEl.setAttribute('class','bi bi-trash');
      delBtnEl.addEventListener('click', deleteItem);
    title.append(delBtnEl);
     spellBlock.append(div);
  };
  //creats new other block.
  const createOtherBlock = async (e) =>{
    e.stopPropagation();
    //deletes old form and relaces with info.
    const name = document.getElementById('otherTitle').value;
    const desc = document.getElementById('otherDec').value;
    const formid = genID();
  //creates the spell block
    var div =  document.createElement('tr');
    div.setAttribute("id", formid);
    div.setAttribute('class', "otherSlab")
    var title =  document.createElement('th');
    title.textContent = name ;
    title.setAttribute('scope',"row");
    var discription =  document.createElement('td'); 
    discription.textContent = desc ;
    div.append(title);
    div.append(discription);
    //adds delete button.
    const delBtnEl = document.createElement('i');
      //adds delete button.
      delBtnEl.setAttribute("id", "delBnt");
      delBtnEl.setAttribute('class','bi bi-trash');
      delBtnEl.addEventListener('click', deleteItem);
      div.append(delBtnEl);
     otherBlock.append(div);
     name.textContent = ""
     desc.textContent = ""
  };
  
  const saveWeapons = async () => {
  var wep = document.querySelectorAll('.weaponSlab');
  await wep.forEach(()=> {
    console.log(wep)
    let wName = wep[0].children[0].innerText
    let wDamage = wep[0].children[1].innerText
    const sendEM = async () => {
     await fetch('api/weapons/',{
      method: 'POST',
      body: JSON.stringify({wName, wDamage}),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (sendEM.ok) {
      console.log('Weapons saved');
    } else {
      alert('Failed to Save Character');
    }
  }})
   };
  const saveSpells = async(e) => {
    var wep = document.querySelectorAll('.spellSlab');
    await wep.forEach(()=> {
      console.log(wep)
      let wName = wep[0].children[0].innerText
      let sDec = wep[0].children[1].innerText
      const sendEM = async () => {
       await fetch('api/spells/',{
        method: 'POST',
        body: JSON.stringify({wName, sDec}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (sendEM.ok) {
        console.log('spells saved');
      } else {
        alert('Failed to Save Character');
      }
    }})
     };
  const saveOther = async(e) => {
    var wep = document.querySelectorAll('.otherSlab');
    await wep.forEach(()=> {
      console.log(wep)
      let id = wep[0].id
      let wName = wep[0].children[0].innerText
      let sDec = wep[0].children[1].innerText
      const sendEM = async () => {
       await fetch('api/other/',{
        method: 'POST',
        body: JSON.stringify({id, wName, sDec}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (sendEM.ok) {
        console.log('spells saved');
      } else {
        alert('Failed to Save Character');
      }}
    })
     };


const loadList = async () => {
  var theChoice =  document.getElementById('weapon-select');
    let spellChoice = await getfirst('/api/spells');
      for (var i=0;i<spellChoice.length; i++){
        var object =  document.createElement('option')
        object.setAttribute("value", spellChoice[i].value)
        object.textContent = spellChoice[i].name
        object.setAttribute('id', spellChoice[i].index);
           theChoice.append(object);
      };
  
    var myChoice =  document.getElementById('weapon-select');
    let choice = await getfirst('/api/equipment-categories/weapon');
    for (var i=0;i<choice.length; i++){
      var object =  document.createElement('option')
      object.setAttribute("value", choice[i].value);
      object.textContent = choice[i].name;
      object.setAttribute('id', choice[i].index);
         myChoice.append(object);
    }
  }
  const saveToDB = async(e) => {
    //gets others name
    let currentOther = [];
  await document.querySelectorAll('.otherSlab').map( () => {
    let oId = this.getAttribute('id');
    currentOther.push(oId);
  });
  //gets spells name
  let currentSpells = [];
  document.querySelectorAll(".spellSlab").forEach((el) => {
    let sName = el.childElement.getAttribute("name");
    currentSpells.push(sName);
  });
  // gets weapons names
  let currentWeapons = [];
  document.querySelectorAll(".weaponSlab").forEach((el) => {
    let wName = el.childElement.getAttribute("name");
    currentWeapons.push(wName);
  });
  //grabs needed info for post.
  let cname = document.querySelector("#character").textContent.trim();
  let campaignName = document.querySelector("#campaignName").textContent.trim();
  let cclass = document.querySelector("#class").textContent.trim();
  let cLevel = document.querySelector("#level").textContent.trim();
  let crace = document.querySelector("#race").textContent.trim();
  let chp = document.querySelector("#hitpoints.statWidth").value.trim();
  let armorClass = document.querySelector("#armor.statWidth").value.trim();
  let cinitiative = document
    .querySelector("#initiative.statWidth")
    .value.trim();
  let cspeed = document.querySelector("#speed.statWidth").value.trim();
  let cstrength = document.querySelector("#str").textContent.trim();
  let cdexterity = document.querySelector("#dex").textContent.trim();
  let cconstitution = document.querySelector("#con").textContent.trim();
  let cintelligence = document.querySelector("#int").textContent.trim();
  let cwisdom = document.querySelector("#wis").textContent.trim();
  let ccharisma = document.querySelector("#cha").textContent.trim();
  if (
    cname &&
    campaignName &&
    cclass &&
    cLevel &&
    crace &&
    chp &&
    armorClass &&
    cinitiative &&
    cspeed &&
    cstrength &&
    cdexterity &&
    cconstitution &&
    cintelligence &&
    cwisdom &&
    ccharisma
  ) {
    const response = await fetch(`/api/characters/newcharacter`, {
      method: "POST",
      body: JSON.stringify({
        cname,
        campaignName,
        cclass,
        cLevel,
        crace,
        chp,
        armorClass,
        cinitiative,
        cspeed,
        cstrength,
        cdexterity,
        cconstitution,
        cintelligence,
        cwisdom,
        ccharisma,
        currentSpells,
        currentWeapons,
        currentOther,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("Character saved");
    } else {
      alert("Failed to Save Character");
    }
  }
};


init();
const saveCharacter = async (e) => {
  e.stopPropagation();
  await saveWeapons();
  await saveOther();
  await saveSpells();
  await saveToDB();
  
};
init();
document
.getElementById('saveWeapon')
.addEventListener('click', createWeaponBlock);
document
.getElementById('saveSpell')
.addEventListener('click', createSpellBlock);
document
.getElementById('saveOther')
.addEventListener('click', createOtherBlock);
document
.getElementById('saveCharacterBtn')
.addEventListener('click', saveCharacter);

