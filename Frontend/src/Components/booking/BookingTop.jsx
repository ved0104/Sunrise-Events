import react from "react";

export default function BookingTop(){
    return(
        <div>
          <div className="text-center h-40 pt-15 mt">
              <h1 className="text-5xl font-medium">Book your dates for DECORATION</h1>
          </div>
          <div className="flex flex-row justify-center h-35">
              <div className="text-center mx-10 font-medium text-lg">
                  <h2>Mark the date in the Calender</h2>
              </div>
              <div className="text-center mx-10 font-medium text-lg">
                  <h2>Our expert will connect soon. Get ready to<br/>enjoy the best personalised shopping<br/>experience.</h2>
              </div>
              <div className="text-center mx-10 font-medium text-lg">
                  <h2>Now you may relax and let us<br/>to decorater your package of happiness.</h2>
              </div>
          </div>
        </div>
    )
}