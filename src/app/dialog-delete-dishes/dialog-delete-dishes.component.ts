import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  Firestore,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Dish } from '../../models/dish.class';

@Component({
  selector: 'app-dialog-delete-dishes',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatCardModule],
  templateUrl: './dialog-delete-dishes.component.html',
  styleUrl: './dialog-delete-dishes.component.scss',
})
export class DialogDeleteDishesComponent implements OnInit {
  firestore: Firestore = inject(Firestore);

  dishesByCategory: { [key: string]: any[] } = {};
  restaurantId: string = '';
  loading = false;

  getCategoryKeys(): string[] {
    return Object.keys(this.dishesByCategory);
  }

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteDishesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.restaurantId = data.restaurantId;
  }

  async ngOnInit() {
    const dishRef = collection(this.firestore, 'dishes');
    const q = query(dishRef, where('restaurantId', '==', this.restaurantId));
    const snap = await getDocs(q);
    const allDishes: Dish[] = snap.docs.map(
      (doc) => new Dish({ ...doc.data(), id: doc.id })
    );

    for (const dish of allDishes) {
      const cat = dish.category || 'Unbekannt';
      if (!this.dishesByCategory[cat]) this.dishesByCategory[cat] = [];
      this.dishesByCategory[cat].push(dish);
    }
  }

  async deleteDish(dishId: string) {
    if (!dishId) {
      console.error('Ungültige Dish-ID:', dishId);
      return;
    }

    this.loading = true;
    try {
      const dishDocRef = doc(this.firestore, `dishes/${dishId}`);
      await deleteDoc(dishDocRef);

      for (const cat in this.dishesByCategory) {
        this.dishesByCategory[cat] = this.dishesByCategory[cat].filter(
          (d) => d.id !== dishId
        );
        if (this.dishesByCategory[cat].length === 0) {
          delete this.dishesByCategory[cat];
        }
      }
    } catch (e) {
      console.error('Fehler beim Löschen:', e);
    } finally {
      this.loading = false;
    }
  }

  close() {
    this.dialogRef.close();
  }
}
