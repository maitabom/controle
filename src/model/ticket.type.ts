export default interface Ticket {
  id: string;
  name: string;
  status: string;
  created_at: Date | null;
  updated_at: Date | null;
  userId: string | null;
  customerId: string | null;
}
