import React from "react";

export default function SecondStep({ eventData, setEventData }) {
  return (
    <>
      <div className="inputContainer">
        <div className="inputContainer_title">Event Gist</div>
        <textarea
          onChange={(e) =>
            setEventData({
              ...eventData,
              short_description: e.target.value,
            })
          }
          value={eventData.short_description}
          rows={4}
          className="inputContainer_value"
        />
      </div>
      <div className="inputContainer">
        <div className="inputContainer_title">
          Elaborate on your event(Including T&C)
        </div>
        <textarea
          onChange={(e) =>
            setEventData({
              ...eventData,
              long_description: e.target.value,
            })
          }
          value={eventData.long_description}
          rows={9}
          className="inputContainer_value"
        />
      </div>
    </>
  );
}
