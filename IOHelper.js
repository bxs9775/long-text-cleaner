var fs = require("fs");

class IOHelper{
    constructor(folderName){
        this.folderName = folderName
    }

    loadFile(filepath){
        try{
            const data = fs.readFileSync(filepath,'utf-8');
            return data;
        } catch(e){
            return '';
        }
    }

    saveResults(report){
        //console.log(report);
        let folderPath = `.\\results\\${this.folderName}`
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        fs.writeFileSync(`${folderPath}\\${this.folderName}_cleaned.txt`,report.text)
        fs.writeFileSync(`${folderPath}\\${this.folderName}_narrativetimeseries.txt`,report.onegram_list.join('\n'))
        
        let gramCounts = Object.entries(report.onegram_dict)
        .sort((a,b) => b[1] - a[1])
        .map(entry => entry.join('\t'))
        .join('\n');

        fs.writeFileSync(`${folderPath}\\${this.folderName}_1grams.txt`,gramCounts)
    }
}

module.exports = IOHelper;