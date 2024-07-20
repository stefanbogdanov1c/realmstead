import { Component, inject } from '@angular/core';
import { HttpService } from '../http.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class SearchComponent {
  httpService = inject(HttpService);
  query: string = '';
  results: any = {};


  onSearch() {
    if (this.query.trim()) {
      this.httpService.search(this.query).subscribe((results) => {
        this.results = results;
      });
    }
  }
}
