"use client";
import React, { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getJobByID, getJobs } from "@/app/api/ApiHandlers";
import JobDescription from "@/components/aboutJobs/JobDescription";
import { createQuary, isEmptyObject } from "@/utils/CustomFunctions";
import { MyContext } from "@/context/ContextProvider";
function page() {
  const pathname = usePathname();
  const pathnameId = pathname.split("/");

  const paramsId = pathnameId[pathnameId.length - 1];
  const { globalState, dispatch } = useContext(MyContext);

  const [job, setJob] = useState();
  console.log("lastIndexInpathlastIndexInpath", job);
  useEffect(() => {
    const handleSelectJob = async (id) => {
      // Changed argument to 'id'

      const response = await getJobByID(id);
      setJob(response);
      console.log("Response", response);
    };
    handleSelectJob(paramsId); // Assuming you need to pass an object with an 'id' property
  }, []);



  return (
    <div>
      <JobDescription job={job} />
    </div>
  );
}

export default page;
