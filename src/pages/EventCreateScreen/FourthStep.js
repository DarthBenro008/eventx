import React from "react";
import NFTDropzone from "./NFTDropzone";
import plus_icon from "../../assets/plus_icon.svg";

export default function ThirdStep({ eventData, setEventData }) {
  return (
    <>
      <div
        style={{ fontSize: "18px" }}
        className="inputContainer_title flex justify-between mb-6"
      >
        <div>Ticket Tiers</div>
        <div
          onClick={() => {
            setEventData({
              ...eventData,
              tickets: [
                ...eventData.tickets,
                {
                  type: "",
                  num_of_tickets: 0,
                  price: 0,
                  claimables: [],
                  image: "",
                },
              ],
            });
          }}
          className="underline"
        >
          Add new
        </div>
      </div>
      {eventData.tickets.map((ticket, index) => {
        return (
          <>
            <div className="inputContainer_header uppercase bold py-3">
              Ticket Tier {index + 1}
            </div>
            <div className="inputContainer">
              <div className="inputContainer_title">Ticket Image</div>
              <NFTDropzone height="h-80" />
            </div>
            <div className="inputContainer">
              <div className="inputContainer_title">Ticket Price</div>
              <input
                onChange={(e) =>
                  setEventData({
                    ...eventData,
                    tickets: eventData.tickets.map((el, i) =>
                      i === index ? { ...el, price: e.target.value } : el
                    ),
                  })
                }
                value={ticket.price}
                className="inputContainer_value"
              />
            </div>
            <div className="inputContainer">
              <div className="inputContainer_title">No. of tickets</div>
              <input
                onChange={(e) =>
                  setEventData({
                    ...eventData,
                    tickets: eventData.tickets.map((el, i) =>
                      i === index
                        ? { ...el, num_of_tickets: e.target.value }
                        : el
                    ),
                  })
                }
                value={ticket.num_of_tickets}
                className="inputContainer_value"
              />
            </div>
            <div className="inputContainer">
              <div className="inputContainer_title">Name of the ticket</div>
              <input
                onChange={(e) =>
                  setEventData({
                    ...eventData,
                    tickets: eventData.tickets.map((el, i) =>
                      i === index ? { ...el, type: e.target.value } : el
                    ),
                  })
                }
                value={ticket.type}
                className="inputContainer_value"
              />
            </div>
            <div className=" flex flex-row justify-between">
              <div className="inputContainer_title">Claimables</div>
              <div
                onClick={() => {
                //   setEventData({
                //     ...eventData,
                //     tickets: [
                //       ...eventData.tickets,
                //       { ...ticket, claimables: [...ticket.claimables, ""] },
                //     ],
                //   });
                
                  eventData.tickets[index].claimables.push("")
                  console.log(eventData)
                  setEventData({...eventData});
                }}
                className="ml-4"
              >
                <img src={plus_icon} alt="plus" />
              </div>
            </div>
            {ticket.claimables.map((value, i) => {
              return (
                <input
                  className="inputContainer_value"
                  value={value}
                  onChange={(e) => {
                    eventData.tickets[index].claimables[i] = e.target.value;
                    setEventData({ ...eventData });
                  }
                    
                    // setEventData({
                    //   ...eventData,
                    //   tickets: [
                    //     ...eventData.tickets,
                    //     {
                    //       ...ticket,
                    //       claimables: ticket.claimable.map((el, i) =>
                    //         i === index ? e.target.value : el
                    //       ),
                    //     },
                    //   ],
                    // })
                  }
                  label={`Enter Claimable ${index + 1}`}
                />
              );
            })}
          </>
        );
      })}
    </>
  );
}
