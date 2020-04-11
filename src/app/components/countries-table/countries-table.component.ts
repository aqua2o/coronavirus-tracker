import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/contries.service';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { Country } from '../../models/country.model';

@Component({
  selector: 'app-countries-table',
  templateUrl: './countries-table.component.html',
  styleUrls: ['./countries-table.component.scss']
})
export class CountriesTableComponent implements OnInit {

  dataSource = new CountryDataSource(this.countriesService);
  displayedColumns = ['Country', 'TotalConfirmed', 'NewConfirmed', 'NewRecovered', 'NewDeaths', 'TotalRecovered', 'TotalDeaths', 'LastUpdate'];

  constructor(private countriesService: CountriesService) {
  }

  ngOnInit() {
  }
}

export class CountryDataSource extends DataSource<any> {
  constructor(private countriesService: CountriesService) {
    super();
  }

  connect(): Observable<Country[]> {
    return this.countriesService.getCountries();
  }

  disconnect() {}
}
