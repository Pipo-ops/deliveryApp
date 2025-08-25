import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class BasketService {
  private items: BasketItem[] = [];

  private itemsSubject = new BehaviorSubject<BasketItem[]>([]);
  basketItems$ = this.itemsSubject.asObservable();

  private openBasketSubject = new Subject<void>();
  openBasket$ = this.openBasketSubject.asObservable();

  triggerOpenBasket() {
    this.openBasketSubject.next();
  }

  addItem(newItem: BasketItem) {
    const existingItem = this.items.find((item) => item.name === newItem.name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ ...newItem, quantity: 1 });
    }

    this.itemsSubject.next(this.items);
    this.triggerOpenBasket();
  }

  increaseQuantity(item: BasketItem) {
    item.quantity += 1;
    this.itemsSubject.next(this.items);
  }

  decreaseQuantity(item: BasketItem) {
    item.quantity -= 1;
    if (item.quantity <= 0) {
      this.items = this.items.filter((i) => i !== item);
    }
    this.itemsSubject.next(this.items);
  }

  clearBasket() {
    this.items = [];
    this.itemsSubject.next([]);
  }

  getTotal(): number {
    return this.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }
}

export interface BasketItem {
  name: string;
  price: number;
  quantity: number;
}

