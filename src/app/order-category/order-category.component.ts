import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DialogRestaurantComponent } from '../dialog-restaurant/dialog-restaurant.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import {
  Firestore,
  doc,
  deleteDoc,
  getDoc
} from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { DialogEditRestaurantComponent } from '../dialog-edit-restaurant/dialog-edit-restaurant.component';
import { query, where, collectionData, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-order-category',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    RouterModule,
    DialogRestaurantComponent,
    CommonModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './order-category.component.html',
  styleUrl: './order-category.component.scss',
})
export class OrderCategoryComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  restaurant$!: Observable<any[]>;

  route = inject(ActivatedRoute);
  categoryName: string = '';
  categoryId!: string;

  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit() {
  this.categoryId = this.route.snapshot.paramMap.get('id') || '';

  const categoryDocRef = doc(this.firestore, `categories/${this.categoryId}`);
  getDoc(categoryDocRef).then(docSnap => {
    if (docSnap.exists()) {
      this.categoryName = docSnap.data()['catagoryName'];
    }
  });

  const restaurantRef = collection(this.firestore, 'restaurant');
  const q = query(restaurantRef, where('categoryId', '==', this.categoryId));
  this.restaurant$ = collectionData(q, { idField: 'id' });
}

  openDialog() {
    const dialogRef = this.dialog.open(DialogRestaurantComponent, {
      data: { categoryId: this.categoryId },
    });

    dialogRef.afterClosed().subscribe(() => this.ngOnInit());
  }

  editRestaurant(restaurant: any) {
    const dialogRef = this.dialog.open(DialogEditRestaurantComponent, {
      data: { restaurant, categoryId: this.categoryId },
    });

    dialogRef.afterClosed().subscribe(() => this.ngOnInit());
  }

  async deleteRestaurant(id: string) {
    try {
      const restaurantDocRef = doc(this.firestore, `restaurant/${id}`);
      await deleteDoc(restaurantDocRef);
    } catch (error) {
      console.error('Fehler beim Löschen des Restaurants:', error);
    }
  }
}
