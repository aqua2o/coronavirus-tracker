import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { Chart } from 'chart.js';
import { element } from 'protractor';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.scss']
})
export class CountryPageComponent implements OnInit {

  chartConfirmedCases = [];
  chartActiveCases = [];
  chartDailyCases = [];

  constructor(private route: ActivatedRoute, private countryService: CountryService) { }

  ngOnInit() {
    const country = this.route.snapshot.paramMap.get('country');

    this.countryService.getCountryAllStatus(country).subscribe((response) => {
      const confirmedCases = response.map(res => res.Confirmed);
      const deathsCases = response.map(res => res.Deaths);
      const recoveredCases = response.map(res => res.Recovered);
      const activeCases = response.map(res => res.Confirmed - res.Recovered - res.Deaths);
      const allDates = response.map(res => res.Date);

      const countryDates = [];
      allDates.forEach(res => {
        const jsdate = new Date(res);
        countryDates.push(jsdate.toLocaleDateString('en', {month: 'short', day: 'numeric'}));
      });

      const dailyNewCases = [];
      for (let index = 0; index < confirmedCases.length; index++) {
        dailyNewCases.push(confirmedCases[index] - (confirmedCases[index - 1] || 0));
      }

      console.log('dailyNewCases', dailyNewCases);
      console.log('countryDates', countryDates);

      this.buildTotalConfirmedCasesGraph(confirmedCases, countryDates);
      this.buildActiveCasesGraph(activeCases, countryDates);
      this.buildnewDailyCasesGraph(dailyNewCases, countryDates);
    });
  }

  buildTotalConfirmedCasesGraph(cases, countryDates) {
    this.chartActiveCases = new Chart('confirmedCases', {
      type: 'bar',
      data: {
        labels: countryDates,
        datasets: [
          {
            label: 'Total cases',
            data: cases,
            backgroundColor: '#ffcc00',
            borderColor: '#ffcc00',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: true
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
  }

  buildActiveCasesGraph(cases, countryDates) {
    this.chartActiveCases = new Chart('activeCases', {
      type: 'bar',
      data: {
        labels: countryDates,
        datasets: [
          {
            label: 'Active cases',
            data: cases,
            backgroundColor: '#ffcc00',
            borderColor: '#ffcc00',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: true
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
  }

  buildnewDailyCasesGraph(cases, countryDates) {
    this.chartActiveCases = new Chart('dailyCases', {
      type: 'bar',
      data: {
        labels: countryDates,
        datasets: [
          {
            label: 'Daily new cases',
            data: cases,
            backgroundColor: '#ffcc00',
            borderColor: '#ffcc00',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: true
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
  }
}
