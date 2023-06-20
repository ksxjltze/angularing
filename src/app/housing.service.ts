import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';
import { MongoClient, ServerApiVersion } from 'mongodb';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  // url = 'https://quick-and-dirty-restful-api.vercel.app/locations'
  url = 'https://oyster-app-k3g3w.ondigitalocean.app/locations'

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }
  
  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    console.log(data);
    return await data.json() ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
  }

  constructor() { }
}