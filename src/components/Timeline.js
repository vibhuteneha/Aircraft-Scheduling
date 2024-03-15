function Timeline({ aircraft }) {
  const blockedTime = [];
  let totaltime = 86400;
  function handleTimeLine() {
    let width = "100%";
    let color = "#bfbfbf";

    if (aircraft && aircraft.rotation && aircraft.rotation.length > 0) {
      aircraft.rotation.forEach((flight, index) => {
        if (index === 0) {
          // First flight
          width = findWidth(0, flight.departuretime);
          blockedTime.push({ width: width, color: color });
        }        

        // scheduled Flight time
        width = findWidth(flight.departuretime, flight.arrivaltime);
        color = "#82ac33";
        blockedTime.push({ width: width, color: color });

        // Turnaround time
        width = findWidth(0, 1200);
        color = "#462d86";
        blockedTime.push({ width: width, color: color });

        // Idle time
        if (index === aircraft.rotation.length - 1) {
          // Last flight
          width = findWidth((flight.arrivaltime + 1200), 86400);
        } else {
          width = findWidth(
            (flight.arrivaltime + 1200),
            aircraft.rotation[index + 1].departuretime
          );
        }
        color = "#bfbfbf";
        blockedTime.push({ width: width, color: color });
      });
    } else {
      blockedTime.push({ width: "100%", color: "#bfbfbf" });
    }
  }

  function findWidth(begin, end) {
    const width = ((end - begin) / totaltime) * 100;
    
    return width + "%";
  }

  return (
    <div className="timeline">
      <div className="timeline-values">
        <p>00:00</p>
        <p>06:00</p>
        <p>12:00</p>
        <p>18:00</p>
        <p>24:00</p>
      </div>
      <div className="progress-bar">
        {handleTimeLine()}
        {blockedTime.map((block, index) => {
          return (
            <div
              key={index}
              style={{ width: block.width, backgroundColor: block.color }}
            ></div>
          );
        })}
      </div>
      <div className="progress-values">
        <div>
          <div className="progress-value" style={{backgroundColor:"#82ac33"}}></div>
          <p>Scheduled</p>
        </div>
        <div>
          <div className="progress-value" style={{backgroundColor:"#462d86"}}></div>
          <p>Turnaround</p>
        </div>
        <div>
          <div className="progress-value" style={{backgroundColor:"#bfbfbf"}}></div>
          <p>Idle</p>
        </div>
      </div>
    </div>
  );
}

export default Timeline;
