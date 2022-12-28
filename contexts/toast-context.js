import { toast, ToastContainer } from "react-toastify";

const { createContext, useContext } = require("react");

const ToastContext = createContext({
  toast: (message, type) => {},
});

export const useToast = () => useContext(ToastContext);

const showToast = (message, type) => {
  return toast(message, { type });
};

const ToastProvider = ({ children }) => {
  return (
    <ToastContext.Provider value={{ toast: showToast }}>
      {children}
      <ToastContainer position="bottom-right" theme="dark" />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
