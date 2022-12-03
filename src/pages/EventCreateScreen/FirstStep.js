import React from 'react'

export default function FirstStep({eventData, setEventData}) {
  return (
    <>
      <div className="inputContainer">
        <div className="inputContainer_title">What's your Event Name?</div>
        <input
          className="inputContainer_value"
          onChange={(e) =>
            setEventData({
              ...eventData,
              name: e.target.value,
            })
          }
          value={eventData.name}
        />
      </div>
      <div className="inputContainer">
        <div className="inputContainer_title">Event Type</div>
        <select
          onChange={(e) =>
            setEventData({
              ...eventData,
              category: e.target.value,
            })
          }
          value={eventData.name}
          className="inputContainer_value"
          name="category"
        >
          <option value={"Entertainment"}>Entertainment</option>
          <option value={"Sports"}>Sports</option>
          <option value={"Music"}>Music</option>
          <option value={"Hackathons"}>Hackathons</option>
        </select>
      </div>
      <div className="inputContainer">
        <div className="inputContainer_title">Name of Organizer/Company</div>
        <input
          onChange={(e) =>
            setEventData({
              ...eventData,
              title: e.target.title,
            })
          }
          value={eventData.title}
          className="inputContainer_value"
        />
      </div>
      <div className="inputContainer">
        <div className="inputContainer_title">
          Location of organizer/company
        </div>
        <input
          onChange={(e) =>
            setEventData({
              ...eventData,
              location: e.target.value,
            })
          }
          value={eventData.location}
          className="inputContainer_value"
        />
      </div>
    </>
  );
}
