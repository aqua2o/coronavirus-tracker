import { Component, OnInit, ViewChild } from '@angular/core';
import { CountriesService } from '../../services/contries.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';

@Component({
  selector: 'app-countries-table',
  templateUrl: './countries-table.component.html',
  styleUrls: ['./countries-table.component.scss']
})
export class CountriesTableComponent implements OnInit {

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns = ['Country', 'TotalConfirmed', 'NewConfirmed', 'NewRecovered', 'NewDeaths', 'TotalRecovered', 'TotalDeaths', 'LastUpdate'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private countriesService: CountriesService) {
  }

  ngOnInit() {
    this.countriesService.getCountries().subscribe((response) => {
        this.dataSource = new MatTableDataSource(response.Countries);
        this.dataSource.paginator = this.paginator;
        this.sort.sort(({ id: 'TotalConfirmed', start: 'desc'}) as MatSortable);
        this.dataSource.sort = this.sort;
      }
    );
  }
}
