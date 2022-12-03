import React from "react";

export default function ThirdStep({ eventData, setEventData }) {
  return (
    <>
      <div className="inputContainer">
        <div className="inputContainer_title">Where is the event?</div>
        <input
          onChange={(e) =>
            setEventData({
              ...eventData,
              address: e.target.value,
            })
          }
          value={eventData.address}
          className="inputContainer_value"
        />
      </div>
      <div className="inputContainer">
        <div className="inputContainer_title">Date of the event</div>
        <input
          onChange={(e) =>
            setEventData({
              ...eventData,
              date: e.target.value,
            })
          }
          value={eventData.date}
          className="inputContainer_value"
        />
      </div>
      <div className="inputContainer">
        <div className="inputContainer_title">Time of the event</div>
        <input
          onChange={(e) =>
            setEventData({
              ...eventData,
              time: e.target.value,
            })
          }
          value={eventData.time}
          className="inputContainer_value"
        />
      </div>
    </>
  );
}
