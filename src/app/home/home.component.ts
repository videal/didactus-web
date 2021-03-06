import { Component } from '@angular/core';
import { HomeService } from './home.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { FilterModel } from './filter.model';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: 'home.component.html'
})
export class HomeComponent {
  count: number;
  items: Array<FilterModel>;
  tasks: Array<string>;
  disabled = false;
  disabledAll = false;
  buttonTitle = 'Start export';
  DownloadAllTitle = 'Download all';
  newTechnology = '';
  newLocation = '';

  constructor(private homeService: HomeService) {
    this.taskProcessing();
    homeService.getCount()
      .subscribe(data => {
        this.count = data.json().count;
      },
      error => {
        console.log(error);
      });

    this.items = [{
      state: false,
      name: '$40k — $200k',
      value: '%5Bsalary%5D%5Bmin%5D=40&filter_data%5Bsalary%5D%5Bmax%5D=200'
    }, {
      state: false,
      name: 'Remote OK',
      value: '%5Bremote%5D=true'
    }, {
      state: false,
      name: 'United States',
      value: '%5Blocations%5D%5B%5D=United+States'
    }, {
      state: false,
      name: 'Silicon Valley',
      value: '%5Blocations%5D%5B%5D=Silicon+Valley'
    }, {
      state: false,
      name: 'JavaScript',
      value: '%5Bskills%5D%5B%5D=Javascript'
    }, {
      state: false,
      name: 'Software Engineer',
      value: '%5Broles%5D%5B%5D=Software+Engineer'
    }];
  }

  send() {
    let args: any = [];
    let hasChossedItems = false;
    for (let item of this.items) {
      if (item.state) {
        hasChossedItems = true;
        args.push(item.value);
      }
    }
    if (hasChossedItems) {
      this.disabled = true;
      this.buttonTitle = 'Loading ...';
      this.homeService.postFilters(args)
        .subscribe(data => {
          let id = data.json();
          this.cookieProcessing(id);
          this.clearFilters();
          this.disabled = false;
          this.buttonTitle = 'Start export';
          this.homeService.getDispatcherRun()
            .subscribe(() => {
            },
            error => {
              console.log(error);
            });
        },
        error => {
          console.log(error);
          this.disabled = false;
          this.buttonTitle = 'Start export';
        });
    } else {
    }
  }

  onEnterTechnology(value: string) {
    if (value !== '') {
      this.items.push({
        state: true,
        name: value,
        value: '%5Bskills%5D%5B%5D=' + value
      });
      this.newTechnology = '';
      console.log(this.items);
    }
  }

  onEnterLocation(value: string) {
    if (value !== '') {
      this.items.push({
        state: true,
        name: value,
        value: '%5Blocations%5D%5B%5D=' + value
      });
      this.newLocation = '';
      console.log(this.items);
    }
  }

  downloadAll() {
    this.DownloadAllTitle = 'Loading ...';
    this.disabledAll = true;
    this.homeService.getAllCSV()
      .subscribe(data => {
        let result = data.json();
        this.saveCSV(result);
        this.disabledAll = false;
        this.DownloadAllTitle = 'Download all';
      },
      error => {
        this.DownloadAllTitle = 'Download all';
        this.disabledAll = false;
        console.log(error);
      });
  }

  private saveCSV(json: string) {
    let options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false
    };
    new Angular2Csv(json, 'Vacancies', options);
  }

  private cookieProcessing(id: string) {
    let tasksCookie = Cookie.get('tasks');
    if (tasksCookie) {
      tasksCookie += '|' + id;
      Cookie.delete('tasks');
      Cookie.set('tasks', tasksCookie);
    } else {
      Cookie.set('tasks', id);
    }
    this.taskProcessing();
  }

  private clearFilters() {
    for (let item of this.items) {
      item.state = false;
    }
  }

  private taskProcessing() {
    let tasksCookie = Cookie.get('tasks');
    if (tasksCookie) {
      this.tasks = tasksCookie.split('|');
    }
  }

  private deleteFilter(value) {
    this.items = this.items.filter(item => item.name !== value);
  }
}
