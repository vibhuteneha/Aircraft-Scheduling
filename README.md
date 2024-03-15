# Aircraft Scheduling App - Neha V Miller

This project was created using ReactJS.

## To run this app

In the project directory, you'll need to run:

### `npm install`

followed by 

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Notes:

1. The Rotation Schedule is being created for tomorrow.
2. The first step is to select Aircraft. If you click on a flight before selecting an aircraft, an error message is shown.
3. When you select an aircraft the button is highlighted to show which aircraft is selected.
4. When the aircraft is selected and you start adding flights to rotation, the aircraft button changes the color and updated the utilization percentage.
5. As the flights are added to the rotation, the timeline bar is updated with the time duration of each flight along with the 20 minutes turnaround time. 
6. When a flight is added to the rotation, the flights list is updated to only show the flights whos origin matches the current flight's destination.
7. Scheduled time is shown in Green, Turnaround time is shown in purple and Idle time is shown in Gray.
8. You can edit the rotation by clicking on the flight to remove it.
9. Remove All Flights button removes all the flights from the Rotation.
