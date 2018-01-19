import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
// import {operators} from 'rxjs/Rx';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  operation: string[] = ['', '', ''];
  display: string;
  // subDisplay:string = ''
  activeBuildingNumber: string;


  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.display = '';
    this.activeBuildingNumber = '';
  }
  /*this.display = '';
  this.activeBuildingNumber = '';
  this.operation = ['', '', ''];*/
  /* interface ServerResponse {
     login: string;
     bio: string;
     company: string;
   }*/

  /*this.http.get <ServerResponse>
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
  );*/
  /* const req = this.http.post('http://jsonplaceholder.typicode.com/posts', {
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
 }*/

  sendValue(operator: string, operand1: string, operand2: string) {
    operator = this.operation[1];
    operand1 = this.operation[0];
    operand2 = this.operation[2];
    console.log('operator = ' + operator);
    switch (operator) {
      case '*':
        operator = 'multiply';
        break;
      case '+':
        operator = 'add';
        break;
      case '-':
        operator = 'subtract';
        break;
      case '/':
        operator = 'divide';
        break;
    }
    this.http.get('http://localhost:8080/api/v1/calculator/' + operator + '/' + operand1 + '/' + operand2)
      .subscribe( (response: any) => {
          this.loop();
          this.activeBuildingNumber = response.answer;
          console.log(this.activeBuildingNumber);
          this.display = this.activeBuildingNumber;
          this.operation[0] = response.answer;
        });
  }
  sendPower(operator: string, operand1: string) {
    operand1 = this.operation[0];
      operator = 'square';
    this.http.get('http://localhost:8080/api/v1/calculator/' + operator + '/' + operand1)
      .subscribe( (response: any) => {
          this.loop();
          this.activeBuildingNumber = response.answer;
          this.operation[0] = this.activeBuildingNumber;
          this.display = this.operation[0];
          // console.log(this.operation[0]);
        }
      );
  }
  sendRoot(operator: string, operand1: string) {
    operand1 = this.operation[0];
    operator = 'squareroot';
    this.http.get('http://localhost:8080/api/v1/calculator/' + operator + '/' + operand1)
      .subscribe( (response: any) => {
          this.loop();
          this.activeBuildingNumber = response.answer;
          this.operation[0] = this.activeBuildingNumber;
          this.display = this.operation[0];
          // console.log(this.operation[0]);
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
      return;
    }
    this.operation[1] = operator;

    this.activeBuildingNumber = '';
    this.renderDisplay();
  }
  // showResult(): void {
  //   if (this.confirmInputs() ) {
  //     const val = this.calculateResult();
  //
  //     this.display = '' + val;
  //     // this.subDisplay = this.operation.join(' ');
  //     this.activeBuildingNumber = this.display;
  //     console.log(this.activeBuildingNumber);
  //     this.loop();
  //     this.operation[0] = this.activeBuildingNumber;
  //     this.display = this.activeBuildingNumber;
  //
  //   }
  // }
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

  // calculateResult(): number {
  //   switch (this.operation[1]) {
  //     case '*':
  //       return parseFloat(this.operation[0]) * parseFloat(this.operation[2]);
  //     case '+':
  //       return parseFloat(this.operation[0]) + parseFloat(this.operation[2]);
  //     case '-':
  //       return parseFloat(this.operation[0]) - parseFloat(this.operation[2]);
  //     case '/':
  //       return parseFloat(this.operation[0]) / parseFloat(this.operation[2]);
  //   }
  // }
}
