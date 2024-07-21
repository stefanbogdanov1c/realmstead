import {
  Store,
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';
import { Kingdom, City, Family, Noble } from './types';
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

export const fetchAllFamilies = createAction('[Family] Fetch Families');

export const setFamilies = createAction(
  '[Family] Set Families',
  props<{ families: Family[] }>()
);

export const createNewFamily = createAction(
  '[Family] Create a new Family',
  props<Family>()
);

export const deleteFamily = createAction(
  '[Family] Delete Family',
  props<{ id: string }>()
);

export const updateFamily = createAction(
  '[Kingdom] Update Family',
  props<Family>()
);

export const fetchAllKingdoms = createAction('[Family] Fetch Kingdoms');

export const setKingdoms = createAction(
  '[Kingdom] Set Kingdoms',
  props<{ kingdoms: Kingdom[] }>()
);

export const createNewKingdom = createAction(
  '[Kingdom] Create a new Kingdom',
  props<Kingdom>()
);

export const deleteKingdom = createAction(
  '[Kingdom] Delete Kingdom',
  props<{ id: string }>()
);

export const updateKingdom = createAction(
  '[Kingdom] Update Kingdom',
  props<Kingdom>()
);

export interface AppState {
  nobles: Noble[];
  cities: City[];
  families: Family[];
  kingdoms: Kingdom[];
}

export const initialState: AppState = {
  nobles: [],
  cities: [],
  families: [],
  kingdoms: [],
};

export const appReducer = createReducer(
  initialState,
  on(setNobles, (state, { nobles }) => ({ ...state, nobles })),
  on(setCities, (state, { cities }) => ({ ...state, cities })),
  on(setFamilies, (state, { families }) => ({ ...state, families })),
  on(setKingdoms, (state, { kingdoms }) => ({ ...state, kingdoms })),
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

export const selectAllFamilies = createSelector(
  selectAppState,
  (state) => state.families
);

export const selectFamilyById = (id: string) =>
  createSelector(selectAllFamilies, (families: Family[]) =>
    families.find((family) => family._id === id)
);

export const selectAllKingdoms = createSelector(
  selectAppState,
  (state) => state.kingdoms
);

export const selectKingdomById = (kingdomId: string | null) =>
  createSelector(selectAllKingdoms, (kingdoms: Kingdom[]) =>
    kingdoms.find((kingdom) => kingdom._id === kingdomId)
);

@Injectable()
export class AppEffects {
  actions$ = inject(Actions);
  httpService = inject(HttpService);

  fetchNobles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchAllNobles),
      switchMap(() =>
        this.httpService.fetchAllNobles().pipe(
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

  fetchFamilies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchAllFamilies),
      switchMap(() =>
        this.httpService.fetchAllFamilies().pipe(
          map((families) => setFamilies({ families })),
          catchError((error) => {
            console.error('Error fetching families:', error);
            return of(setFamilies({ families: [] }));
          })
        )
      )
    )
  );

  deleteFamily$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteFamily),
      mergeMap(({ id }) =>
        this.httpService.deleteFamily(id).pipe(
          mergeMap(() =>
            this.httpService.fetchAllFamilies().pipe(
              map((families) => setFamilies({ families })),
              catchError(() => of(setFamilies({ families: [] })))
            )
          ),
          catchError(() => of(setFamilies({ families: [] })))
        )
      )
    )
  );

  createNewFamily$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createNewFamily),
      mergeMap((family) =>
        this.httpService.createNewFamily(family).pipe(
          mergeMap(() =>
            this.httpService.fetchAllFamilies().pipe(
              map((families) => setFamilies({ families })),
              catchError(() => of(setFamilies({ families: [] })))
            )
          ),
          catchError(() => of(setFamilies({ families: [] })))
        )
      )
    )
  );

  updateFamily$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateFamily),
      mergeMap((family) => {
        return this.httpService.updateFamily(family).pipe(
          mergeMap(() =>
            this.httpService.fetchAllFamilies().pipe(
              map((families) => setFamilies({ families })),
              catchError(() => of(setFamilies({ families: [] })))
            )
          ),
          catchError(() => of(setFamilies({ families: [] })))
        )
      }
      )
    )
  );

  fetchKingdoms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchAllKingdoms),
      switchMap(() =>
        this.httpService.fetchAllKingdoms().pipe(
          map((kingdoms) => setKingdoms({ kingdoms })),
          catchError((error) => {
            console.error('Error fetching kingdoms:', error);
            return of(setKingdoms({ kingdoms: [] }));
          })
        )
      )
    )
  );

  deleteKingdom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteKingdom),
      mergeMap(({ id }) =>
        this.httpService.deleteKingdom(id).pipe(
          mergeMap(() =>
            this.httpService.fetchAllKingdoms().pipe(
              map((kingdoms) => setKingdoms({ kingdoms })),
              catchError(() => of(setKingdoms({ kingdoms: [] })))
            )
          ),
          catchError(() => of(setKingdoms({ kingdoms: [] })))
        )
      )
    )
  );

  createNewKingdom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createNewKingdom),
      mergeMap((kingdom) =>
        this.httpService.createNewKingdom(kingdom).pipe(
          mergeMap(() =>
            this.httpService.fetchAllKingdoms().pipe(
              map((kingdoms) => setKingdoms({ kingdoms })),
              catchError(() => of(setKingdoms({ kingdoms: [] })))
            )
          ),
          catchError(() => of(setKingdoms({ kingdoms: [] })))
        )
      )
    )
  );

  updateKingdom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateKingdom),
      mergeMap((kingdom) => {
        return this.httpService.updateKingdom(kingdom).pipe(
          mergeMap(() =>
            this.httpService.fetchAllKingdoms().pipe(
              map((kingdoms) => setKingdoms({ kingdoms })),
              catchError(() => of(setKingdoms({ kingdoms: [] })))
            )
          ),
          catchError(() => of(setKingdoms({ kingdoms: [] })))
        )
      }
      )
    )
  );
}
