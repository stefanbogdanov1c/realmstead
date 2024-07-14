import {
  Store,
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';
import { Continent, Kingdom, City, Family, Noble } from './types';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of, tap, mergeMap } from 'rxjs';
import { HttpService } from './http.service';

export const fetchAllNobles = createAction('[Noble] Fetch Nobles');

export const setNobles = createAction(
  '[Noble] Set Nobles',
  props<{ nobles: Noble[] }>()
);

export const createNewNoble = createAction(
  '[Noble] Create a new Noble',
  props<Noble>()
);

export const deleteNoble = createAction(
  '[Noble] Delete Noble',
  props<{ id: string }>()
);

export const updateNoble = createAction(
  '[Noble] Update Noble',
  props<Noble>()
);

export const fetchAllCities = createAction('[City] Fetch Cities');

export const setCities = createAction(
  '[City] Set Cities',
  props<{ cities: City[] }>()
);

export const createNewCity = createAction(
  '[City] Create a new City',
  props<City>()
);

export const deleteCity = createAction(
  '[City] Delete City',
  props<{ id: string }>()
);

export const updateCity = createAction(
  '[City] Update City',
  props<City>()
);

export interface AppState {
  continents: Continent[];
  kingdoms: Kingdom[];
  cities: City[];
  families: Family[];
  nobles: Noble[];
}

export const initialState: AppState = {
  continents: [],
  kingdoms: [],
  cities: [],
  families: [],
  nobles: [],
};

export const appReducer = createReducer(
  initialState,
  on(setNobles, (state, { nobles }) => ({ ...state, nobles })),
  on(setCities, (state, { cities }) => ({ ...state, cities })),
);

const selectAppState = createFeatureSelector<AppState>('app');

export const selectAllNobles = createSelector(
  selectAppState,
  (state) => state.nobles
);

export const selectNobleById = (id: string) =>
  createSelector(selectAllNobles, (nobles: Noble[]) =>
    nobles.find((noble) => noble._id === id)
);

export const selectAllCities = createSelector(
  selectAppState,
  (state) => state.cities
);

export const selectCityById = (id: string) =>
  createSelector(selectAllCities, (cities: City[]) =>
    cities.find((city) => city._id === id)
);

export const selectContinents = createSelector(
  selectAppState,
  (state) => state.continents
);

export const selectKingdoms = createSelector(
  selectAppState,
  (state) => state.kingdoms
);

export const selectKingdomByName = (kingdomName: string | null) =>
  createSelector(selectKingdoms, (kingdoms: Kingdom[]) =>
    kingdoms.find((kingdom) => kingdom.name === kingdomName)
);

@Injectable()
export class AppEffects {
  actions$ = inject(Actions);
  httpService = inject(HttpService);

  fetchNobles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchAllNobles),
      tap(() => console.log('Fetching nobles...')),
      switchMap(() =>
        this.httpService.fetchAllNobles()!.pipe(
          tap((nobles) => console.log('Fetched nobles:', nobles)),
          map((nobles) => setNobles({ nobles })),
          catchError((error) => {
            console.error('Error fetching nobles:', error);
            return of(setNobles({ nobles: [] }));
          })
        )
      )
    )
  );

  deleteNoble$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteNoble),
      mergeMap(({ id }) =>
        this.httpService.deleteNoble(id).pipe(
          mergeMap(() =>
            this.httpService.fetchAllNobles().pipe(
              map((nobles) => setNobles({ nobles })),
              catchError(() => of(setNobles({ nobles: [] })))
            )
          ),
          catchError(() => of(setNobles({ nobles: [] })))
        )
      )
    )
  );

  createNewNoble$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createNewNoble),
      mergeMap((noble) =>
        this.httpService.createNewNoble(noble).pipe(
          mergeMap(() =>
            this.httpService.fetchAllNobles().pipe(
              map((nobles) => setNobles({ nobles })),
              catchError(() => of(setNobles({ nobles: [] })))
            )
          ),
          catchError(() => of(setNobles({ nobles: [] })))
        )
      )
    )
  );

  updateNoble$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateNoble),
      mergeMap((noble) => {
        return this.httpService.updateNoble(noble).pipe(
          mergeMap(() =>
            this.httpService.fetchAllNobles().pipe(
              map((nobles) => setNobles({ nobles })),
              catchError(() => of(setNobles({ nobles: [] })))
            )
          ),
          catchError(() => of(setNobles({ nobles: [] })))
        )
      }
      )
    )
  );

  fetchCities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchAllCities),
      switchMap(() =>
        this.httpService.fetchAllCities().pipe(
          map((cities) => setCities({ cities })),
          catchError((error) => {
            console.error('Error fetching cities:', error);
            return of(setCities({ cities: [] }));
          })
        )
      )
    )
  );

  deleteCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCity),
      mergeMap(({ id }) =>
        this.httpService.deleteCity(id).pipe(
          mergeMap(() =>
            this.httpService.fetchAllCities().pipe(
              map((cities) => setCities({ cities })),
              catchError(() => of(setCities({ cities: [] })))
            )
          ),
          catchError(() => of(setCities({ cities: [] })))
        )
      )
    )
  );

  createNewCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createNewCity),
      mergeMap((city) =>
        this.httpService.createNewCity(city).pipe(
          mergeMap(() =>
            this.httpService.fetchAllCities().pipe(
              map((cities) => setCities({ cities })),
              catchError(() => of(setCities({ cities: [] })))
            )
          ),
          catchError(() => of(setCities({ cities: [] })))
        )
      )
    )
  );

  updateCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCity),
      mergeMap((city) =>
        this.httpService.updateCity(city).pipe(
          mergeMap(() =>
            this.httpService.fetchAllCities().pipe(
              map((cities) => setCities({ cities })),
              catchError(() => of(setCities({ cities: [] })))
            )
          ),
          catchError(() => of(setCities({ cities: [] })))
        )
      )
    )
  );
}
