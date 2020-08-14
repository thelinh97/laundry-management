import React, { useState, useEffect, useContext, createContext } from "react";
import { auth, database } from "firebase";
import firebaseConfig from "../config";

// Add your Firebase credentials

const firebaseContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideFirebase({ children }) {
  const valueFirebase = useProvideFirebase();
  return (
    <firebaseContext.Provider value={valueFirebase}>
      {children}
    </firebaseContext.Provider>
  );
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useFirebase = () => {
  return useContext(firebaseContext);
};

// Provider hook that creates auth object and handles state
function useProvideFirebase() {
  const [user, setUser] = useState(null);
  const [loginFail, setLoginFail] = useState(null);
  const [data, setData] = useState([]);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (email, password) => {
    return auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        localStorage.setItem("user", JSON.stringify(response.user));
        return response.user;
      })
      .catch((err) => {
        setLoginFail(err);
      });
  };

  const signout = () => {
    return auth()
      .signOut()
      .then(() => {
        setUser(false);
        localStorage.clear();
      });
  };
  const addOrder = (order) => {
    return database()
      .ref("order/" + order.phone)
      .set({
        name: order.name,
        phone: order.phone,
        type: order.type,
        mass: order.mass,
        time: order.time,
        money: order.money,
      })
      .then(() => {
        alert("Thêm thành công");
      })
      .catch(() => {
        alert("Thêm thất bại");
      });
  };
  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    database()
      .ref("order/")
      .on("value", (data) => {
        const array = data !== [] ? Object.entries(data.val()) : [];
        setData(array);
      });
  }, []);

  // Return the user object and auth methods
  return {
    user,
    loginFail,
    signin,
    signout,
    addOrder,
    data,
  };
}
