import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DiabetiesComponent } from './diabeties/diabeties.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DiabetiesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'I\'m Alive';
}
