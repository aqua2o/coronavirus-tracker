import { Component, OnInit, ViewChild } from '@angular/core';
import { CountriesService } from '../../services/contries.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-countries-table',
  templateUrl: './countries-table.component.html',
  styleUrls: ['./countries-table.component.scss']
})
export class CountriesTableComponent implements OnInit {

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns = ['Country', 'TotalConfirmed', 'NewConfirmed', 'NewRecovered', 'NewDeaths', 'TotalRecovered', 'TotalDeaths', 'LastUpdate'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private countriesService: CountriesService) {
  }

  ngOnInit() {
    this.countriesService.getCountries().subscribe((response) => {
        this.dataSource = new MatTableDataSource(response.Countries);
        this.dataSource.paginator = this.paginator;
      }
    );
  }
}
