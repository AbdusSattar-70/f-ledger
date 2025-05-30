import { Separator } from "./ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { ShieldPlus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function SkeletonCard() {
  const isMobile = useIsMobile();

  return (
    <>
      <div
        className={`${
          isMobile ? "-translate-x-full" : "translate-x-0"
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
        </div>
      </div>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
        </div>
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
      </div>
    </>
  );
}
