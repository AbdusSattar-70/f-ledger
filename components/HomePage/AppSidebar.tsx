import { ShieldPlus } from "lucide-react";

export const AppSidebar: React.FC<{
  isSideBarOpen: boolean;
}> = ({ isSideBarOpen }) => (
  <div
    className={`${
      isSideBarOpen ? "translate-x-0" : "-translate-x-full"
    } fixed top-12 left-0 z-50 w-64 h-[calc(100%-3rem)] transition-transform duration-300 md:translate-x-0 md:static  md:h-full md:z-auto`}
  >
    <div className="scrollable w-full h-full p-4 bg-gray-800/50 border-gray-700 backdrop-blur-sm border-r overflow-auto">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-medium mb-3 uppercase tracking-wider text-gray-500 flex items-center">
          <ShieldPlus size={16} className="mr-2 text-blue-500" />
          Upgrades
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4"></div>
      {/* Sound Volume Control Section */}
    </div>
  </div>
);
