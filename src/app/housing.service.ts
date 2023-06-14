import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';
import { MongoClient, ServerApiVersion } from 'mongodb';
// const { MongoClient, ServerApiVersion } = require('mongodb');

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  // db: DatabaseClient = new DatabaseClient();
  // url = 'http://localhost:3000/locations';
  url = 'https://quick-and-dirty-restful-api.vercel.app/locations'

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    // await this.db.run();
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

// class DatabaseClient{
//   uri = "mongodb+srv://angularman:PiEMNzYCg6jLDGQQ@angularing.nf72egr.mongodb.net/?retryWrites=true&w=majority";
  
//   // Create a MongoClient with a MongoClientOptions object to set the Stable API version
//   client = new MongoClient(this.uri, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
//   });
  
//   async run() {
//     try {
//       // Connect the client to the server	(optional starting in v4.7)
//       await this.client.connect();
//       // Send a ping to confirm a successful connection
//       await this.client.db("admin").command({ ping: 1 });
//       console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await this.client.close();
//     }
//   }

// }
