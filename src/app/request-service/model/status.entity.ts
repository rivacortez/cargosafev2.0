export class StatusEntity {
  id: number;
  name: string;

  constructor(data: { id?: number, name?: string }) {
    this.id = data.id || 0;
    this.name = data.name || '';
  }
}
