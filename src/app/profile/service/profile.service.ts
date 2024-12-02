import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {ProfileEntity} from "../model/profile.entity";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProfileService  extends BaseService<ProfileEntity> {
  private urllll: string = 'https://api.cloudinary.com/v1_1/du35rv7mm/image/upload';
  constructor(private httpClient: HttpClient) {
    super();
    this.resourceEndpoint = '/profiles';
  }


  override getById(profileId: number): Observable<ProfileEntity> {
    return this.http.get<any>(`${this.baseUrl}/profiles/${profileId}`).pipe(
      map(response => {
        const [firstName, lastName] = response.fullName.split(' ');
        return new ProfileEntity({
          id: response.id,
          firstName: firstName,
          lastName: lastName,
          email: response.email,
          street: response.street,
          phone: response.phone,
          city: response.city,
          profileImageUrl: response.profileImageUrl,
          country: response.country,
          biography: response.biography
        });
      })
    );
  }

  override update(id: number, profile: ProfileEntity): Observable<ProfileEntity> {
    const requestPayload = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      street: profile.street,
      phone: profile.phone,
      city: profile.city,
      country: profile.country,
      biography: profile.biography,
      profileImageUrl: profile.profileImageUrl
    };
    return this.http.put<ProfileEntity>(`${this.resourcePath()}/${id}`, requestPayload, this.httOptions);
  }

  getByUserId(userId: number): Observable<ProfileEntity> {
    return this.http.get<ProfileEntity[]>(`${this.baseUrl}?userId=${userId}`).pipe(
      map(profiles => profiles[0])
    );
  }




  getByUsername(username: string): Observable<ProfileEntity> {
    return this.http.get<ProfileEntity>(`${this.baseUrl}/profiles/username/${username}`);
  }

  url:string= 'https://api.cloudinary.com/v1_1/du35rv7mm/image/upload';

  uploadImg(data: any): Observable<any> {
    return this.httpClient.post(this.urllll, data);
  }
}
