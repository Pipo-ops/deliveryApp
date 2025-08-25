import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import {
  Firestore,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';
import { inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Restaurant } from '../../models/restaurant.class';

@Component({
  selector: 'app-dialog-edit-restaurant',
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
  templateUrl: './dialog-edit-restaurant.component.html',
  styleUrl: './dialog-edit-restaurant.component.scss',
})
export class DialogEditRestaurantComponent {
  firestore: Firestore = inject(Firestore);
  storage: Storage = inject(Storage);

  constructor(
    public dialogRef: MatDialogRef<DialogEditRestaurantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.restaurant = new Restaurant(data.restaurant);
    this.restaurant.id = data.restaurant.id;
  }

  selectedFile!: File;
  loading = false;
  restaurant!: Restaurant;
  selectedFileName: string | null = null;

  capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;
    }
  }

  async saveRestaurant() {
    this.loading = true;

    try {
      let imageUrl = this.restaurant.imageUrl;

      if (this.selectedFile) {
        const storageRef = ref(
          this.storage,
          `restaurantLogo/${this.selectedFile.name}`
        );
        await uploadBytes(storageRef, this.selectedFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      const dataToSave = {
        restaurantName: this.capitalize(this.restaurant.restaurantName),
        address: this.capitalize(this.restaurant.address),
        zipCode: this.restaurant.zipCode,
        city: this.capitalize(this.restaurant.city),
        imageUrl: imageUrl,
      };

      const docRef = doc(this.firestore, `restaurant/${this.restaurant.id}`);
      await updateDoc(docRef, dataToSave);
    } catch (error) {
      console.error('Fehler beim Bearbeiten des Restaurants:', error);
    } finally {
      this.loading = false;
      this.dialogRef.close();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
