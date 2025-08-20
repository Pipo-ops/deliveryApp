import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { DialogCatagoryComponent } from '../dialog-catagory/dialog-catagory.component';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { OrderCategoryComponent } from '../order-category/order-category.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatDialogModule,
    OrderCategoryComponent,
    RouterModule,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  categories$!: Observable<any[]>;

  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    const catagoryRef = collection(this.firestore, 'categories');
    this.categories$ = collectionData(catagoryRef, { idField: 'id' });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogCatagoryComponent);
    dialogRef.afterClosed().subscribe(() => this.ngOnInit());
  }
}
