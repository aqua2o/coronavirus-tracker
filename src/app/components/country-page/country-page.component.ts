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
  SummaryGraph1 = [];
  chartDailyCases1 = [];
  SummaryGraph2 = [];
  chartDailyCases2 = [];
  SummaryGraph3 = [];
  chartDailyCases3 = [];
  country = '';

  constructor(private route: ActivatedRoute, private countryService: CountryService) { }

  ngOnInit() {
    this.country = this.route.snapshot.paramMap.get('country');

    this.countryService.getCountryApi1(this.country).subscribe((response) => {
      console.log('response 1', response);
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

      this.buildSummaryGraph(this.SummaryGraph1, 'SummaryGraph1', confirmedCases, activeCases, recoveredCases, deathsCases, countryDates);
      this.buildnewDailyCasesGraph(this.chartDailyCases1, 'chartDailyCases1', dailyNewCases, countryDates);
    });


    this.countryService.getCountryApi2(this.country).subscribe(response => {
      console.log('response 2', response);
      response = response.response;
      const confirmedCases = response.map(res => res.cases.total);
      const deathsCases = response.map(res => res.deaths.total);
      const recoveredCases = response.map(res => res.cases.recovered);
      const activeCases = response.map(res => res.cases.active);
      const allDates = response.map(res => res.day);

      const countryDates = [];
      allDates.forEach(res => {
        const jsdate = new Date(res);
        countryDates.push(jsdate.toLocaleDateString('en', {month: 'short', day: 'numeric'}));
      });

      const dailyNewCases = response.map(res => {
        if (res.cases.new) {
          return Number(res.cases.new.substring(1));
        } else {
          return 0;
        }
      });

      this.buildSummaryGraph(
        this.SummaryGraph2,
        'SummaryGraph2',
        confirmedCases.reverse(),
        activeCases.reverse(),
        recoveredCases.reverse(),
        deathsCases.reverse(),
        countryDates.reverse()
      );
      this.buildnewDailyCasesGraph(
        this.chartDailyCases2,
        'chartDailyCases2',
        dailyNewCases.reverse(),
        countryDates
      );

    });

    this.countryService.getCountryApi3(this.country).subscribe(response => {
      console.log('response 3', response);

      response = response.stat_by_country;
      const confirmedCases = response.map(res => {
        if (res.total_cases) {
          return parseFloat(res.total_cases.replace(/,/g, ''));
        } else {
          return 0;
        }
      });
      const deathsCases = response.map(res => {
        if (res.total_deaths) {
          return parseFloat(res.total_deaths.replace(/,/g, ''));
        } else {
          return 0;
        }
      });
      const recoveredCases = response.map(res => {
        if (res.total_recovered) {
          return parseFloat(res.total_recovered.replace(/,/g, ''));
        } else {
          return 0;
        }
      });
      const activeCases = response.map(res => {
        if (res.active_cases) {
          return parseFloat(res.active_cases.replace(/,/g, ''));
        } else {
          return 0;
        }
      });
      const allDates = response.map(res => {
        if (res.record_date) {
          return res.record_date;
        } else {
          return 0;
        }
      });

      const countryDates = [];
      allDates.forEach(res => {
        const jsdate = new Date(res);
        countryDates.push(jsdate.toLocaleDateString('en', {month: 'short', day: 'numeric'}));
      });

      const dailyNewCases = response.map(res => {
        if (res.new_cases) {
          return parseFloat(res.new_cases.replace(/,/g, ''));
        } else {
          return 0;
        }
      });

      this.buildSummaryGraph(
        this.SummaryGraph3,
        'SummaryGraph3',
        confirmedCases,
        activeCases,
        recoveredCases,
        deathsCases,
        countryDates
      );

      this.buildnewDailyCasesGraph(
        this.chartDailyCases3,
        'chartDailyCases3',
        dailyNewCases,
        countryDates
      );
    });

    this.countryService.getCountryApi4(this.country).subscribe(response => {
      console.log('response 4', response);
    });
  }

  buildSummaryGraph(graph, graphName, confirmedCases, activeCases, recoveredCases, deathsCases, countryDates) {
    graph = new Chart(graphName, {
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

  buildnewDailyCasesGraph(graph, graphName, cases, countryDates) {
    graph = new Chart(graphName, {
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
