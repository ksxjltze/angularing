import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

enum FilterType{
    City = "CITY",
    State = "STATE",
    Name = "NAME"
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent,
  ],
  template: `
  <section>
    <div id="filter-types">
      <label for="filter-types" id="filter-types-label">Filter Types:</label>
      <select id="filter-types-select" #filter_type (change)="filterSelected(filter_type.value)">
        <option value="City">City</option>
        <option value="State">State</option>
        <option value="Name">Name</option>
      </select>
    </div>
    <form>
      <input type="text" placeholder="Filter" #filter>
      <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
    </form>
  </section>

  <section class="results">
    <app-housing-location
      *ngFor="let housingLocation of filteredLocationList"
      [housingLocation]="housingLocation">
    </app-housing-location>
  </section>
`,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = []; 
  housingService: HousingService = inject(HousingService);

  filterType: string = "City";

  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList;
  }

  filterResults(text: string){
    if (!text){
      this.filteredLocationList = this.housingLocationList;
    }

    switch(this.filterType){
      case "City":
        this.filteredLocationList = this.housingLocationList.filter(housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase()));
        break;
      case "State":
        this.filteredLocationList = this.housingLocationList.filter(housingLocation => housingLocation?.state.toLowerCase().includes(text.toLowerCase()));
        break;
      case "Name":
        this.filteredLocationList = this.housingLocationList.filter(housingLocation => housingLocation?.name.toLowerCase().includes(text.toLowerCase()));
        break;
    }
  }

  filterSelected(filter: string){
    this.filterType = filter;
  }

}
