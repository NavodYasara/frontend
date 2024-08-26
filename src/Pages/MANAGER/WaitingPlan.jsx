import React, { useEffect, useState } from 'react'
import Sidebar from '../../Components/Sidebar';
import NavbarComponent from '../../Components/Navbar/Navbar';
import NewTaskTable from './NewTaskTable';
import axios from 'axios';
import dayjs from 'dayjs';
import WaitingPlanTable from './WaitingPlanTable';

const WaitingPlan = () => {
    const [assignedPendngRequirments,setAssignedPendingReuirments]=useState([]);


    useEffect(()=>{
        fetchAssignedAndRejectedTasks();
    },[])


   
    const fetchAssignedAndRejectedTasks=async()=>{
        try {
            const results=await axios.get("http://localhost:5000/api/manager/assignedAndRejected")
            console.log("results assigned ",results);
            const finalTaskArray=results.data?.map((res)=>({
                ...res,
                assignee:res?.userId+"  "+res?.firstName+" "+res?.lastName,
                startDate:dayjs(res?.startDate).format("YYYY-MM-DD"),
                endDate:dayjs(res?.endDate).format("YYYY-MM-DD")
            }))

            setAssignedPendingReuirments(finalTaskArray);
        } catch (error) {
            console.log("pending tasks fetching error! ",error);
        }
    }

    const getUserfromLocalStorage = localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : null;
  return (
    <div style={{ display: "flex" }}>
      <Sidebar userType={getUserfromLocalStorage?.userType} />
      <div style={{ flex: 1 }}>
        <WaitingPlanTable fetchPendingTasks={fetchAssignedAndRejectedTasks} reservationResult={assignedPendngRequirments}/>
        {/* <NavbarComponent /> */}
        
      </div>
    </div>
  )
}


export default WaitingPlan