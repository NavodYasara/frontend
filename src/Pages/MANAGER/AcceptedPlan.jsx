import React, { useEffect, useState } from 'react'
import Sidebar from '../../Components/Sidebar';
import NavbarComponent from '../../Components/Navbar/Navbar';
import NewTaskTable from './NewTaskTable';
import axios from 'axios';
import dayjs from 'dayjs';
import WaitingPlanTable from './WaitingPlanTable';
import AcceptedTable from './AcceptedTable';

const AcceptedPlan = () => {
    const [finalizedRequirments,setFinalizedRequirments]=useState([]);


    useEffect(()=>{
        fetchFinalizedPlans();
    },[])



   
    const fetchFinalizedPlans=async()=>{
        try {
            const results=await axios.get("http://localhost:5000/api/manager/finalizedPlans")
            console.log("results assigned finalized ",results);
            const finalTaskArray=results.data?.map((res)=>({
                ...res,
                assignee:res?.userId+"  "+res?.firstName+" "+res?.lastName,
                startDate:dayjs(res?.startDate).format("YYYY-MM-DD"),
                endDate:dayjs(res?.endDate).format("YYYY-MM-DD")
            }))

            setFinalizedRequirments(finalTaskArray);
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
       <AcceptedTable fetchPendingTasks={fetchFinalizedPlans} reservationResult={finalizedRequirments}/>
        {/* <NavbarComponent /> */}
        
      </div>
    </div>
  )
}


export default AcceptedPlan