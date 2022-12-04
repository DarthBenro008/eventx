import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import eventx_logo from "../../assets/eventx_logo.svg";
import { QrReader } from "react-qr-reader";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { useSnackbar } from "notistack";
import Api from "../../utils/api";

export default function RedeemableScanModal({ showRedeemScanner, setShowRedeemScanner }) {
  const [data, setData] = useState("No result");
  const api = new Api(localStorage.getItem("jwt"));

  const { enqueueSnackbar } = useSnackbar();
  const showErrorSnack = (message) => {
    enqueueSnackbar(message, {
      variant: "error",
      preventDuplicate: true,
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };
  const showSuccessSnack = (message) => {
    enqueueSnackbar(message, {
      variant: "success",
      preventDuplicate: true,
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };
  const handleData = async (payload) => {
    if (payload.ticket_id) {
      console.log("hi");
      if (payload.claimable) {
        const resp = await api.claim(payload);
        if (resp.status) {
          showSuccessSnack(resp.data);
        }
      } else {
        const resp = await api.markAttendance(payload);
        if (resp.status) {
          showSuccessSnack(resp.data);
        }
      }
    }
  };
  return (
    <Modal
      open={showRedeemScanner}
      aria-labelledby="loader"
      aria-describedby="loading"
      className="align-middle justify-center items-center outline-none justify-items-center flex h-screen"
    >
      <div className="outline-none h-80 w-80 flex flex-col justify-center items-center">
        {/* <QrReader
          scanDelay={5000}
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
              console.log(result?.text);
              showSuccessSnack(result?.text);
            }
            if (!!error) {
              console.info(error);
            }
          }}
          style={{ width: "100%" }}
        /> */}
        <BarcodeScannerComponent
          width={500}
          height={500}
          delay={3000}
          onUpdate={(err, result) => {
            if (result) {
              showSuccessSnack("Scanned, please wait!");
              handleData(JSON.parse(result?.text));
              console.log(result?.text);
              setData(result?.text);
            } else setData("Not Found");
          }}
        />
        <div
          className="font-bold text-xl underline"
          onClick={() => {
            setShowRedeemScanner(false);
          }}
        >
          Close
        </div>
      </div>
    </Modal>
  );
}
