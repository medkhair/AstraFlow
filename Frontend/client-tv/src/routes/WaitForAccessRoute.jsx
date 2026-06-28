import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import {
  hasVerifiedEmail,
  hasSelectedPlan,
  hasCompletedCheckout,
} from "../data/guards";

export function WaitForAccessRoute({ children }) {
  const [verified, setVerified] = useState(null);
  const [checkoutCompleted, setCheckoutCompleted] = useState(null);

  useEffect(() => {
    const checkAccess = async () => {
      const isVerified = await hasVerifiedEmail();
      setVerified(isVerified);

      if (isVerified) {
        const completed = await hasCompletedCheckout();
        setCheckoutCompleted(completed);
      }
    };

    checkAccess();
  }, []);

  // Loading
  if (verified === null || checkoutCompleted === null) {
    return null; // or a spinner
  }

  if (!verified) {
    console.log("Email not verified, redirecting to /verify-email.");
    return <Navigate to="/verify-email" replace />;
  }

  if (!hasSelectedPlan()) {
    console.log("Plan not selected, redirecting to /choose-plan.");
    return <Navigate to="/choose-plan" replace />;
  }

  if (!checkoutCompleted) {
    console.log("Checkout not completed, redirecting to /checkout.");
    return <Navigate to="/checkout" replace />;
  }

  console.log("Access granted, rendering children.");
  return children;
}