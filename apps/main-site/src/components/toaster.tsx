import { Toaster } from "solid-toast";

const CustomToaster = () => {
  // FIXME: Dark mode not working
  return <Toaster toastOptions={{ duration: 2000 }} position="bottom-center" />;
};

export default CustomToaster;
