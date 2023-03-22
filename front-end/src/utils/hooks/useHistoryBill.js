import React, { useState } from "react";

export default function useHistoryBill() {
  const [isDetailBill, setIsDetailBill] = useState(false);

  const handleOpenDetailBill = () => {
    setIsDetailBill(true);
  };

  const handleCloseDetailBill = () => {
    setIsDetailBill(false);
  };

  return [isDetailBill, handleOpenDetailBill, handleCloseDetailBill];
}
