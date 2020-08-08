// Nurturizer
// We out here

const axios = require('axios');
const atob = require('atob');
const fs = require('fs');

console.log('Gang');
console.log('Get uil obfuscated');
axios.get('https://nurtu.re/assets/data/uil.json')
    .then(res => {
        const configObfusc = res.data;
        const configDeobfusc = {};
        console.log('uil with type', typeof configObfusc);

        if (configObfusc.length === 0) return new Error('Couldn\'t get obfuscated uil.');
        if (typeof configObfusc !== 'object') return new Error('Retrieved invalid response for obfusc uil.');
        
        const keysObfusc = Object.keys(configObfusc);
        console.log(`uil has ${keysObfusc.length} entries`);

        // ⎌ 
        console.log('make readable');
        keysObfusc.forEach(key => {
            console.log(key, atob(key));
            if (key === '_e') return configDeobfusc[key] = (typeof configObfusc[key] === 'string' ? atob(configObfusc[key]) : configObfusc[key]);
            configDeobfusc[atob(key)] = (typeof configObfusc[key] === 'string' ? atob(configObfusc[key]) : configObfusc[key]);
        });

        // 🔙🔛🔝
        console.log('write to file');
        fs.unlink('./deobfusc-uil.json', () => fs.writeFile('./deobfusc-uil.json', JSON.stringify(configDeobfusc, null, 2), () => console.log('ok')))
    })
    .catch(e => console.error(`Error in promise chain: ${e.message}`));