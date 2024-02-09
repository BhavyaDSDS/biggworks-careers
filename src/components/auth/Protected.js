"use client";

import Session from "supertokens-web-js/recipe/session";
import { CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MyContext } from "@/context/ContextProvider";

const ProtectedRoute = (WrappedComponent) => {
  function WithAuth(props) {
    const [isSession, setIsSession] = useState(false);
    const router = useRouter();

    const { dispatch } = useContext(MyContext);

    useEffect(() => {
      async function checkSession() {
        const sessionExists = await Session.doesSessionExist();

        dispatch({ type: "auth", payload: sessionExists });

        if (sessionExists) {
          setIsSession(true);
        } else {
          router.push("/join");
        }
      }

      checkSession();
    }, [router]);

    if (!isSession) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      );
    }

    // Transfer static properties
    Object.assign(WithAuth, WrappedComponent);

    return <WrappedComponent {...props} />;
  }

  return WithAuth;
};

export default ProtectedRoute;
