import { NumberValueAccessor } from "@angular/forms";
import { UserPublicInfo } from "./user-public-info.model"

export interface Park {
  id: number;
  name: string;
  isLeashed: string;
  roadFront: boolean;
  suburb: string;
  city: string;
  country:string;
  parkGoers: Array<UserPublicInfo>;
}


