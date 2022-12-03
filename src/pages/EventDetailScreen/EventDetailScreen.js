import React from 'react'

export default function EventDetailScreen() {
    const eventData = {
      title: "ETHIndia",
      location: "",
      category: "",
      name: "",
      date: "",
      time: "",
      tickets: {
        gold: {
          num_of_tickets: 473,
          price: 499,
          claimables: ["samosa", "hoodie"],
        },
        platinum: {
          num_of_tickets: 473,
          price: 499,
          claimables: ["samosa", "hoodie","merch"],
        },
      },
      address: "",
      short_description: "",
      long_description: "",
      speakers: [
        { type: "speaker", name: "", profile_pic: "" },
        { type: "host", name: "", profile_pic: "" },
      ],
    };
  return (
    <article className="eventdetailscreen">
      <section className="eventdetailscreen_header">
        <div className="eventdetailscreen_header_left">
          <div className="eventdetailscreen_header_left_back"></div>
          <div className="eventdetailscreen_header_left"></div>
          <div className="eventdetailscreen_header_left_details">
            <div className="eventdetailscreen_header_left"></div>
            <div className="eventdetailscreen_header_left"></div>
          </div>
        </div>
        <div className="eventdetailscreen_header_right"></div>
      </section>
    </article>
  );
}
