import "./EventManagementScreen.scss";
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

export default function EventManagementScreen() {
  const [buyTicket, setBuyTicket] = useState(false);
  const [active, setActive] = useState("scan");
  const [payMethod, setPayMethod] = useState("polygon");
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
      className="eventmanagementscreen"
    >
      <section className="eventmanagementscreen_header">
        <div className="eventmanagementscreen_header_left">
          <div className="eventmanagementscreen_header_left_back">
            <img alt="back" src={back_icon} />
          </div>
          <div className="eventmanagementscreen_header_left_icon">
            {" "}
            <img alt="pfp" src={generic_icon} />
          </div>
          <div className="eventmanagementscreen_header_left_details">
            <div className="eventmanagementscreen_header_left_details_title">
              {eventData.title}
            </div>
            <div className="eventmanagementscreen_header_left_details_subtitle">
              {eventData.location}
            </div>
          </div>
        </div>
        <div className="eventmanagementscreen_header_right">
          <img src={share_icon} alt="share" />
        </div>
      </section>
      <section className="eventmanagementscreen_maincontainer">
        <div className="eventmanagementscreen_maincontainer_category">
          {eventData.category}
        </div>
        <div className="eventmanagementscreen_maincontainer_title">
          {eventData.name}
        </div>
        <div className="eventmanagementscreen_maincontainer_date">
          <img src={date_card_icon} alt="date" />
          <div className="eventmanagementscreen_maincontainer_date_data">{`${eventData.date}, ${eventData.time}`}</div>
        </div>
        <div className="eventmanagementscreen_maincontainer_ticketdetails">
          <div className="eventmanagementscreen_maincontainer_ticketdetails_price">
            <img src={ticket_card_icon} alt="date" />
            <div className="eventmanagementscreen_maincontainer_ticketdetails_price_data">{`${eventData.tickets.gold.price} onwards`}</div>
          </div>
          <div className="eventmanagementscreen_maincontainer_ticketdetails_seats">
            <img src={seat_card_icon} alt="date" />
            <div className="eventmanagementscreen_maincontainer_ticketdetails_seats_data">{`${eventData.tickets.gold.num_of_tickets} tickets left`}</div>
          </div>
        </div>
        <div className="eventmanagementscreen_maincontainer_break"></div>
        <div className="eventmanagementscreen_maincontainer_location">
          <img src={location_card_icon} alt="date" />
          <div className="eventmanagementscreen_maincontainer_location_data">{`${eventData.address}`}</div>
        </div>
        <div className="eventmanagementscreen_maincontainer_break"></div>
        <div className="eventmanagementscreen_maincontainer_statistics">
          <div className="eventmanagementscreen_maincontainer_statistics_menu">
            {" "}
            <div
              onClick={() => {
                setActive("scan");
              }}
              style={active === "scan" ? { backgroundColor: "gray" } : null}
              className="eventmanagementscreen_maincontainer_statistics_menu_items"
            >
              Organizing
            </div>
            <div
              onClick={() => {
                setActive("payouts");
              }}
              style={active === "payouts" ? { backgroundColor: "gray" } : null}
              className="eventmanagementscreen_maincontainer_statistics_menu_items"
            >
              Manage Payouts
            </div>
          </div>
          {active === "scan" && (
            <div className="eventmanagementscreen_maincontainer_statistics_cards flex flex-col">
              <div className="eventmanagementscreen_maincontainer_statistics_cards_card">
                <div className="eventmanagementscreen_maincontainer_statistics_cards_card_title">
                  Open QR Code Scanner to check in folks
                </div>
                <div className="eventmanagementscreen_maincontainer_statistics_cards_card_button">
                  OPEN QR CODE
                </div>
              </div>
              <div className="eventmanagementscreen_maincontainer_statistics_cards_card">
                <div className="eventmanagementscreen_maincontainer_statistics_cards_card_title">
                  Start distributing claimables by scanning QR
                </div>
                <div className="eventmanagementscreen_maincontainer_statistics_cards_card_button">
                  OPEN QR CODE
                </div>
              </div>
            </div>
          )}
          {active === "payouts" && (
            <div className="eventmanagementscreen_maincontainer_statistics_payout">
              <div className="eventmanagementscreen_maincontainer_statistics_payout_menu">
                <div
                  onClick={() => {
                    setPayMethod("polygon");
                  }}
                  style={
                    payMethod === "polygon"
                      ? { backgroundColor: "purple" }
                      : null
                  }
                  className="eventmanagementscreen_maincontainer_statistics_menu_items"
                >
                  Pay by Polygon
                </div>
                <div
                  onClick={() => {
                    setPayMethod("zkBob");
                  }}
                  style={
                    payMethod === "zkBob" ? { backgroundColor: "purple" } : null
                  }
                  className="eventmanagementscreen_maincontainer_statistics_menu_items"
                >
                  Pay by ZKBob
                </div>
              </div>
              <input label="Amount"/>
              <input label="Address"/>
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
