export class ProfileEntity {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  phone: string;
  city: string;
  country: string;
  biography: string;
  profileImageUrl: string;

  constructor(profile: {
    id?: number;
    userId?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    street?: string;
    phone?: string;
    city?: string;
    country?: string;
    biography?: string;
    profileImageUrl?: string;
  }) {
    this.id = profile.id ?? 0;
    this.userId = profile.userId ?? 0;
    this.firstName = profile.firstName || '';
    this.lastName = profile.lastName || '';
    this.email = profile.email || '';
    this.street = profile.street || '';
    this.phone = profile.phone || '';
    this.city = profile.city || '';
    this.country = profile.country || '';
    this.biography = profile.biography || '';
    this.profileImageUrl = profile.profileImageUrl || '';
  }
}
