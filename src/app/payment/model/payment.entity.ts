export class PaymentEntity {
  id: number;
  cardNumber: string;
  expiryDate: string;
  securityCode: string;
  entrepreneurId: number;
  userid: number;
   tripId: number;
  constructor(payment: {
    id?: number,
    card_number?: string,
    expiry_Date?: string,
    security_code?: string,
    entrepreneur_id?: number,
    userid?: number,
    tripId?: number;
  } = {}) {
    this.id = payment.id || 0;
    this.cardNumber = payment.card_number || '';
    this.expiryDate = payment.expiry_Date || '';
    this.securityCode = payment.security_code || '';
    this.entrepreneurId = payment.entrepreneur_id || 0;
    this.userid = payment.userid || 0;
    this.tripId = payment.tripId || 0;
  }
}
