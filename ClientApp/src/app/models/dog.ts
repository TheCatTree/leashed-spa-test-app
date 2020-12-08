import { NumberValueAccessor } from "@angular/forms";

export interface KeyValuePair {
  id: number;
  name: string;
}

export interface Contact {
  name: string;
  phone: string;
  email: string;
}

export interface Vehicle {
  id: number;
  model: KeyValuePair;
  make: KeyValuePair;
  isRegistered: boolean;
  features: KeyValuePair[];
  contact: Contact;
  lastUpdate: string;
}

export interface SaveVehicle {
  id: number;
  modelId: number;
  makeId: number;
  isRegistered: boolean;
  features: number[];
  contact: Contact;
}

export interface dog {
  Id: number;
  name: string;
  UserDataId: number;
}

export interface User{
  Id: number;
  name: string;
}
