import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpService } from './http-service.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { geographicalMap, politicalMap } from '../assets/map';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit {
  httpService = inject(HttpService);
  fb = inject(FormBuilder);
  store = inject(Store);
  sanitizer = inject(DomSanitizer);

  geoMap = geographicalMap;
  polMap = politicalMap;

  ngOnInit(): void {
    console.log('app initialized');
  }

  getGeographicalMap() {
    return this.sanitizer.bypassSecurityTrustHtml(this.geoMap);
  }

  getPoliticalMap() {
    return this.sanitizer.bypassSecurityTrustHtml(this.polMap);
  }
}
