import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.scss']
})
export class CountryPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private countryService: CountryService) { }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('country'));
    const country = this.route.snapshot.paramMap.get('country');
    this.countryService.getCountryInfo(country).subscribe((response) => {
      console.log('response country page', response);
      let max = 9000;
      let min = 0;
      let allDates = response.map(res => res.Date);
      console.log('all dates', allDates);

      let countryDates = [];
      allDates.forEach(res => {
        let jsdate = new Date(res);
        countryDates.push(jsdate.toLocaleTimeString('en', {year: 'numeric', month: 'short', day: 'numeric'}));
      });

      console.log('countryDates', countryDates);
    });
  }
}
