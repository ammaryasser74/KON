import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created  by <b><a href="https://start-it.online/" target="_blank">Start-it</a></b> 2020
    </span>
  `,
})
export class FooterComponent {
}
