
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

const deleteItem = (e) => {
  e.stopPropagation();
  const item = e.target;
  const formid = JSON.parse(item.parentElement.getAttribute("id"));
  formid.remove();
};

//grabs item with e then collects its data and creates a weapon div.
const createWeaponBlock = async (event) => {
  event.preventDefault();
  event.stopPropagation();
  //deletes old form and relaces with info.
  const item = document.getElementById("weapon-select");
  const wName = item.value;
  //api call to get info.
  const itemInfo = await getItem(wName);
  //creates the weapon block
  var div = document.createElement("tr");
  div.setAttribute("class", "weaponSlab .gethoverd");
  var title = document.createElement("th");
  title.textContent = itemInfo.name;
  title.setAttribute("name", `${itemInfo.name}`);
  title.setAttribute("scope", "row");
  var discription = document.createElement("div");
  discription.setAttribute("class", "hoverinfo");
  console.log(itemInfo);
  if (itemInfo.damage.damage_dice === undefined) {
    discription.textContent = `${itemInfo.desc[1]} ${itemInfo.desc[2]}`;
  } else {
    discription.textContent = itemInfo.damage.damage_dice;
  }
  //on hover function that displays damage info

  div.append(discription);
  div.append(title);
  const delBtnEl = document.createElement("i");
  //adds delete button.
  delBtnEl.setAttribute("id", "delBnt");
  delBtnEl.setAttribute("class", "bi bi-trash");
  delBtnEl.addEventListener("click", deleteItem);
  div.append(delBtnEl);
  weaponBlock.append(div);
};

//creates spell card.
const createSpellBlock = async (e) => {
  e.stopPropagation();
  //deletes old form and relaces with info.
  const item = e.target;
  const wName = JSON.parse(item.siblings(".sellection").val());
  //api call to get info.
  const itemInfo = await getItem(wName);
  const formid = JSON.parse(item.parentElement.getAttribute("id"));
  formid.remove();
  //creates the spell block
  var div = document.createElement("tr");
  div.setAttribute("class", "spellSlab");
  var title = document.createElement("th");
  title.textContent(itemInfo.name);
  title.setAttribute("scope", "row");
  div.setAttribute("value", `${itemInfo.desc[1]} ${itemInfo.desc[2]}`);
  //on hover function that displays damage info
  div.addEventListener("mouseover", () => {
    var discription = document.createElement("div");
    var range = document.createElement("p");
    range.textContent(itemInfo.range);
    var dec = document.createElement("p");
    dec.textContent(itemInfo.desc[1]);
    div.setAttribute("class", "hoverinfo");
    discription.textContent(this.setAttribute("value"));
    discription.append(div);
  });
  title.append(div);
  //adds delete button.
  const delBtnEl = document.createElement("i");
  //adds delete button.
  delBtnEl.setAttribute("id", "delBnt");
  delBtnEl.setAttribute(
    "class"
    //add style
  );
  document.querySelector("#delBnt").addEventListener("click", deleteItem);
  div.append(delBtnEl);
  spellBlock.append(div);
};
//creats new other block.
const createOtherBlock = async (e) => {
  e.stopPropagation();
  //deletes old form and relaces with info.
  const item = e.target;
  const name = JSON.parse(item.siblings(".inputTitle").val());
  const desc = JSON.parse(item.siblings(".inputDesc").val());
  const formid = JSON.parse(item.parentElement.getAttribute("id"));
  formid.remove();
  //creates the spell block
  var div = document.createElement("tr");
  div.setAttribute("id", formid);
  div.setAttribute("class", "otherSlab");
  var title = document.createElement("th");
  title.textContent(name);
  title.setAttribute("scope", "row");
  div.setAttribute("value", desc);
  //on hover function that displays damage info
  div.addEventListener("mouseover", () => {
    var discription = document.createElement("div");
    div.setAttribute("class", "hoverinfo");
    discription.textContent(this.setAttribute("value"));
    discription.append(div);
  });
  title.append(div);
  //adds delete button.
  const delBtnEl = document.createElement("i");
  //adds delete button.
  delBtnEl.setAttribute("id", "delBnt");
  delBtnEl.setAttribute(
    "class"
    //add style
  );
  document.querySelector("#delBnt").addEventListener("click", deleteItem);
  div.append(delBtnEl);
  spellBlock.append(div);
};

//creats other selection form.
const newOther = async () => {
  var form = document.createElement("<form>");
  form.setAttribute("value", genID());
  var myTitle = document.createElement("<input>");
  myTitle.setAttribute("type", "text");
  myTitle.setAttribute("placeholder", "Title.");
  myTitle.setAttribute("required");
  myTitle.setAttribute("class", "inputTitle");
  form.append(myTitle);
  var myDesc = document.createElement("<input>");
  myDesc.setAttribute("type", "text");
  myDesc.setAttribute("placeholder", "Description");
  myDesc.setAttribute("required");
  myDesc.setAttribute("class", "inputDesc");
  form.append(myDesc);
  const delBtnEl = document.createElement("i");
  //adds delete button.
  delBtnEl.setAttribute("id", "delBnt");
  delBtnEl.setAttribute(
    "class"
    //add style
  );
  delBtnEl.addEventListener("click", deleteItem);
  form.append(delBtnEl);
  //adds saveBnt
  const saveBnt = document.createElement("i");
  saveBnt.setAttribute("id", "savBnt");
  saveBnt.setAttribute(
    "class"
    //add style
  );
  saveBnt.setAttribute("type", "submit");
  saveBnt.addEventListener("submit", createOtherBlock);

  form.append(saveBnt);
  spellBlock.append(div);
};

const saveWeapons = async (e) => {
  e.stopPropagation();
  let currentWeapons = [];
  await document
    .querySelectorAll(".weaponSlab")
    .map(() => {
      let wName = this.childElement.getAttribute("name");
      let wDamage = this.value();
      currentWeapons.push({
        name: wName,
        damage: wDamage,
      });
    })
    .then(() => {
      fetch("api/weapons", {
        method: "POST",
        body: currentWeapons,
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
};
const saveSpells = async (e) => {
  e.stopPropagation();
  let currentSpells = [];
  await document
    .querySelectorAll(".spellSlab")
    .map(() => {
      let sName = this.childElement.getAttribute("name");
      let sDamage = this.value();
      currentSpells.push({
        name: sName,
        damage: sDamage,
      });
    })
    .then(() => {
      fetch("api/spells", {
        method: "POST",
        body: currentspells,
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
};
const saveOther = async (e) => {
  e.stopPropagation();
  let currentOther = [];
  await document
    .querySelectorAll(".otherSlab")
    .map(() => {
      let oName = this.childElement.getAttribute("name");
      let oDamage = this.value();
      let oId = this.getAttribute("id");
      currentOther.push({
        id: oId,
        name: oName,
        damage: oDamage,
      });
    })
    .then(() => {
      fetch("api/other", {
        method: "POST",
        body: currentOther,
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
};


const loadList = async () => {
  /*var theChoice =  document.getElementById('weapon-select');
    let spellChoice = await getfirst('/api/spells');
      for (var i=0;i<spellChoice.length; i++){
        var object =  document.createElement('option')
        object.setAttribute("value", spellChoice[i].value)
        object.textContent = spellChoice[i].name
        object.setAttribute('id', spellChoice[i].index);
           theChoice.append(object);
      };*/

  var myChoice = document.getElementById("weapon-select");
  let choice = await getfirst("/api/equipment-categories/weapon");
  for (var i = 0; i < choice.length; i++) {
    var object = document.createElement("option");
    object.setAttribute("value", choice[i].value);
    object.textContent = choice[i].name;
    object.setAttribute("id", choice[i].index);
    myChoice.append(object);
  }
};
const saveToDB = async (e) => {
  e.stopPropagation();
  //gets others name
  let currentOther = [];
  document.querySelectorAll(".otherSlab").forEach((el) => {
    let oId = el.getAttribute("id");
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

const saveCharacter = async (e) => {
  e.stopPropagation();
  await saveWeapons();
  await saveOther();
  await saveSpells();
  await saveToDB();
};
init();
document

 document
 .getElementById('saveSpell')
 .addEventListener('click', createSpellBlock);
 document
 .getElementById('saveOther')
 .addEventListener('click', createOtherBlock);
 document
 .addEventListener('click', saveCharacter);

