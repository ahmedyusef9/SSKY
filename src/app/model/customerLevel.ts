
import {Level} from '../model/level';
export class customerLevel extends Level{
    private flag:number;
    constructor(){
        super();
        this.flag = 1;
        this.id = 4;
        this.name= "consumer";
        this.description= "לקוח";

    }
}