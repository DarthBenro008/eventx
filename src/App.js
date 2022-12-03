import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen/HomeScreen";
import Footer from "./components/Footer/Footer";
import EventDetailScreen from "./pages/EventDetailScreen/EventDetailScreen";
import TicketScreen from "./pages/TicketScreen/TicketScreen";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route exact path = "/event/:id" component={EventDetailScreen}/>
        <Route exact path = "/ticket/:id" component={TicketScreen}/>
        {/* <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/signup" component={SignupScreen} />
        <Route exact path="/verify" component={VerifyOTPScreen} /> */}
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
