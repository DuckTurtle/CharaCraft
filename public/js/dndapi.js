class API {
    async get(call){
        var dndAPI = "https://www.dnd5eapi.co" + call;
        let dataResults = fetch(dndAPI)
        .then(function(response){
            var results = response.json();
            console.log(results);
                return results;
            });
            let data = await dataResults;
            return data;
    };
    
};

class List {
    async getItem(call){
        const item = call
        API.get(item)
        .then(([rows])=> {
            let got = rows
            const gotThings = got.map(({name, url}) => ({
                name: name,
                value: url
            }));
            return gotThings
        })
    }
};
module.exports = List;