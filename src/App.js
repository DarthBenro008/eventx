import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen/HomeScreen";
import Footer from "./components/Footer/Footer";
import EventDetailScreen from "./pages/EventDetailScreen/EventDetailScreen";
import TicketScreen from "./pages/TicketScreen/TicketScreen";
import EventCreateScreen from "./pages/EventCreateScreen/EventCreateScreen";
import MyEventScreen from "./pages/MyEventScreen/MyEventScreen";
import MyHostedEventScreen from "./pages/MyHostedEventScreen/MyHostedEventScreen";
import EventManagementScreen from "./pages/MyHostedEventScreen/EventManagementScreen";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route exact path = "/event/:id" component={EventDetailScreen}/>
        <Route exact path = "/ticket/:id" component={TicketScreen}/>
        <Route exact path = "/organizer/create" component={EventCreateScreen}/>
        <Route exact path = "/myevents" component = {MyEventScreen}/>
        <Route exact path = "/organizer/events" component = {MyHostedEventScreen}/>
        <Route exact path = "/organizer/event/:id" component = {EventManagementScreen}/>

      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
