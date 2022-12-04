import Axios from "axios";
export default class Api {
  backendURL = "https://ebpf-master.westus3.cloudapp.azure.com";
  async signup(signupData) {
    try {
      const resp = await Axios({
        method: "post",
        url: this.backendURL + `/auth/login`,
        data: signupData,
      });
      if (resp.status === 204) {
        const response = { status: true, alreadySent: true };
        return response;
      } else return resp.data;
    } catch (err) {
      if (!err.response) {
        return "err";
      }
      if (err.response.status === 204) {
        const response = { status: true, alreadySent: true };
        return response;
      }
      if (err.response.status === 500 || err.response.status === 401) {
        return "err";
      }
      return err.response.data;
    }
  }
  async walletUpdate(walletData) {
    try {
      const resp = await Axios({
        method: "post",
        url: this.backendURL + `/user/wallet`,
        data: walletData,
      });
      return resp.data;
    } catch (err) {
      if (!err.response) {
        return "err";
      }
      if (err.response.status === 500 || err.response.status === 401) {
        return "err";
      }
      return err.response.data;
    }
  }
  async getProfile() {
    try {
      const resp = await Axios({
        method: "get",
        url: this.backendURL + `/user/profile`,
        headers: {
          Authorization: `Bearer ${this.jwt}`,
        },
      });
      return resp.data;
    } catch (err) {
      if (!err.response) {
        return "err";
      }
      if (err.response.status === 500 || err.response.status === 401) {
        return "err";
      }
      return err.response.data;
    }
  }
  async verify(OTPData) {
    try {
      const resp = await Axios({
        method: "post",
        url: this.backendURL + `/auth/verify`,
        data: OTPData,
      });
      return resp.data;
    } catch (err) {
      if (!err.response) {
        return "err";
      }
      if (err.response.status === 500 || err.response.status === 400) {
        return "err";
      }
      return err.response.data;
    }
  }
  async addEvent(eventData) {
    try {
      const resp = await Axios({
        method: "post",
        url: this.backendURL + `/org/event`,
        data: eventData,
      });
      return resp.data;
    } catch (err) {
      if (!err.response) {
        return "err";
      }
      if (err.response.status === 500 || err.response.status === 401) {
        return "err";
      }
      return err.response.data;
    }
  }
  async getOrgEvent() {
    try {
      const resp = await Axios({
        method: "get",
        url: this.backendURL + `/org/event`,
      });
      return resp.data;
    } catch (err) {
      if (!err.response) {
        return "err";
      }
      if (err.response.status === 500 || err.response.status === 401) {
        return "err";
      }
      return err.response.data;
    }
  }

  async getAllEvents() {
    try {
      const resp = await Axios({
        method: "get",
        url: this.backendURL + `/user/events`,
      });
      return resp.data;
    } catch (err) {
      if (!err.response) {
        return "err";
      }
      if (err.response.status === 500 || err.response.status === 401) {
        return "err";
      }
      return err.response.data;
    }
  }

  async getEvent(eventId) {
    try {
      const resp = await Axios({
        method: "get",
        url: this.backendURL + `/user/event/${eventId}`,
      });
      return resp.data;
    } catch (err) {
      if (!err.response) {
        return "err";
      }
      if (err.response.status === 500 || err.response.status === 401) {
        return "err";
      }
      return err.response.data;
    }
  }
  async getTicket(ticketID) {
    try {
      const resp = await Axios({
        method: "get",
        url: this.backendURL + `/user/ticket/${ticketID}`,
      });
      return resp.data;
    } catch (err) {
      if (!err.response) {
        return "err";
      }
      if (err.response.status === 500 || err.response.status === 401) {
        return "err";
      }
      return err.response.data;
    }
  }
  async getQRSecret() {
    try {
      const resp = await Axios({
        method: "get",
        url: this.backendURL + `/user/qr`,
      });
      return resp.data;
    } catch (err) {
      if (!err.response) {
        return "err";
      }
      if (err.response.status === 500 || err.response.status === 401) {
        return "err";
      }
      return err.response.data;
    }
  }
  async markAttendance(ticketID) {
    try {
      const resp = await Axios({
        method: "post",
        url: this.backendURL + `/org/qr`,
        data: ticketID,
      });
      return resp.data;
    } catch (err) {
      if (!err.response) {
        return "err";
      }
      if (err.response.status === 500 || err.response.status === 401) {
        return "err";
      }
      return err.response.data;
    }
  }
  async claim(ticketID) {
    try {
      const resp = await Axios({
        method: "post",
        url: this.backendURL + `/org/claim`,
        data: ticketID,
      });
      return resp.data;
    } catch (err) {
      if (!err.response) {
        return "err";
      }
      if (err.response.status === 500 || err.response.status === 401) {
        return "err";
      }
      return err.response.data;
    }
  }



  async getTickets() {
    try {
      const resp = await Axios({
        method: "get",
        url: this.backendURL + `/user/tickets`,
      });
      return resp.data;
    } catch (err) {
      if (!err.response) {
        return "err";
      }
      if (err.response.status === 500 || err.response.status === 401) {
        return "err";
      }
      return err.response.data;
    }
  }
}
