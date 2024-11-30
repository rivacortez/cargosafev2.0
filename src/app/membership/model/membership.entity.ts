export class MembershipEntity {
  id: number;
  type: string;
  price: number;
  duration: number;
  description: string;

  constructor(membership: { id?: number; type?: string; price?: number; duration?: number; description?: string }) {
    this.id = membership.id || 0;
    this.type = membership.type || '';
    this.price = membership.price || 0;
    this.duration = membership.duration || 0;
    this.description = membership.description || '';
  }
}
