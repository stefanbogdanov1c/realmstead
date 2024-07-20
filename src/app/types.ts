export interface Kingdom {
  name: string;
  ruler?: Noble;
  rulerFamily?: Family;
  vassalFamilies?: Family[];
  capital?: City;
  description?: string;
}

export interface City {
  _id: string;
  name: string;
  population?: number;
  description?: string;
}

export interface Family {
  _id: string;
  name: string;
  rulerId?: string;
  founderId?: string;
  members?: string[];
  description?: string;
}

export interface Noble {
  _id: string;
  name: string;
  lastName: string;
  age: number;
  alive: boolean;
  gender: 'male' | 'female';
  fatherId?: string;
  motherId?: string;
  spouseId?: string;
  title?: string;
  nickname?: string;
  description?: string;
  picture?: string;
}
