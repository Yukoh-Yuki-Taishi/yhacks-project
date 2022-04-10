import { Link } from "react-router-dom";

function StartPage() {
    return (
      <div>
        <br/>
        <h1>Welcome to Agenda.ly</h1>
        <br/>
        
        <h2>Settings</h2>
        <label for="volume">Suggestion Volume:</label>
        <select name="volume" id="volume">
          <option value="1">1 (default)</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select><br/>

        <label for="volume">Summarization</label>
        <select name="volume" id="volume">
          <option value="1">10% (default)</option>
          <option value="2">20%</option>
          <option value="3">100 words</option>
          <option value="4">200 words</option>
        </select><br/>

        <h2>Click the hamster to make it run!</h2>
        <Link to="voice" ><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGIBhhDHrzEcMICPmNck6xFQWLDP3aix4SDg&usqp=CAU"/></Link>

        {/* <Link to="contact">Click to view our contact page</Link> */}
      </div>
    );
  }
  
export default StartPage;