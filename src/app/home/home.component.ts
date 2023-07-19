import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  count = 0;

  incrementCount(){
    this.count++;
  }

  decrementCount(){
    this.count--;
  }

  resetCount(){
    this.count = 0;
  }
}
