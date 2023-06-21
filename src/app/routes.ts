import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { DysonSphereProgramNotesComponent } from './dyson-sphere-program-notes/dyson-sphere-program-notes.component';

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page'
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Home details'
    },
    {
        path: 'dyson-sphere-program-notes',
        component: DysonSphereProgramNotesComponent,
        title: 'Dyson Sphere Program notes'
    }
];

export default routeConfig;