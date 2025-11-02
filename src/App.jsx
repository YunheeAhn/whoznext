import { Grid } from "@mui/material";
import "./App.css";
import ContactForm from "./component/ContactForm";
import ContactList from "./component/ContactList";
import Navbar from "./component/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <section className="contents">
        <div className="inner add-contact">
          <ContactForm />
        </div>
        <div className="inner contact-list">
          <ContactList />
        </div>
      </section>
    </>
  );
}

export default App;
