"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getJobByID } from "@/app/api/ApiHandlers";
function page() {
  const pathname = usePathname();
const pathnameId = pathname.split("/");
const paramsId = pathnameId[ pathnameId.length -1]

console.log("lastIndexInpathlastIndexInpath", paramsId)
  useEffect(() => {
    handleSelectJob(paramsId); // Assuming you need to pass an object with an 'id' property
  }, []);

  const handleSelectJob = async (id) => {
    // Changed argument to 'id'

    const response = await getJobByID(id);
    console.log("Response", response);
  };
  return <div>page</div>;
}

export default page;
