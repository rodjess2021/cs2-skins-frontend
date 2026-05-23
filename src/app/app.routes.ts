import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { VerArmas } from './pages/ver-armas/ver-armas';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },

    {
        path: 'armas',
        component: VerArmas
    }
];
