import "./MyEventScreen.scss";
import React from 'react'
import share_icon from "../../assets/share_icon.svg";
import location_card_icon from "../../assets/location_card_icon.svg";
import date_card_icon from "../../assets/date_card_icon.svg";
import { useState } from 'react';
import { useHistory } from "react-router-dom";
export default function MyHostedEventScreen() {
  let history = useHistory();
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
      const [data, setData] = useState(eventsData);
  return (
    <article className="myeventscreen">
      <section className="myeventscreen_header">
        <div className="myeventscreen_header_title">My Hosted Events</div>
        <div className="myeventscreen_header_subtitle">
          Events Created by You
        </div>
      </section>
      <section className='myeventscreen_categories'>
        <div className="myeventscreen_categories_cards">
          {data.length > 0
            ? data.map((_event, index) => {
                return (
                  <div
                    onClick={() => {
                      history.push({
                        pathname: `/ticket/234e444545`,
                        event: eventsData,
                      });
                    }}
                    className="myeventscreen_categories_card"
                  >
                    <div className="myeventscreen_categories_card_image"></div>
                    <div className="myeventscreen_categories_card_details">
                      <div className="flex justify-between">
                        <div className="myeventscreen_categories_card_details_category">
                          {_event.category}
                        </div>
                        <img src={share_icon} alt="share" />
                      </div>
                      <div className="myeventscreen_categories_card_details_title">
                        {_event.name}
                      </div>
                      <div className="myeventscreen_categories_card_details_locdate">
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
