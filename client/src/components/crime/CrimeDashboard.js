import React, { useContext, Fragment, useEffect } from "react";
// import ReportNumbers from "./ReportNumbers";
import { AuthContext } from "../../context/AuthContext";
import { CrimeContext } from "../../context/CrimeContext";
import Spinnner from "../layout/Spinner";
import { Redirect } from "react-router-dom";
import ReportList from "./ReportList";
const CrimeDashboard = () => {
  const { auth } = useContext(AuthContext);
  const { loading, crimes, getCurrentUserReports } = useContext(CrimeContext);

  useEffect(() => {
    getCurrentUserReports();
  }, []);

  if (!auth) {
    return <Redirect to="/login" />;
  }

  if (!crimes && loading) return <Spinnner />;
  return (
    <Fragment>
      {/* <ReportNumbers /> */}
      <ReportList />
    </Fragment>
  );
};

export default CrimeDashboard;
