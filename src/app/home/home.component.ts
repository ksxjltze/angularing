import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FgoService } from '../services/fgo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  count = 0;

  servants: any;
  servantIcons: any = [];

  constructor(private fgoService : FgoService){

  }

  loadServants(){
    this.fgoService.getServants().subscribe((data) =>{
      this.servants = data;

      this.servants.forEach((servant: any) => {
        this.servantIcons.push(servant.face);
      });

    });
  }

  ngOnInit(): void {
    this.loadServants();
  }

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
