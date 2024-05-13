import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import "../App.css";
import Sidebar from "../Components/Sidebar";

function Layout() {
  return (
    <>
      <div>
        <div className="navbar-part">
          <Navbar />
        </div>
        <div className="row page-part">
          <div className="sidebar-part">
            <Sidebar />
          </div>
          <div className="content-part">
            {/* Content goes here */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;



// function Layout() {
//   return (
//     <>
//       <div>
//         <div className="navbar-part">
//           <Navbar />
//         </div>
//         <div className="row page-part">
//           <div className="col-2 sidebar-part">
//             <Sidebar />
//           </div>
//           <div className="col-10 content-part">
//             {/* Content goes here */}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Layout;
