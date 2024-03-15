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
            <div><h2 className="title">AlphaFlights</h2></div>
        </div>
        <div className="display-date">
            <button className="date-range">&#x2B9C;</button>
                <h1>{getDate()}</h1>
            <button className="date-range">&#x2B9E;</button>
        </div>
        <div className="empty-space"></div>
    </div>
  );
}

export default Header;  