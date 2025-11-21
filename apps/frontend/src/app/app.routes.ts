import { Routes } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';
import { TodosComponent } from './pages/todos/todos.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'todos',
        pathMatch: 'full'
    },
    {
        path: 'todos',
        component: TodosComponent,
    },
    {
        path: 'contact',
        component: ContactComponent
    }
];
