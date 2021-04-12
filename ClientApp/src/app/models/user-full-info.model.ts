import { NumberValueAccessor } from "@angular/forms";
import { UserPublicInfo } from "./user-public-info.model";
import {Dog} from "./dog.model"

export interface UserFullInfo {
  id: number;
  name: string;
  tokenSub: string;
  dogs: Array<Dog>;
  friends: Array<number>;
  privacyLevel: string;
  park: number;
}


