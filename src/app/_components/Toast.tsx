import { toast, ToastContainer } from "react-toastify";
import { CheckCircle, XCircle } from "lucide-react";

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    className:
      "!bg-white/10 !backdrop-blur-sm !border !border-white/20 !text-white !rounded-xl",
    progressClassName: "!bg-green-400",
    icon: <CheckCircle className="h-5 w-5 text-green-400" />,
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    className:
      "!bg-white/10 !backdrop-blur-sm !border !border-white/20 !text-white !rounded-xl",
    progressClassName: "!bg-red-400",
    icon: <XCircle className="h-5 w-5 text-red-400" />,
  });
};

export const RoomToastContainer = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
      toastClassName="!bg-white/10 !backdrop-blur-sm !border !border-white/20 !text-white !rounded-xl"
      progressClassName="!bg-green-400"
    />
  );
};
