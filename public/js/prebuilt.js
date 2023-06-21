const weaponBlock = document.getElementById('weapondiv');
const spellBlock = document.getElementById('spelldiv');
const otherBlock = document.getElementById('otherdiv');
const newWModal = document.getElementById('newWeapon');
const init = () => {
  loadList();
}

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
  const getfirst = async (call) =>{
      const item = call
    let got = await getCall(item)
    console.log(got);
          const gotThings = got.equipment.map(({index, name, url}) => ({
              index: index,
              name: name,
              value: url
          }));
          console.log(gotThings);
          return gotThings;
  };
  const getspell = async (call) =>{
    const item = call
  let got = await getCall(item)
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
      if(itemInfo.damage.damage_dice===undefined){
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
    discription.append(div);
    div.append(title);
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
const loadList = async () => {
    var theChoice =  document.getElementById('spell-select');
    let spellChoice = await getspell('/api/spells');
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