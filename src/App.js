import logo from "./logo.svg";
import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen/HomeScreen";
import Footer from "./components/Footer/Footer";
import TestScreen from "./pages/TestScreen/TestScreen";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route exact path=      "/test" component={TestScreen} />
        {/* <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/signup" component={SignupScreen} />
        <Route exact path="/verify" component={VerifyOTPScreen} /> */}
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
