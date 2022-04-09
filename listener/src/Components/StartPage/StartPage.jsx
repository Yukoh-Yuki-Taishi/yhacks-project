import { Link } from "react-router-dom";

function StartPage() {
    return (
      <div>
        <h1>This is the Start page</h1>
        <h2>Click to start recording</h2>
        <Link to="voice" >Click to start recording</Link>
        {/* <Link to="contact">Click to view our contact page</Link> */}
      </div>
    );
  }
  
export default StartPage;
  