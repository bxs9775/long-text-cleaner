// imports
const yargs = require("yargs");

const IOHelper = require("./IOHelper");
const LongTextReader = require('./LongTextReader');

function main(){
    // Check args
    const { argv } = yargs(process.argv);
    if(!argv.filepath){
        console.error("base filepath not provided");
        process.exit(1);
    }
    if(!argv.name){
        console.error("name not provided");
        process.exit(1);
    }

    // create output files
    let ioHelper = new IOHelper(argv.name);
    let json = ioHelper.loadJson(argv.filepath);

    let cleaned_text = {};
    let one_grams = {};

    for(let entry of Object.entries(json)){
        
        let [key, text] = entry

        // clean json text using LongTextReader
        let reader = new LongTextReader(text);
        reader.clean();
        reader.oneGrams();
        cleaned_text[key] = reader.text['cleaned']
        one_grams[key] = reader.onegram_dict
    }
    console.log(cleaned_text)
    
    let report = {
        "text": cleaned_text,
        "onegram_dict": one_grams
    }
    ioHelper.saveJsonResults(report);
}

main();