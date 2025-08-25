import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DialogCompanyDishesEditComponent } from '../dialog-company-dishes-edit/dialog-company-dishes-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { query, where, collection, getDocs } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { Dish } from '../../models/dish.class';
import { DialogDeleteDishesComponent } from '../dialog-delete-dishes/dialog-delete-dishes.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BasketService } from '../services/basket.service';

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    CommonModule,
    RouterModule,
    MatCardModule,
    MatSidenavModule,
  ],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.scss',
})
export class RestaurantComponent implements OnInit {
  firestore: Firestore = inject(Firestore);

  restaurantId!: string;
  restaurantData: any;

  dishesByCategory: { [key: string]: any[] } = {};
  categoryOrder: string[] = [];
  categoryDisplayNames: { [key: string]: string } = {};

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private basketService: BasketService
  ) {}

  basketOpened = false;

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.paramMap.get('id') || '';
    if (this.restaurantId) {
      this.loadRestaurantData(this.restaurantId);
      this.loadDishes();
    }
  }

  normalizeCategory(cat: string): string {
    return cat.trim().toLowerCase();
  }

  async loadRestaurantData(id: string) {
    const restaurantDocRef = doc(this.firestore, `restaurant/${id}`);
    const docSnap = await getDoc(restaurantDocRef);
    if (docSnap.exists()) {
      this.restaurantData = docSnap.data();
    } else {
      console.warn('Restaurant nicht gefunden');
    }
  }

  async loadDishes() {
    const dishRef = collection(this.firestore, 'dishes');
    const q = query(dishRef, where('restaurantId', '==', this.restaurantId));
    const dishSnap = await getDocs(q);

    const allDishes: Dish[] = dishSnap.docs.map((doc) => {
      return new Dish({ id: doc.id, ...doc.data() });
    });

    this.dishesByCategory = {};

    for (const dish of allDishes) {
      const catKey = this.normalizeCategory(dish.category || 'Unbekannt');

      if (!this.dishesByCategory[catKey]) {
        this.dishesByCategory[catKey] = [];
        this.categoryDisplayNames[catKey] = dish.category;
      }

      this.dishesByCategory[catKey].push(dish);
    }

    this.categoryOrder = Object.keys(this.dishesByCategory);
  }

  getUniqueCategories(dishes: any[]): string[] {
    return [...new Set(dishes.map((d) => d.category))];
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogCompanyDishesEditComponent, {
      data: { restaurantId: this.restaurantId },
    });

    dialogRef.afterClosed().subscribe(() => this.loadDishes());
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DialogDeleteDishesComponent, {
      data: { restaurantId: this.restaurantId },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadDishes();
    });
  }

  addToBasket(dish: Dish) {
    this.basketService.addItem({
      name: dish.name,
      price: dish.price,
      quantity: 1,
    });
  }
}
