import "./EventCreateScreen.scss";
import React from "react";
import { useState } from "react";
import FirstStep from "./FirstStep";
import back_filled_icon from "../../assets/back_filled_icon.svg";
import back_icon from "../../assets/back_icon.svg";
import continue_button from "../../assets/continue_button.svg";
import publish_button from "../../assets/publish_button.svg";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import FourthStep from "./FourthStep";

export default function EventCreateScreen() {
  const data = {
    title: "ETHIndia",
    location: "India",
    category: "",
    main_banner: "",
    card_banner: "",
    name: "StackOS deploying an App on Decloud Infra",
    date: "Sun, December 11, 2022",
    time: "3:30PM - 7:00PM",
    tickets: [
       {
        type: "gold",
        num_of_tickets: 473,
        price: 499,
        claimables: ["samosa", "hoodie"],
        image: "",
      },
    ],
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

  const [eventData, setEventData] = useState(data);
  const [step, setStep] = useState(1);

  return (
    <article className="eventcreatescreen">
      <div className="p-4">
        <section className="eventcreatescreen_header">
          <img src={back_icon} alt="back" />
          Event Creation
        </section>
        <div className="eventcreatescreen_steppercontainer">
          <div className="eventcreatescreen_steppercontainer_bubble">
            {step}
          </div>
          <div className="eventcreatescreen_steppercontainer_text">
            {step === 1
              ? "Tell us something about your event"
              : step === 2
              ? "Describe your event in detail"
              : step === 3
              ? "What, Where and Why of the event"
              : step === 4
              ? "Pricing and Planning"
              : "Pricing and Planning"}
          </div>
          <div className="break"></div>
        </div>
        {step === 1 && (
          <FirstStep eventData={eventData} setEventData={setEventData} />
        )}
        {step === 2 && (
          <SecondStep eventData={eventData} setEventData={setEventData} />
        )}
        {step === 3 && (
          <ThirdStep eventData={eventData} setEventData={setEventData} />
        )}
        {step === 4 && (
          <FourthStep eventData={eventData} setEventData={setEventData} />
        )}
      </div>
      <section className="eventcreatescreen_footer">
        {step !== 1 && (
          <div
            onClick={() => {
              setStep(step - 1);
            }}
          >
            <img alt="back button" src={back_filled_icon} />
          </div>
        )}
        <div
          onClick={() => {
            setStep(step + 1);
          }}
        >
          <img src= {step===4?publish_button:continue_button} alt="continue" />
        </div>
      </section>
    </article>
  );
}

