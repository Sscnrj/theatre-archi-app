import { Component, Input } from '@angular/core';
import { User } from '../../models/users';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true
})
export class UserComponent {
  @Input() user!: User;  // l'utilisateur à afficher

  constructor() {}
}
