function Header() {
    function getDate() {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        const tomorrow = today.toDateString();
        
        return `${tomorrow}`;
    }
  return (
    <div className="header">
        <div className="display-logo">
            <div>
                <img src="../aircraft.png" alt="logo" />
            </div>
            <div><h2 className="title">MillerFlights</h2></div>
        </div>
        <div className="display-date">
            <button className="date-range left">&#10148;</button>
                <h1>{getDate()}</h1>
            <button className="date-range">&#10148;</button>
        </div>
        <div className="empty-space"></div>
    </div>
  );
}

export default Header;  