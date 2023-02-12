import fs from 'fs';

class FileManager {
    constructor(file){
        this.file = `${process.cwd()}/src/files/${file}`
    }

    async loadItems(){
        if(fs.existsSync(this.file)){
            const data = await fs.promises.readFile(this.file, 'utf8');
            const items = JSON.parse(data);
            return items;
        }
        return "El archivo no existe";
    }   
}