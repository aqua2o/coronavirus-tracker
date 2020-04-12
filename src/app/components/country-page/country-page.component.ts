import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';

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
      console.log('response', response);
    });
  }
}
