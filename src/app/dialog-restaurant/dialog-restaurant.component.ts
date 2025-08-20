import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';
import { inject } from '@angular/core';
import { Restaurant } from '../../models/restaurant.class';

@Component({
  selector: 'app-dialog-restaurant',
  standalone: true,
  imports: [
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    MatProgressBarModule,
    CommonModule,
  ],
  templateUrl: './dialog-restaurant.component.html',
  styleUrl: './dialog-restaurant.component.scss',
})
export class DialogRestaurantComponent {
  firestore: Firestore = inject(Firestore);
  storage: Storage = inject(Storage);

  restaurant = new Restaurant();
  selectedFile!: File;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogRestaurantComponent>) {}

  selectedFileName: string | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;
    }
  }

  capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  async saveRestaurant() {
    this.loading = true;
    this.restaurant.restaurantName = this.capitalize(
      this.restaurant.restaurantName
    );
    this.restaurant.address = this.capitalize(this.restaurant.address);
    this.restaurant.zipCode = this.restaurant.zipCode;
    this.restaurant.city = this.capitalize(this.restaurant.city);

    try {
      let imageUrl = '';

      if (this.selectedFile) {
        const storageRef = ref(
          this.storage,
          `restaurantLogo/${this.selectedFile.name}`
        );
        await uploadBytes(storageRef, this.selectedFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      const dataToSave = {
        restaurantName: this.restaurant.restaurantName,
        address: this.restaurant.address,
        zipCode: this.restaurant.zipCode,
        city: this.restaurant.city,
        imageUrl: imageUrl,
      };

      const restaurantCollection = collection(this.firestore, 'restaurant');
      await addDoc(restaurantCollection, dataToSave);
    } catch (error) {
      console.error('Error adding restaurant:', error);
    } finally {
      this.loading = false;
      this.dialogRef.close();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
