import Navbar from "../Navbar";
import { SideDocPanel } from "../SideDocPanel";

export const DocDashboard = () => {
  return (
    <div className="flex ">
      <div>
        <SideDocPanel />
      </div>
      <div className=" w-full">
        <Navbar />
      </div>
    </div>
  );
};
