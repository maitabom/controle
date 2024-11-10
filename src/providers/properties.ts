import Customer from "@/model/customer.type";
import Ticket from "@/model/ticket.type";
import { ReactNode } from "react";

export interface ModalContextData {
  visible: boolean;
  ticket: TicketInfo | undefined;
  handleModalVisible: () => void;
  setDetailTicket: (detail: TicketInfo) => void;
}

export interface ModelContextProviderData {
  children: ReactNode;
}

export interface TicketInfo {
  ticket: Ticket;
  customer: Customer | null;
}
