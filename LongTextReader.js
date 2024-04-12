class LongTextReader{
    constructor(text){
        this.text = {raw: text};
        this.onegram_list = [];
        this.onegram_dict = {};
    }

    clean(){
        let cleaned_text = `${this.text['raw']}`;

        // remove starting space
        cleaned_text = cleaned_text.replace(/^\s+/i,"");

        // cleaning quotation marks
        cleaned_text = cleaned_text.replace(/["＂“”‟″‶〃‎״‎ʺˮײ‎]/gi,"''");
        cleaned_text = cleaned_text.replace(/[՝＇‘’‛′‵՚]/gi,"'");

        // cleaning dashes
        cleaned_text = cleaned_text.replace(/;?-{2,4}/gi,"---");

        // remove underscores used for emphasis
        cleaned_text = cleaned_text.replace(/[__]/gi,"");
        
        // cleaning space around special characters
        cleaned_text = cleaned_text.replace(/([^\w\s-])/gi," $1 ");
        cleaned_text = cleaned_text.replace(/(-+)/gi," $1 ");
        cleaned_text = cleaned_text.replace(/' s/gi," 's");

        // cleaning whitespace
        cleaned_text = cleaned_text.replace(/\s+/gi," ");

        // save cleaned text
        this.text['cleaned'] = cleaned_text;
        
        return this.text['cleaned'];
    }

    oneGrams(){
        this.onegram_list = this.text['cleaned'].split(' ');

        this.onegram_dict = {};

        this.onegram_list.forEach((val) => {
            if(this.onegram_dict[val]){
                this.onegram_dict[val]++;
            } else {
                this.onegram_dict[val] = 1;
            }
        })
    }

    getReport(){
        return {
            text: this.text['cleaned']+"\n",
            onegram_list: this.onegram_list,
            onegram_dict: this.onegram_dict
        }
    }
}

module.exports = LongTextReader;