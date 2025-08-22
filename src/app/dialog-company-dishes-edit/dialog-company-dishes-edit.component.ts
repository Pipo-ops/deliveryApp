import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { Dish } from '../../models/dish.class';

@Component({
  selector: 'app-dialog-company-dishes-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatButtonModule,
  ],
  templateUrl: './dialog-company-dishes-edit.component.html',
  styleUrl: './dialog-company-dishes-edit.component.scss',
})
export class DialogCompanyDishesEditComponent {
  firestore: Firestore = inject(Firestore);
  storage: Storage = inject(Storage);

  dish = new Dish();
  loading = false;
  selectedFile!: File;
  selectedFileName: string | null = null;
  restaurantId: string;

  constructor(
    public dialogRef: MatDialogRef<DialogCompanyDishesEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.restaurantId = data.restaurantId;
  }

  capitalize(str: string): string {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  async saveDish() {
    this.loading = true;

    try {
      let imageUrl = this.dish.imageUrl || '';

      if (this.selectedFile) {
        const storageRef = ref(
          this.storage,
          `dishes/${this.selectedFile.name}`
        );
        await uploadBytes(storageRef, this.selectedFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      this.dish.category = this.capitalize(this.dish.category);
      this.dish.name = this.capitalize(this.dish.name);
      this.dish.text = this.capitalize(this.dish.text);

      this.dish.imageUrl = imageUrl;
      this.dish.restaurantId = this.restaurantId;

      const dishRef = collection(this.firestore, 'dishes');
      await addDoc(dishRef, { ...this.dish });
    } catch (error) {
      console.error('Fehler beim Speichern des Dishes:', error);
    } finally {
      this.loading = false;
      this.dialogRef.close();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
