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
    let text = ioHelper.loadFile(argv.filepath);

    let reader = new LongTextReader(text);
    reader.clean();
    reader.oneGrams();

    let report = reader.getReport();
    
    ioHelper.saveResults(report);
}

main();