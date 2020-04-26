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

  chart: any;
  SummaryGraph = [];
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
        const dailyCase = confirmedCases[index] - (confirmedCases[index - 1] || 0);

        dailyNewCases.push(dailyCase >= 0 ? dailyCase : 0);
      }

      this.buildSummaryGraph(confirmedCases, activeCases, recoveredCases, deathsCases, countryDates);
      this.buildnewDailyCasesGraph(dailyNewCases, countryDates);
    });
  }

  buildSummaryGraph(confirmedCases, activeCases, recoveredCases, deathsCases, countryDates) {
    this.SummaryGraph = new Chart('SummaryGraph', {
      type: 'line',
      data: {
        labels: countryDates,
        datasets: [
          {
            label: 'Total cases',
            data: confirmedCases,
            backgroundColor: '#ffcc00',
            borderColor: '#ffcc00',
            fill: false
          },
          {
            label: 'Active cases',
            data: activeCases,
            backgroundColor: '#36a2eb',
            borderColor: '#36a2eb',
            fill: false
          },
          {
            label: 'Recovered cases',
            data: recoveredCases,
            backgroundColor: '#4bc0c0',
            borderColor: '#4bc0c0',
            fill: false
          },
          {
            label: 'Death cases',
            data: deathsCases,
            backgroundColor: '#ff6384',
            borderColor: '#ff6384',
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
    this.chartDailyCases = new Chart('dailyCases', {
      type: 'bar',
      data: {
        labels: countryDates,
        datasets: [
          {
            label: 'Daily new cases',
            data: cases,
            backgroundColor: '#4bc0c0',
            borderColor: '#4bc0c0',
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
