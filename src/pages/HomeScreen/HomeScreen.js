import "./HomeScreen.scss";
import React, { useEffect, useState } from 'react'
// import SocialLogin from "@biconomy/web3-auth";
import { NotificationItem, chainNameType } from "@pushprotocol/uiweb";
import { Revise } from "revise-sdk";
import X_logo from "../../assets/X_logo.svg";
import share_icon from "../../assets/share_icon.svg";
import location_card_icon from "../../assets/location_card_icon.svg";
import date_card_icon from "../../assets/date_card_icon.svg";
import eventx_logo from "../../assets/eventx_logo_white.svg";
import landing_picture from "../../assets/landing_picture.svg";
import { useHistory } from "react-router-dom";



export default function HomeScreen() {
const history = useHistory();
  
  const eventsData = [
    {
      category: "Workshop",
      name: "Let's Hudddle with the Dapp list",
      location: "Bangalore",
      date: "Sat, 24th Dec",
    },
    {
      category: "Entertainment",
      name: "Let's Hudddle with the Dapp list",
      location: "Bangalore",
      date: "Sat, 24th Dec",
    },
    {
      category: "Hackathon",
      name: "Let's Hudddle with the Dapp list",
      location: "Bangalore",
      date: "Sat, 24th Dec",
    },
    {
      category: "Workshop",
      name: "Let's Hudddle with the Dapp list",
      location: "Bangalore",
      date: "Sat, 24th Dec",
    },
    {
      category: "Sports",
      name: "Let's Hudddle with the Dapp list",
      location: "Bangalore",
      date: "Sat, 24th Dec",
    },

  ];
  const [data,setData] = useState(eventsData);
  const [filterType, setFilterType] = useState("All");
  return (
    <article className="homescreen">
      <section className="homescreen_header">
        <div className="homescreen_header_logo">
          <img alt="eventx_logo" src={eventx_logo} />
          <div>Eventing made simpler</div>
        </div>
        <div className="homescreen_header_connect">
          <div onClick={()=>{
            history.push("/organizer/create");
          }} className="homescreen_header_connect_button">
            Create Event <img alt="x" src={X_logo} />
          </div>
          {/* <div class="dropdown-content">
            <a href="#">Register</a>
            <a href="#">Switch Profile</a>
          </div> */}
        </div>
      </section>
      <section className="homescreen_banner">
        <img alt="landing" src={landing_picture}/>
      </section>
      <section className="homescreen_categories">
        <div className="homescreen_categories_list">
          <div
            onClick={() => {
              setFilterType("All");
              setData(eventsData);
            }}
            style={
              filterType === "All"
                ? {
                    backgroundColor: "#FC3B7D",
                    border: "none",
                  }
                : {}
            }
            className="homescreen_categories_list_category"
          >
            ALL
          </div>
          {eventsData.length > 0
            ? eventsData.map((_event, index) => {
                return (
                  <div
                    onClick={() => {
                      setFilterType(_event.category);
                      setData(
                        eventsData.filter(
                          (data) => data.category === _event.category
                        )
                      );
                    }}
                    style={
                      filterType === _event.category
                        ? {
                            backgroundColor: "#FC3B7D",
                            border: "none",
                          }
                        : {}
                    }
                    className="homescreen_categories_list_category"
                  >
                    {_event.category}
                  </div>
                );
              })
            : null}
        </div>
        <div className="homescreen_categories_cards">
          {data.length > 0
            ? data.map((_event, index) => {
                return (
                  <div onClick={()=>{
                    history.push("/event/3322");
                  }} className="homescreen_categories_card">
                    <div className="homescreen_categories_card_image"></div>
                    <div className="homescreen_categories_card_details">
                      <div className="flex justify-between">
                        <div className="homescreen_categories_card_details_category">
                          {_event.category}
                        </div>
                        <img src={share_icon} alt="share" />
                      </div>
                      <div className="homescreen_categories_card_details_title">
                        {_event.name}
                      </div>
                      <div className="homescreen_categories_card_details_locdate">
                        <div className="flex">
                          <img
                            className="mr-1"
                            src={location_card_icon}
                            alt="location"
                          />{" "}
                          {_event.location}
                        </div>
                        <div className="flex ml-3">
                          <img
                            className="mr-1"
                            src={date_card_icon}
                            alt="date"
                          />
                          {_event.date}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </section>
    </article>
  );
}
