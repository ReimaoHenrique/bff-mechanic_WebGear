export interface Company {
  id: number;
  publicId: string;
  name: string;
  createdAt: Date;
  createdBy?: number | null;
}
