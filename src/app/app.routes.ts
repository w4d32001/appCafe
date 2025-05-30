import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./admin/admin.routes')
    },
    {
        path: 'page',
        loadChildren: () => import('./pages/page.route')
    }
];
