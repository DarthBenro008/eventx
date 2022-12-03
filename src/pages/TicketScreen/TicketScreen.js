import "./TicketScreen.scss";
import React from "react";
import QRCode from "react-qr-code";
import generic_icon from "../../assets/generic_icon.svg";
import location_card_icon from "../../assets/location_card_icon.svg";
import arrow_icon from "../../assets/arrow_icon.svg";
import claimed_icon from "../../assets/claimed_icon.svg";
import unclaimed_icon from "../../assets/unclaimed_icon.svg";
import mutate_picture from "../../assets/mutate_picture.svg";
import ticket_pass from "../../assets/ticket_pass.svg";
import merch_picture from "../../assets/merch_picture.svg";
import map_icon from "../../assets/map_icon.svg";

export default function TicketScreen() {
  const user = {
    name: "Rishabh Keshan",
  };
  const details = {
    organizer_name: "ETHIndia",
    organizer_country: "India",
    nft: {
      type: "Gold Pass",
      claimables: [
        { name: "Lunch Coupon", location: "Hall A, Counter 2", claimed: true },
        {
          name: "ETHIndia Merch and Stickers",
          location: "Hall B Desk",
          claimed: false,
        },
        {
          name: "Evening Snacks",
          location: "Outside the main hall",
          claimed: false,
        },
      ],
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
      <section className="ticketDetailScreen_claimcontainer">
        <div className="ticketDetailScreen_claimcontainer_header">
          <div className="ticketDetailScreen_claimcontainer_header_left">
            <div className="ticketDetailScreen_claimcontainer_header_left_title">
              Claim what's yours 🤩
            </div>
            <div className="ticketDetailScreen_claimcontainer_header_left_subtitle">
              You can claim your merch anytime by scanning the QR Code
            </div>
          </div>
          <div className="ticketDetailScreen_claimcontainer_header_right">
            <img src={merch_picture} alt="merch" />
          </div>
        </div>
        <div className="ticketDetailScreen_claimcontainer_title">
          Your Checklist
        </div>
        {details.nft.claimables.map((claimable, index) => {
          return (
            <div className="ticketDetailScreen_claimcontainer_card">
              <div className="ticketDetailScreen_claimcontainer_card_icon">
                <img
                  alt="claimable"
                  src= {claimable.claimed ? claimed_icon : unclaimed_icon}
                />
              </div>
              <div className="ticketDetailScreen_claimcontainer_card_details">
                <div className="ticketDetailScreen_claimcontainer_card_details_name">
                  {claimable.name}
                </div>
                <div className="ticketDetailScreen_claimcontainer_card_details_location">
                  <img src={map_icon} alt="map" /> {claimable.location}
                </div>
              </div>
            </div>
          );
        })}
        <div className="ticketDetailScreen_claimcontainer_button">
          SHOW QR TO CLAIM
        </div>
      </section>
    </article>
  );
}
