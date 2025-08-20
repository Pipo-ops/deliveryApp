import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DialogRestaurantComponent } from '../dialog-restaurant/dialog-restaurant.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';

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
  categoryId!: string;
  

  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    const catagoryRef = collection(this.firestore, 'restaurant');
    this.restaurant$ = collectionData(catagoryRef, { idField: 'id' });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogRestaurantComponent);
    dialogRef.afterClosed().subscribe(() => this.ngOnInit());
  }

}
