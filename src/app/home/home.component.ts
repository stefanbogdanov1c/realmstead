import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchComponent],
  templateUrl: 'home.component.html',
  styles: ``,
})
export class HomeComponent { }
