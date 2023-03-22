import React, { useState } from "react";
import moment from "moment";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import useHistoryBill from "../utils/hooks/useHistoryBill";
import DetailBill from "../components/HistoryBill/DetailBill";
import MainBill from "../components/HistoryBill/MainBill";

export default function HistoryPage() {
  const [isDetailBill, handleOpenDetailBill, handleCloseDetailBill] =
    useHistoryBill();

  return (
    <div className="bill_history-wrapper">
      <div className="container">
        {isDetailBill ? (
          <DetailBill handleCloseDetailBill={handleCloseDetailBill} />
        ) : (
          <MainBill handleOpenDetailBill={handleOpenDetailBill} />
        )}
      </div>
      {/* <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
    </div>
  );
}
