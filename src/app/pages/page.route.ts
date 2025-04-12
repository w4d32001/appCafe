import { Routes } from "@angular/router";

export default [

    {
        path: '',
        loadComponent: () => import('../shared/ui/layout/layout.component').then(m => m.LayoutComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'category',
                loadComponent: () => import('./category/category.component').then(m => m.CategoryComponent)
            },
            {
                path: 'product',
                loadComponent: () => import('./product/product.component').then(m => m.ProductComponent)
            },
            {
                path: 'order',
                loadComponent: () => import('./order/order.component').then(m => m.OrderComponent)
            },
            {
                path: 'user',
                loadComponent: () => import('./user/user.component').then(m => m.UserComponent)
            },
            {
                path: 'bill',
                loadComponent: () => import('./bill/bill.component').then(m => m.BillComponent)
            }
        ]
    }

] as Routes