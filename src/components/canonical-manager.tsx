import { Helmet } from "react-helmet-async";
import { Outlet, useLocation } from "react-router-dom";

export const CanonicalManager = () => {
  const location = useLocation();
  const canonicalUrl = `${window.location.origin}${location.pathname}`;

  return (
    <>
      <Helmet>
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <Outlet />
    </>
  );
};