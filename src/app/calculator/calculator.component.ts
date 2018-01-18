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
  // subDisplay:string = ''
  activeBuildingNumber: string = '';

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
  }
  buildNumber(num: string): void {
    this.activeBuildingNumber += num;
    // if operator is defined, set second variable
    if (this.operation[1].length) {
      this.operation[2] = this.activeBuildingNumber;
    } else {
      this.operation[0] = this.activeBuildingNumber;
        // this.subDisplay = '';
    }

    this.renderDisplay();
  }

  // render display
  renderDisplay(): void {
    this.display = this.operation.join(' ');
  }
  selectOperator(operator: string): void {
    if (!this.operation[0].length) {
      this.displayError();
      // this.subDisplay = 'Enter number before operation';
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
      // this.subDisplay = this.operation.join(' ');
      this.activeBuildingNumber = this.display;
        console.log(this.activeBuildingNumber);
        this.loop();
      this.operation[0] = this.activeBuildingNumber;
      this.display = this.activeBuildingNumber;

    }
  }
  loop(): void {
    this.display = '';
    // this.subDisplay = '';
    this.operation = ['', '', ''];
  }
  resetOperation(): void {
    this.operation = ['', '', ''];
    this.activeBuildingNumber = '';
    this.display = '';
    // this.subDisplay = '';
  }

  displayError(): void {
    this.display = 'Error!';
  }

  confirmInputs(): boolean {
    if (!this.operation[0].length) {
      this.displayError();
      this.display = null;
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
