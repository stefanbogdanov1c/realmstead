export interface Continent {
  name: string;
  kingdoms: Kingdom[];
  towns: number;
  castles: number;
  villages: number;
  description?: string;
}

export interface Kingdom {
  name: string;
  ruler?: Noble;
  rulerFamily?: Family;
  vassalFamilies?: Family[];
  capital?: City;
  description?: string;
}

export interface City {
  name: string;
  population?: number;
  rulerFamily?: Family;
  description?: string;
}

export interface Family {
  name: string;
  ruler?: Noble;
  founder?: Noble;
  members?: Noble[];
  description?: string;
}

export interface Noble {
  _id: string;
  name: string;
  lastName: string;
  age: number;
  alive: boolean;
  gender: 'male' | 'female';
  spouse?: Noble;
  children?: Noble[];
  parents?: Noble[];
  siblings?: Noble[];
  title?: string;
  nickname?: string;
  description?: string;
  picture?: string;
}
