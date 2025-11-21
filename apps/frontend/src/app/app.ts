import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavWithPageHeaderComponent } from './components/navigation/nav-with-page-header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavWithPageHeaderComponent],
  templateUrl: './app.html',
})
export class App {
}
