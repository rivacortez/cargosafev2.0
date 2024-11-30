export class ProfileEntity {
  id: number;
  userId: number;
  bio: string;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  number: string;
  city: string;
  postalCode: string;
  country: string;

  constructor(profile: {
    id?: number;
    userId?: number;
    bio?: string;
    avatar?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    street?: string;
    number?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  }) {
    this.id = profile.id ?? 0;
    this.userId = profile.userId ?? 0;
    this.bio = profile.bio || '';
    this.avatar = profile.avatar || '';
    this.firstName = profile.firstName || '';
    this.lastName = profile.lastName || '';
    this.email = profile.email || '';
    this.street = profile.street || '';
    this.number = profile.number || '';
    this.city = profile.city || '';
    this.postalCode = profile.postalCode || '';
    this.country = profile.country || '';
  }
}
