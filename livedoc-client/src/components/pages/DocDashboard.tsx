import { DashboardData } from "../DashboardData";
import Navbar from "../Navbar";
import { SideDocPanel } from "../SideDocPanel";

export const DocDashboard = () => {
  return (
    <div className="flex ">
      <div>
        <SideDocPanel />
      </div>
      <div className="w-full">
      <div className=" w-full">
        <Navbar />
      </div>
      <div className="m-10"><DashboardData /></div>
</div>
    </div>
  );
};
