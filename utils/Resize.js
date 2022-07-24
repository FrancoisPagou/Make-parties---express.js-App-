const sharp = require('sharp');
const {uuidv4} = require('uuid');
const path = require('path');

class Resize {
    constructor(folder) {
        this.folder = folder;
    }

    async save(buffer, filename) {
        const filepath = this.filepath(filename);

        await sharp(buffer)
        .resize(300, 300, {
            fit: sharp.fit.inside,
            withoutEnlargement: true
        })
        .toFile(filepath);
        
        return filename;
    }

    filepath(filename) {
        return path.resolve(`${this.folder}/${filename}`)
    }
}
module.exports = Resize;