import "./EventDetailScreen.scss";
import React from 'react';
import Modal from "@mui/material/Modal";
import cross_icon from "../../assets/cross_icon.svg";
import ticket_pass from "../../assets/ticket_pass.svg";


export default function TicketListModal({buyTicket, handleClose}) {
 const tickets = [
   {
     price: 599,
     ticket_type: "Gold Pass",
     ticket_description: "One Day Access Pass",
     ticket_image: "",
     pricing_type: "MATIC",
   },
   {
     price: 799,
     ticket_type: "Diamond Pass",
     ticket_description: "Two Day Access Pass",
     ticket_image: "",
     pricing_type: "MATIC",
   },
   {
     price: 999,
     ticket_type: "Platinum Pass",
     ticket_description: "Three Day Access Pass",
     ticket_image: "",
     pricing_type: "MATIC",
   },
 ];
  return (
    <Modal
      open={buyTicket}
      onClose={handleClose}
      aria-labelledby="ticket-buy"
      aria-describedby="ticket-listing"
      className="fixed w-screen flex flex-col items-center bottom-0 z-50 outline-none rounded-t-lg bg-black p-4"
    >
      <>
        <div className="flex flex-row justify-between w-full mb-8">
          <div
            style={{
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "162%",
            }}
          >
            Event Tickets
          </div>
          <div onClick={handleClose}>
            <img src={cross_icon} alt="cross" />
          </div>
        </div>
        {tickets.map((ticket, index) => {
          return (
            <div className="flex w-full mb-4">
              <div className="w-32 bg-red-500 mr-8">
                <img className="w-100" src={ticket_pass} alt="ticket pass" />
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: "18px",
                    lineHeight: "135%",
                  }}
                  className=""
                >
                  {ticket.ticket_type}
                </div>
                <div
                  style={{
                    color: "rgba(255, 255, 255, 0.5)",
                    letterSpacing: "0.04em",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "161%",
                  }}
                  className=""
                >
                  {ticket.ticket_description}
                </div>
                <div className="mt-6 flex w-fit justify-center items-center font-bold" style={{background:"#FC3B7D",borderRadius:"2px", border:"1.5px solid #000000", padding:"8px 12px"}}>
                  {`${ticket.price} ${ticket.pricing_type}`}
                </div>
              </div>
            </div>
          );
        })}
      </>
    </Modal>
  );
}
