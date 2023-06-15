const API = require('../../api/dnd');

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