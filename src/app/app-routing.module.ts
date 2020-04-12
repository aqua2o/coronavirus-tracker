import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountriesTableComponent } from './components/countries-table/countries-table.component';
import { CountryPageComponent } from './components/country-page/country-page.component';

const routes: Routes = [
  {
    path: '',
    component: CountriesTableComponent
  },
  {
    path: 'country/:id',
    component: CountryPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [CountriesTableComponent, CountryPageComponent];
