export class Catagory{
    id: string;
    catagoryName: string;

    constructor(obj?: any) {
        this.id = obj?.id || '';
        this.catagoryName = obj ? obj.catagoryName :'';
    }
}