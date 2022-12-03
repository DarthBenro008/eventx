import "./TicketScreen.scss";
import React from "react";
import QRCode from "react-qr-code";
import generic_icon from "../../assets/generic_icon.svg";
import location_card_icon from "../../assets/location_card_icon.svg";
import arrow_icon from "../../assets/arrow_icon.svg";
import mutate_picture from "../../assets/mutate_picture.svg";
import ticket_pass from "../../assets/ticket_pass.svg";

export default function TicketScreen() {
  const user = {
    name: "Rishabh Keshan",
  };
  const details = {
    organizer_name: "ETHIndia",
    organizer_country: "India",
    nft: {
      type: "Gold Pass",
    },
    event: {
      time: "16:00",
      date: "24th Feb 2023",
      location: "Bangalore",
      address:
        "Rohini Le Meridien New Delhi Windsor Place Janpath New Delhi, DL 110001",
    },
  };
  return (
    <article className="ticketDetailScreen">
      <div className="ticketDetailScreen_backgroundGradient">
        <img src={ticket_pass} alt="ticket pass" />
      </div>
      <section className="ticketDetailScreen_header">
        <img src={generic_icon} alt="profile" />
        <div className="ticketDetailScreen_header_title">
          {details.organizer_name}
        </div>
        <div className="ticketDetailScreen_header_subtitle">
          {details.organizer_country}
        </div>
        <div className="ticketDetailScreen_header_message">You are in!</div>
      </section>
      <section className="ticketDetailScreen_ticketdetails">
        <div className="ticketDetailScreen_ticketdetails_title">
          <div>Candidate Name</div>
          <div>Pass Type</div>
        </div>
        <div className="ticketDetailScreen_ticketdetails_value">
          <div>{user.name}</div>
          <div className="ticketDetailScreen_ticketdetails_value_highlight">
            {details.nft.type}
          </div>
        </div>
      </section>
      <section className="ticketDetailScreen_qrcontainer">
        <div className="ticketDetailScreen_qrcontainer_top">
          <div>Show the QR code at the time of check-in</div>
          <div className="p-4 rounded-lg bg-white">
            <QRCode size={164} value={user.name} />
          </div>
        </div>
        <div className="ticketDetailScreen_qrcontainer_bottom">
          <div className="flex flex-col items-start justify-start">
            <div className="ticketDetailScreen_qrcontainer_bottom_title">
              Entry Time
            </div>
            <div>{details.event.time} hrs</div>
          </div>
          <div>
            <div className="ticketDetailScreen_qrcontainer_bottom_title">
              Date
            </div>
            <div>{details.event.date} hrs</div>
          </div>

          <div>
            <div className="ticketDetailScreen_qrcontainer_bottom_title">
              Location
            </div>
            <div>{details.event.location}</div>
          </div>
        </div>
      </section>
      <div className="ticketDetailScreen_locationcontainer">
        <img src={location_card_icon} alt="date" />
        <div className="ticketDetailScreen_locationcontainer_data">{`${details.event.address}`}</div>
      </div>
      <section className="ticketDetailScreen_checklistcontainer">
        <div className="ticketDetailScreen_checklistcontainer_title">
          Complete your checklist before the event starts
        </div>
        <div className="ticketDetailScreen_checklistcontainer_networkingcontainer">
          <div className="ticketDetailScreen_checklistcontainer_networkingcontainer_left">
            <div className="ticketDetailScreen_checklistcontainer_networkingcontainer_left_title">
              Network and Mutate your NFT Ticket
            </div>
            <div className="ticketDetailScreen_checklistcontainer_networkingcontainer_left_subtitle">
              Talk to people around anonymously directly in our app
            </div>
            <div className="ticketDetailScreen_checklistcontainer_networkingcontainer_left_button">
              Create your profile{" "}
              <img className="ml-4" src={arrow_icon} alt="arrow" />
            </div>
          </div>
          <div className="ticketDetailScreen_checklistcontainer_networkingcontainer_right">
            <img src={mutate_picture} alt="network" />
          </div>
        </div>
      </section>
    </article>
  );
}
