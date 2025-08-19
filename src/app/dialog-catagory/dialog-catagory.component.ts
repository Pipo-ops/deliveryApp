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
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { inject } from '@angular/core';
import { Catagory } from '../../models/catagory.class';

@Component({
  selector: 'app-dialog-catagory',
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
  templateUrl: './dialog-catagory.component.html',
  styleUrl: './dialog-catagory.component.scss',
})
export class DialogCatagoryComponent {
  firestore: Firestore = inject(Firestore);
  storage: Storage = inject(Storage);

  catagory = new Catagory();
  selectedFile!: File;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogCatagoryComponent>) {}

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

  async saveUser() {
    this.loading = true;
    this.catagory.catagoryName = this.capitalize(this.catagory.catagoryName);

    try {
      let imageUrl = '';

      if (this.selectedFile) {
        const storageRef = ref(this.storage, `categoryImages/${this.selectedFile.name}`);
        await uploadBytes(storageRef, this.selectedFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      const dataToSave = {
        catagoryName: this.catagory.catagoryName,
        imageUrl: imageUrl,
      };

      const catagoryCollection = collection(this.firestore, 'categories');
      await addDoc(catagoryCollection, dataToSave);
    } catch (error) {
      console.error('Error adding category:', error);
    } finally {
      this.loading = false;
      this.dialogRef.close();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
