import Customer from "@/model/customer.type";
import Ticket from "@/model/ticket.type";

export default interface TicketItemProperties {
  ticket: Ticket
  customer: Customer | null
}