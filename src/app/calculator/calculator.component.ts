import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  operation: string[] = ['', '', ''];
  display: string = '';
  subDisplay:string = ''
  activeBuildingNumber:string = '';


  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    /*this.display = '';
    this.activeBuildingNumber = '';
    this.operation = ['', '', ''];*/
    interface ServerResponse {
      login: string;
      bio: string;
      company: string;
    }

    this.http.get <ServerResponse>
    ('https://api.github.com/users/seeschweiler').subscribe(data => {
        console.log('User Login: ' + data.login);
        console.log('Bio: ' + data.bio);
        console.log('Company: ' + data.company);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error occurred.');
        } else {
          console.log('Server-side error occurred.');
        }
      }
    );
    const req = this.http.post('http://jsonplaceholder.typicode.com/posts', {
      title: 'foo',
      body: 'bar',
      userId: 1
    })
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log('Error occurred');
        }
      );
  }

  buildNumber(num: string): void {
    this.activeBuildingNumber += num;
    // if operator is defined, set second variable
    console.log('Active: ', this.activeBuildingNumber);
    if (this.operation[1].length) {
      this.operation[2] = this.activeBuildingNumber;
    } else {
      this.operation[0] = this.activeBuildingNumber;
      this.subDisplay = '';
    }
    this.renderDisplay();
  }

  // render display
  renderDisplay(): void {
    this.display = this.operation.join(' ');
  }

  //
  selectOperator(operator: string): void {
    if (!this.operation[0].length) {
      this.displayError();
      this.display = 'Enter number';
      return;
    }
    this.operation[1] = operator;
    this.activeBuildingNumber = '';
    this.renderDisplay();
  }

  showResult(): void {
    if (this.confirmInputs() ) {
      const val = this.calculateResult();

      this.display = '' + val;
      this.subDisplay = this.operation.join(' ');
      this.activeBuildingNumber = this.display;
    }
  }

  resetOperation(): void {
    this.operation = ['', '', ''];
    this.activeBuildingNumber = '';
  }

  displayError(): void {
    this.display = 'Error!';
  }

  confirmInputs(): boolean {
    if (!this.operation[0].length) {
      this.displayError();
      this.display = 'Enter First Number';
      return false;
    } else if (!this.operation[1].length) {
      this.displayError();
      this.display = 'Enter Operator';
      return false;
    } else if (!this.operation[1].length) {
      this.displayError();
      this.display = 'Enter Second Number';
      return false;
    }
    return true;
  }
  clear(): number {
    this.operation = ['', '', ''];
    this.activeBuildingNumber = '';
    return 0;
  }
  calculateResult(): number {
    switch (this.operation[1]) {
      case '*':
        return parseFloat(this.operation[0]) * parseFloat(this.operation[2]);
      case '+':
        return parseFloat(this.operation[0]) + parseFloat(this.operation[2]);
      case '-':
        return parseFloat(this.operation[0]) - parseFloat(this.operation[2]);
      case '/':
        return parseFloat(this.operation[0]) / parseFloat(this.operation[2]);
    }
  }


}
