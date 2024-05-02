import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpService } from './http-service.service';
import { Noble } from './types';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  createNewNoble,
  deleteNoble,
  fetchAllNobles,
  selectAllNobles,
} from './app.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, ReactiveFormsModule],
  template: `
    @if (nobles$ | async; as nobles) {
    <div class="flex flex-col gap-2 p-4">
      <h2>Create a New Noble</h2>
      <form
        [formGroup]="nobleForm"
        (ngSubmit)="onSubmit()"
        class="flex gap-2 flex-col w-1/2"
      >
        <div class="form-group">
          <label for="name">Name:</label>
          <input
            type="text"
            id="name"
            formControlName="name"
            class="text-black"
          />
          <div
            *ngIf="
              nobleForm.get('name')?.invalid &&
              (nobleForm.get('name')?.dirty || nobleForm.get('name')?.touched)
            "
            class="text-danger"
          >
            Name is required
          </div>
        </div>
        <div class="form-group">
          <label for="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            formControlName="lastName"
            class="text-black"
          />
          <div
            *ngIf="
              nobleForm.get('lastName')?.invalid &&
              (nobleForm.get('lastName')?.dirty ||
                nobleForm.get('lastName')?.touched)
            "
            class="text-danger"
          >
            Last Name is required
          </div>
        </div>
        <div class="form-group">
          <label for="age">Age:</label>
          <input
            type="number"
            id="age"
            formControlName="age"
            class="text-black"
          />
          <div
            *ngIf="
              nobleForm.get('age')?.invalid &&
              (nobleForm.get('age')?.dirty || nobleForm.get('age')?.touched)
            "
            class="text-danger"
          >
            Age is required and should be a positive number
          </div>
        </div>
        <div class="form-group">
          <label for="alive">Alive:</label>
          <input
            type="checkbox"
            id="alive"
            formControlName="alive"
            class="form-check-input"
          />
        </div>
        <div class="form-group">
          <label for="gender">Gender:</label>
          <select id="gender" formControlName="gender" class="text-black">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="form-group">
          <label for="title">Title:</label>
          <input
            type="text"
            id="title"
            formControlName="title"
            class="text-black"
          />
          <!-- Validation message for title -->
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea
            id="description"
            formControlName="description"
            class="text-black"
          ></textarea>
          <!-- Validation message for description -->
        </div>
        <div class="form-group">
          <label for="nickname">Nickname:</label>
          <input
            type="text"
            id="nickname"
            formControlName="nickname"
            class="text-black"
          />
          <!-- Validation message for nickname -->
        </div>
        @if(nobles.length>1){
        <div class="form-group">
          <label for="spouse">Spouse:</label>
          <select id="spouse" formControlName="spouse">
            @for(noble of nobles; track noble.name) { @if(noble.gender !==
            nobleForm.get('gender')?.value) {
            <option [value]="noble._id">
              {{ noble.name }} {{ noble.lastName }}
            </option>
            } }
          </select>
        </div>
        <div class="form-group">
          <label>Parents:</label>
          <div *ngFor="let noble of nobles">
            <label>
              <input
                type="checkbox"
                [value]="noble._id"
                formControlName="parents"
              />
              {{ noble.name }} {{ noble.lastName }} {{ noble._id }}
            </label>
          </div>
        </div>
        <div class="form-group">
          <label>Siblings:</label>
          <div *ngFor="let noble of nobles">
            <label>
              <input
                type="checkbox"
                [value]="noble._id"
                formControlName="siblings"
              />
              {{ noble.name }} {{ noble.lastName }} {{ noble._id }}
            </label>
          </div>
        </div>
        <div class="form-group">
          <label>Children:</label>
          <div *ngFor="let noble of nobles">
            <label>
              <input
                type="checkbox"
                [value]="noble._id"
                formControlName="children"
              />
              {{ noble.name }} {{ noble.lastName }} {{ noble._id }}
            </label>
          </div>
        </div>
        }
        <button
          type="submit"
          [disabled]="nobleForm.invalid"
          class="btn btn-primary w-full cursor-pointer"
        >
          Submit
        </button>
      </form>

      <div class="flex flex-col gap-2">
        <div class="flex flex-col gap-2">
          @for (noble of nobles; track noble.name) {
          <div class="bg-red-500">
            {{ noble.name }} {{ noble.lastName }} {{ noble.age }}
            {{ noble.alive }}
            {{ noble._id }}
            <button class="btn" (click)="onDeleteNoble(noble._id)">
              delete
            </button>
          </div>
          }
        </div>
      </div>

      <router-outlet></router-outlet>
    </div>
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  httpService = inject(HttpService);
  fb = inject(FormBuilder);
  store = inject(Store);

  nobleForm = this.fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    age: [1, Validators.required],
    alive: [true, Validators.required],
    spouse: [],
    children: [[]],
    siblings: [[]],
    parents: [[]],
    gender: ['male', Validators.required],
    title: ['Ser'],
    description: ['A Noble'],
    nickname: [''],
  });

  ngOnInit() {
    this.store.dispatch(fetchAllNobles());
  }

  nobles$: Observable<Noble[]> = this.store.pipe(select(selectAllNobles));

  onSubmit() {
    const value = this.nobleForm.value as Noble;
    console.log(value);
    this.store.dispatch(createNewNoble(value));
  }

  onDeleteNoble(id: string) {
    console.log(id);
    this.store.dispatch(deleteNoble({ id }));
  }
}
