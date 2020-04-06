import { Component, OnInit } from '@angular/core';
import { AjaxService } from './services/ajax.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private ajaxService: AjaxService) {
  }

  ngOnInit() {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    this.ajaxService.getApiData(url).subscribe(response => {
      console.log('response', response);
  });
  }
}
