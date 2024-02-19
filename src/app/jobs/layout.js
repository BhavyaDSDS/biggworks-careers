import JobDescription from "@/components/aboutJobs/JobDescription";
import JobListCard from "@/components/aboutJobs/JobListCard";

export default function RootLayout({ children }) {
  return (
    <>
      <div style={{ display: "flex", gap: "110px" }}>
        <JobListCard />
        {children}
      </div>
    </>
  );
}
