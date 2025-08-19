import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogCatagoryComponent } from '../dialog-catagory/dialog-catagory.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {

  constructor(public dialog: MatDialog, private router: Router) {
  }

  openDialog() {
    this.dialog.open(DialogCatagoryComponent)
  }
}
