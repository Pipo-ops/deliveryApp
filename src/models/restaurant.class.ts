export class Restaurant{
    id?: string;
    restaurantName: string;
    address: string;
    zipCode: number;
    city: string;
    imageUrl: string;

    constructor(obj?: any) {
        this.id = obj?.id || '';
        this.restaurantName = obj ? obj.restaurantName :'';
        this.address = obj ? obj.address :'';
        this.zipCode = obj ? obj.zipCode :'';
        this.city = obj ? obj.city :'';
        this.imageUrl = obj?.imageUrl || '';
    }
}