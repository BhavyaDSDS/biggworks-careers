"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getJobByID } from "@/app/api/ApiHandlers";
import JobDescription from "@/components/aboutJobs/JobDescription";
function page() {
  const pathname = usePathname();
  const pathnameId = pathname.split("/");
  const paramsId = pathnameId[pathnameId.length - 1];
    const [job, setJob] = useState();
  console.log("lastIndexInpathlastIndexInpath", paramsId);
  useEffect(() => {
    handleSelectJob(paramsId); // Assuming you need to pass an object with an 'id' property
  }, []);

  const handleSelectJob = async (id) => {
    // Changed argument to 'id'

    const response = await getJobByID(id);
    setJob(response);
    console.log("Response", response);
  };
  return <div><JobDescription job={job}/></div>;
}

export default page;
