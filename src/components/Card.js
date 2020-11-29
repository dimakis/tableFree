import React, {useContext} from "react";
import { AuthContext } from "../App";

export const Card = ({ table }) => {
  const context = useContext(AuthContext)
  
  for (var ts of table.timeSlots)  {
    var timeSlots =[]
    timeSlots.push(ts)
    console.log("timeSlot: " + ts.time + " isBooked? " + ts.isBooked)
  }
    
  return (
    <div className="card">

      {/* <div className="content"> */}
      {console.log(table.id)}
      {/* {console.log(table)} */}
      
        <h2>Table: {table.id}</h2>
        <span>Time: {ts.time}</span>
        <span>isBooked?: {ts.isBooked.toString()}</span>
        <>
        {/* {table.timeSlots.time.map( ts =>  */}
        {/* <p key={ts.time.toString()}> timeSlot:{ts.isBooked}   </p>  */}
        </>
     </div>
    // </div>
  );
};
export default Card;







// import React from 'react';

// const Card = () => {

// return    (
//     <div className="login-container">
//     <div className="card">
//       <div className="container">
//         <form onSubmit={handleFormSubmit}>
//           <h1>Login</h1>

//           <label htmlFor="email">
//             Email Address
//             <input
//               type="text"
//               value={data.email}
//               onChange={handleInputChange}
//               name="email"
//               id="email"
//             />
//           </label>

//           <label htmlFor="password">
//             Password
//             <input
//               type="password"
//               value={data.password}
//               onChange={handleInputChange}
//               name="password"
//               id="password"
//             />
//           </label>

//           {data.errorMessage && (
//             <span className="form-error">{data.errorMessage}</span>
//           )}

//          <button disabled={data.isSubmitting}>
//             {data.isSubmitting ? (
//               "Loading..."
//             ) : (
//               "Login"
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   </div>
// )};  
// export default Card;