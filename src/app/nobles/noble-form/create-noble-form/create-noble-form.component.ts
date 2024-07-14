import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpService } from '../../../http.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectAllNobles } from '../../../app.store';
import { NobleFormComponent } from '../noble-form.component';

@Component({
  selector: 'app-create-noble-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NobleFormComponent],
  templateUrl: 'create-noble-form.component.html',
  styles: ``,
})
export class CreateNobleFormComponent {
  httpService = inject(HttpService);
  fb = inject(FormBuilder);
  store = inject(Store);

  nobles$ = this.store.select(selectAllNobles);
}
