import {
  AcademicSetupIcon,
  DashboardIcon,
  ClassroomIcon,
  StaffRoomIcon,
  ReportCardIcon,
  UploadsIcon,
  CommunicationIcon,
  PTMIcon,
  ExtraCurricularIcon,
  EventsCalendarIcon,
  LMSIcon,
  SchoolPickupIcon,
  ReportsIcon,
} from "@/components/icons"
import { FeatureCard } from "@/components/feature-card"

export function FeaturesSection() {
  return (
    <div
      className="bg-white dark:bg-[#312D4B] rounded-lg shadow-[0_5px_11px_3px_rgba(0,0,0,0.15)] dark:shadow-[0_5px_11px_3px_rgba(0,0,0,0.3)] mb-6"
      style={{
        imageRendering: "crisp-edges",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        shapeRendering: "crispEdges",
        textRendering: "geometricPrecision",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
        transform: "translateZ(0)",
      }}
    >
      {/* Features Title Background */}
      <div className="bg-[#F4F5FA] dark:bg-[#3D3759] h-[46px] flex items-center px-6 rounded-t-lg">
        <h2 className="text-xl font-bold text-[#2E263D] dark:text-[rgba(231,227,252,0.9)]">Features</h2>
      </div>

      {/* Features Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <FeatureCard title="Academic Setup & Configuration" icon={<AcademicSetupIcon />} href="/academic-setup" />
          <FeatureCard title="Dashboard" icon={<DashboardIcon />} href="/academics/dashboard" />
          <FeatureCard title="Classroom" icon={<ClassroomIcon />} href="/academics/classroom" />
          <FeatureCard title="Staff Room" icon={<StaffRoomIcon />} href="/academics/staff-room" />
          <FeatureCard title="Report Card" icon={<ReportCardIcon />} href="/academics/report-card" />
          <FeatureCard title="Uploads" icon={<UploadsIcon />} href="/academics/uploads" />
          <FeatureCard title="Communication" icon={<CommunicationIcon />} href="/academics/communication" />
          <FeatureCard title="PTM" icon={<PTMIcon />} href="/academics/ptm" />
          <FeatureCard
            title="Extra-curricular Activities"
            icon={<ExtraCurricularIcon />}
            href="/academics/extra-curricular"
          />
          <FeatureCard title="Events and Calendar" icon={<EventsCalendarIcon />} href="/academics/events-calendar" />
          <FeatureCard title="LMS" icon={<LMSIcon />} href="/academics/lms" />
          <FeatureCard title="School Pickup" icon={<SchoolPickupIcon />} href="/academics/school-pickup" />
          <FeatureCard title="Reports" icon={<ReportsIcon />} href="/academics/reports" />
        </div>
      </div>
    </div>
  )
}
