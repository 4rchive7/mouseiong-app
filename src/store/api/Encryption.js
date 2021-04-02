export class Encryption {

    #SECRET_KEY = 'SungName@@';
    
    constructor(raw_data){
        this._raw_data = raw_data;
    }

    encrypt = () => {
        
    }
    get getEncryptedData(){
        return this.#SECRET_KEY;
    }

}