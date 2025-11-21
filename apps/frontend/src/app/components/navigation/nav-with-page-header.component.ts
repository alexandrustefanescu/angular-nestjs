import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Component, inject, input, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DeviceService } from '../../services/todos/device/device.service';
import { FooterComponent } from '../footer/footer.component';

type NavigationItem = {
  name: string;
  href: string;
};

@Component({
  selector: 'app-nav-with-page-header',
  templateUrl: './nav-with-page-header.component.html',

  imports: [
    NgOptimizedImage,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    AsyncPipe,
    MatListModule,
    RouterLink,
    RouterLinkActive,
    FooterComponent,
  ],
})
export class NavWithPageHeaderComponent {
  readonly drawer = viewChild.required<MatDrawer>('drawer');

  private deviceService = inject(DeviceService);
  isHandset$ = this.deviceService.isHandset$;

  navigation: NavigationItem[] = [
    { name: 'Todos', href: '/todos' },
    { name: 'Contact', href: '/contact' },
  ];

  toggleMenu(): void {
    this.drawer().toggle();
  }
}
