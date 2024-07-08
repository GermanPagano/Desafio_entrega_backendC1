
const fs = require('fs');

const verifyFileExist = (filePath) => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([], null, 2));
    }
}

const read = (filePath) => {
    verifyFileExist(filePath);
    const data = fs.readFileSync(filePath, 'utf-8');
    console.log('aca')
    return JSON.parse(data);
    
}

const write = (filePath, data) => {
    verifyFileExist(filePath);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

module.exports = {
    verifyFileExist,
    read,
    write
};