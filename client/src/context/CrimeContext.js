import React, { createContext, useEffect, useState } from "react";
import api from "../utils/api";
import setAuthToken from "../utils/setAuthToken";

export const CrimeContext = createContext();

const CrimeContextProvider = (props) => {
  const [crimes, setCrimes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(null);
  const [inProgress, setinProgress] = useState(null);
  const [completed, setCompleted] = useState(null);
  const [rejected, setRejected] = useState(null);

  const getCurrentUserReports = async () => {
    try {
      const res = await api.get("/crime");
      console.log(res.data);
      setCrimes(res.data);
      setLoading(false);
      // console.log(loading);
    } catch (err) {
      console.log(err);
    }
  };

  const getPendingReports = async () => {
    try {
      const res = await api.get("/crime/pending");
      console.log(res.data);
      setPending(res.data);
      // setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getInProgressReports = async () => {
    try {
      const res = await api.get("/crime/progress");
      console.log(res.data);
      setinProgress(res.data);
      // setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const getCompletedReports = async () => {
    try {
      const res = await api.get("/crime/completed");
      console.log(res.data);
      setCompleted(res.data);
      // setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const getRejectedReports = async () => {
    try {
      const res = await api.get("/crime/rejected");
      console.log(res.data);
      setRejected(res.data);
      // setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const clearCrimeState = () => {
    setCrimes(null);
    setPending(null);
    setCompleted(null);
    setRejected(null);
    setinProgress(null);
    setLoading(true);
  };
  useEffect(() => {
    getCurrentUserReports();
  }, []);

  // if (loading) return <Spinnner />;
  return (
    <CrimeContext.Provider
      value={{
        crimes,
        setCrimes,
        getCurrentUserReports,
        loading,
        setLoading,
        pending,
        inProgress,
        completed,
        rejected,
        getPendingReports,
        getCompletedReports,
        getRejectedReports,
        getInProgressReports,
        clearCrimeState,
        ...props,
      }}
    >
      {props.children}
    </CrimeContext.Provider>
  );
};

export default CrimeContextProvider;
