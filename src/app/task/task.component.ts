import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-task',
  styleUrls: ['task.component.css'],
  templateUrl: 'task.component.html'
})
export class TaskComponent implements OnInit {
  taskId: string;
  count = 0;
  percent = 0;
  max = 0;
  disabled = false;
  buttonTitle = 'Download CSV';
  observable: Observable<any>;

  constructor(private taskService: TaskService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.taskId = this.route.snapshot.params['id'];

    this.observable = this.route.params
      .switchMap((params: Params) => {
        this.taskId = params['id'];
        return this.taskService.getStatus(this.taskId);
      });
    this.updateData();

    setInterval(() => {
      this.updateData();
    }, 30000);
  }

  downloadCSV() {
    this.disabled = true;
    this.buttonTitle = 'Loading ...';
    this.taskService.getCSV(this.taskId)
      .subscribe(data => {
        let result = data.json();
        this.saveCSV(result);
        this.disabled = false;
        this.buttonTitle = 'Download CSV';
      },
      error => {
        console.log(error);
        this.disabled = false;
        this.buttonTitle = 'Download CSV';
      });
  }

  private updateData() {
    this.observable.subscribe(data => {
      let result = data.json();
      this.percent = result.percent;
      this.count = result.count.withCompanyId;
      this.max = result.count.all;
    },
      error => {
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
}
