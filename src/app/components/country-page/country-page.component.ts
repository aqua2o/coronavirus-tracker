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

  chart = [];

  constructor(private route: ActivatedRoute, private countryService: CountryService) { }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('country'));
    const country = this.route.snapshot.paramMap.get('country');
    this.countryService.getCountryInfo(country).subscribe((response) => {
      console.log('response country page', response);
      const cases = response.map(res => res.Cases);
      const allDates = response.map(res => res.Date);
      console.log('all dates', allDates);

      const countryDates = [];
      allDates.forEach(res => {
        const jsdate = new Date(res);
        countryDates.push(jsdate.toLocaleTimeString('en', {year: 'numeric', month: 'short', day: 'numeric'}));
      });

      console.log('countryDates', countryDates);

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: countryDates,
          datasets: [
            {
              data: cases,
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }]
          }
        }
      });
    });
  }
}
