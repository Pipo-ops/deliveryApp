import { Routes } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { LastDeliveryComponent } from './last-delivery/last-delivery.component';
import { MyAccountComponent } from './my-account/my-account.component';

export const routes: Routes = [
     { path: '', component: OrderComponent },
  { path: 'order', component: OrderComponent },
  { path: 'last-delivery', component: LastDeliveryComponent },
  { path: 'my-account', component: MyAccountComponent }
];

