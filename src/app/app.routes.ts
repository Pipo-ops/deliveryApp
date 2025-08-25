import { Routes } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { LastDeliveryComponent } from './last-delivery/last-delivery.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { OrderCategoryComponent } from './order-category/order-category.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

export const routes: Routes = [
  { path: '', component: OrderComponent },
  { path: 'order', component: OrderComponent },
  { path: 'order-category/:id', component: OrderCategoryComponent },
  { path: 'restaurant/:id', component: RestaurantComponent },
  { path: 'last-delivery', component: LastDeliveryComponent },
  { path: 'my-account', component: MyAccountComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  {
    path: 'order-success',
    loadComponent: () =>
      import('./order-success/order-success.component')
        .then(m => m.OrderSuccessComponent)
  },
];
