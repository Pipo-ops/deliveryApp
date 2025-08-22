export class Dish {
  id?: string;
  category: string;
  name: string;
  text: string;
  price: number;
  imageUrl: string;
  restaurantId: string;
  categoryOrder: number;

  constructor(obj?: any) {
    this.id = obj?.id || '';
    this.category = obj?.category || '';
    this.name = obj?.name || '';
    this.text = obj?.text || '';
    this.price = obj?.price || 0;
    this.imageUrl = obj?.imageUrl || '';
    this.restaurantId = obj?.restaurantId || '';
    this.categoryOrder = obj?.categoryOrder || 0;
  }
}