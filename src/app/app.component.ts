import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { OrderComponent } from './order/order.component';
import { LastDeliveryComponent } from './last-delivery/last-delivery.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { OrderCategoryComponent } from './order-category/order-category.component';
import { MatDrawer } from '@angular/material/sidenav';
import { BasketService } from './services/basket.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { BasketItem } from './services/basket.service';
import { Router } from '@angular/router';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    OrderComponent,
    OrderCategoryComponent,
    LastDeliveryComponent,
    ImprintComponent,
    PrivacyPolicyComponent,
    MyAccountComponent,
    MatDrawer,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  title = 'deliveryApp';

  @ViewChild('leftDrawer') leftDrawer!: MatDrawer;
  @ViewChild('rightDrawer') rightDrawer!: MatDrawer;

  private destroy$ = new Subject<void>();

  constructor(public basketService: BasketService,private router: Router) {}

  basketItems: BasketItem[] = [];

  get totalPrice(): number {
    return this.basketService.getTotal();
  }

  ngOnInit() {
    this.basketService.openBasket$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.leftDrawer.close();
        this.rightDrawer.open();
      });

    this.basketService.basketItems$
      .pipe(takeUntil(this.destroy$))
      .subscribe((items) => {
        this.basketItems = items;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCheckout() {
    if (!this.basketItems.length) return;

    this.basketService.clearBasket();
    this.rightDrawer.close();
    this.leftDrawer.open();

    this.router.navigate(['/order-success']);
  }
}
