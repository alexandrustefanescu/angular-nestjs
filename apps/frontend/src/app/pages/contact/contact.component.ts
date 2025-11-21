import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-contact',
  imports: [MatButtonModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/alexandru-stefanescu94/',
    },
    {
      name: 'Twitter',
      url: 'https://x.com/ste_alexandru',
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@stefanescu_alexandru',
    }
  ];
}
