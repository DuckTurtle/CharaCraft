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
module.exports = API;