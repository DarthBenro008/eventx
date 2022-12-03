import "./EventDetailScreen.scss";
import React, { useEffect, useState } from "react";

import event_banner from "../../assets/event_banner.svg";
import back_icon from "../../assets/back_icon.svg";
import share_icon from "../../assets/share_icon.svg";
import location_card_icon from "../../assets/location_card_icon.svg";
import date_card_icon from "../../assets/date_card_icon.svg";
import ticket_card_icon from "../../assets/ticket_card_icon.svg";
import seat_card_icon from "../../assets/seat_card_icon.svg";
import ticket_list_icon from "../../assets/ticket_list_icon.svg";
import generic_icon from "../../assets/generic_icon.svg";
import guest_icon from "../../assets/guest_icon.svg";
import TicketListModal from "./TicketListModal";

export default function EventDetailScreen() {
  const [buyTicket, setBuyTicket] = useState(false);
  const eventData = {
    title: "ETHIndia",
    location: "India",
    category: "workshop",
    main_banner: "",
    card_banner: "",
    name: "StackOS deploying an App on Decloud Infra",
    date: "Sun, December 11, 2022",
    time: "3:30PM - 7:00PM",
    tickets: {
      gold: {
        num_of_tickets: 473,
        price: 499,
        claimables: ["samosa", "hoodie"],
        image: "",
      },
      platinum: {
        num_of_tickets: 473,
        price: 999,
        claimables: ["samosa", "hoodie", "merch"],
        image: "",
      },
    },
    address:
      "Rohini Le Meridien New Delhi Windsor Place Janpath New Delhi, DL 110001",
    short_description:
      "Event Will Present Information on How to Obtain USA Green Card Through Investment and Talk One-On-One With Immigration Attorneys.",
    long_description:
      "You are cordially invited to attend the USA EB-5 Expo taking place in Delhi on December 11th from 3.30 pm to 7.00 pm. This expo will present information about immigration to America through investment for you and your family. Have all of your Investment-based US immigration questions answered. You will get to meet with qualified US immigration attorneys who will give you personalized information on immigration options for you and your family. You will get information about multiple US-based investment opportunities which can help you and your family get Green Cards fast.",
    speakers: [
      { type: "speaker", name: "Rishabh", profile_pic: "" },
      { type: "host", name: "Hemanth", profile_pic: "" },
      { type: "host", name: "Harsh", profile_pic: "" },
    ],
  };
    const handleClose = () => {
      setBuyTicket(false);
    };
  return (
    <article
      style={{ filter: buyTicket ? "blur(5px)" : "none" }}
      className="eventdetailscreen"
    >
    <TicketListModal buyTicket={buyTicket} handleClose={handleClose}/>
      <section className="eventdetailscreen_header">
        <div className="eventdetailscreen_header_left">
          <div className="eventdetailscreen_header_left_back">
            <img alt="back" src={back_icon} />
          </div>
          <div className="eventdetailscreen_header_left_icon">
            {" "}
            <img alt="pfp" src={generic_icon} />
          </div>
          <div className="eventdetailscreen_header_left_details">
            <div className="eventdetailscreen_header_left_details_title">
              {eventData.title}
            </div>
            <div className="eventdetailscreen_header_left_details_subtitle">
              {eventData.location}
            </div>
          </div>
        </div>
        <div className="eventdetailscreen_header_right">
          <img src={share_icon} alt="share" />
        </div>
      </section>
      <div className="eventdetailscreen_banner">
        <img src={event_banner} alt="event banner" />
      </div>
      <section className="eventdetailscreen_maincontainer">
        <div className="eventdetailscreen_maincontainer_category">
          {eventData.category}
        </div>
        <div className="eventdetailscreen_maincontainer_title">
          {eventData.name}
        </div>
        <div className="eventdetailscreen_maincontainer_subtitle">
          {eventData.short_description}
        </div>
        <div className="eventdetailscreen_maincontainer_date">
          <img src={date_card_icon} alt="date" />
          <div className="eventdetailscreen_maincontainer_date_data">{`${eventData.date}, ${eventData.time}`}</div>
        </div>
        <div className="eventdetailscreen_maincontainer_ticketdetails">
          <div className="eventdetailscreen_maincontainer_ticketdetails_price">
            <img src={ticket_card_icon} alt="date" />
            <div className="eventdetailscreen_maincontainer_ticketdetails_price_data">{`${eventData.tickets.gold.price} onwards`}</div>
          </div>
          <div className="eventdetailscreen_maincontainer_ticketdetails_seats">
            <img src={seat_card_icon} alt="date" />
            <div className="eventdetailscreen_maincontainer_ticketdetails_seats_data">{`${eventData.tickets.gold.num_of_tickets} tickets left`}</div>
          </div>
        </div>
        <div className="eventdetailscreen_maincontainer_break"></div>
        <div className="eventdetailscreen_maincontainer_location">
          <img src={location_card_icon} alt="date" />
          <div className="eventdetailscreen_maincontainer_location_data">{`${eventData.address}`}</div>
        </div>
        <div className="eventdetailscreen_maincontainer_break"></div>
        <div className="eventdetailscreen_maincontainer_about">
          <div className="eventdetailscreen_maincontainer_about_title">
            About the Event
          </div>
          <div className="eventdetailscreen_maincontainer_about_description">{`${eventData.long_description}`}</div>
        </div>
        {eventData.speakers.length > 0 && (
          <div className="eventdetailscreen_maincontainer_speaker">
            <div className="eventdetailscreen_maincontainer_speaker_title">
              Host/Speakers
            </div>
            <div className="eventdetailscreen_maincontainer_speaker_cards">
              {eventData.speakers.map((speaker, index) => {
                return (
                  <div className="eventdetailscreen_maincontainer_speaker_cards_card">
                    <div className="rounded-full border-2">
                      <img className="w-full" src={guest_icon} alt="guest" />
                    </div>
                    <div className="eventdetailscreen_maincontainer_speaker_cards_card_title">
                      {speaker.name}
                    </div>
                    <div className="eventdetailscreen_maincontainer_speaker_cards_card_subtitle">
                      {speaker.type}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
      <section className="eventdetailscreen_footer">
        <div onClick={()=>{
            setBuyTicket(true);
        }} className="eventdetailscreen_footer_button">
          <img src={ticket_list_icon} alt="ticket" />
          <div className="eventdetailscreen_footer_button_text">TICKETS</div>
        </div>
      </section>
    </article>
  );
}
