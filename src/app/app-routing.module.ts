import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddItemComponent } from './admin/add-item/add-item.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { LoginComponent } from './admin/login/login.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  },
  {
    path: "admin",
    component: LayoutComponent,
    children: [
      {
        path: 'add-items',
        component: AddItemComponent
      },
      {
        path: 'item-detail/:id',
        component: ItemDetailComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'search',
    component: SearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
