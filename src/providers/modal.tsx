"use client";

import { createContext, useState } from "react";
import ModalTicket from "@/components/modal";
import {
  ModalContextData,
  ModelContextProviderData,
  TicketInfo,
} from "./properties";


export const ModalContext = createContext({} as ModalContextData);

export const ModalProvider = ({ children }: ModelContextProviderData) => {
  const [visible, setVisible] = useState(false);
  const [ticket, setTicket] = useState<TicketInfo>();

  function handleModalVisible() {
    setVisible(!visible);
  }

  function setDetailTicket(detail: TicketInfo) {
    setTicket(detail);
  }

  return (
    <ModalContext.Provider value={{ visible, ticket, handleModalVisible, setDetailTicket }}>
      {visible && <ModalTicket />}
      {children}
    </ModalContext.Provider>
  );
};
