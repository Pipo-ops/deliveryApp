import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.scss'
})
export class RestaurantComponent implements OnInit {
  restaurantId!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.restaurantId = this.route.snapshot.paramMap.get('id')!;
  }
}
