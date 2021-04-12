import {Dog} from './dog.model';
import {UserPublicInfo} from "./user-public-info.model"


export interface PictureInfo {
  id: number;
  key: string;
  isPublic: boolean;
  fileName:string;
  ownerId:number;
  dogsInpicture:Array<Dog>;
  canRead:Array<UserPublicInfo>;
  canEdit:Array<UserPublicInfo>;



}
