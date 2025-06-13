import { Calendar } from "@/components/ui/calendar"
import type React from "react"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  ShoppingCart,
  Bus,
  MessageSquare,
  DollarSign,
  Calculator,
  UserCog,
  ClipboardList,
  Briefcase,
  BookOpen,
  HelpCircle,
  FileText,
  PenToolIcon as Tool,
  Package,
  Settings,
  Circle,
} from "lucide-react"
import {
  CanteenIcon,
  LibraryIcon,
  VisitorsIcon,
  AlumniIcon,
  HostelIcon,
  InfirmaryIcon,
  AfterSchoolIcon,
  FacilityIcon,
} from "@/components/sidebar-icons"

export interface MenuItem {
  title: string
  icon: React.ReactNode
  path?: string
  badge?: string | number
  submenu?: MenuItem[]
  expanded?: boolean
}

export const getMenuItemsForRole = (role: string): MenuItem[] => {
  switch (role) {
    case "admin":
      return [
        {
          title: "Dashboards",
          icon: <LayoutDashboard size={20} />,
          path: "/",
          badge: "5",
          expanded: false,
        },
        {
          title: "Admissions",
          icon: <Users size={20} />,
          path: "/admissions",
          expanded: false,
        },
        {
          title: "Academics",
          icon: <GraduationCap size={20} />,
          path: "/academics",
          expanded: true,
          submenu: [
            { title: "Academic Setup & Configuration", icon: <Circle size={8} />, path: "/academic-setup" },
            { title: "Dashboard", icon: <Circle size={8} />, path: "/academics/dashboard" },
            { title: "Classroom", icon: <Circle size={8} />, path: "/academics/classroom" },
            { title: "Staff Room", icon: <Circle size={8} />, path: "/academics/staff-room" },
            { title: "Report Card", icon: <Circle size={8} />, path: "/academics/report-card" },
            { title: "Uploads", icon: <Circle size={8} />, path: "/academics/uploads" },
            { title: "Staff Communication", icon: <Circle size={8} />, path: "/academics/staff-communication" },
            { title: "PTM", icon: <Circle size={8} />, path: "/academics/ptm" },
            { title: "Extra-Curricular Activities", icon: <Circle size={8} />, path: "/academics/extra-curricular" },
            { title: "Events & Calendar", icon: <Circle size={8} />, path: "/academics/events-calendar" },
            { title: "LMS", icon: <Circle size={8} />, path: "/academics/lms" },
            { title: "School Pickup", icon: <Circle size={8} />, path: "/academics/school-pickup" },
            { title: "Reports", icon: <Circle size={8} />, path: "/academics/reports" },
          ],
        },
        {
          title: "eCommerce",
          icon: <ShoppingCart size={20} />,
          path: "/ecommerce",
          expanded: false,
        },
        {
          title: "School Bus",
          icon: <Bus size={20} />,
          path: "/school-bus",
          expanded: false,
        },
        {
          title: "Communication",
          icon: <MessageSquare size={20} />,
          path: "/communication",
          expanded: false,
        },
        {
          title: "Finance",
          icon: <DollarSign size={20} />,
          path: "/finance",
          expanded: false,
        },
        {
          title: "Accounting",
          icon: <Calculator size={20} />,
          path: "/accounting",
          expanded: false,
        },
        {
          title: "HRMS",
          icon: <UserCog size={20} />,
          path: "/hrms",
          expanded: false,
        },
        {
          title: "Procurement",
          icon: <ClipboardList size={20} />,
          path: "/procurement",
          expanded: false,
        },
        {
          title: "Visitors Management",
          icon: <VisitorsIcon />,
          path: "/visitors-management",
          expanded: false,
        },
        {
          title: "Alumni",
          icon: <AlumniIcon />,
          path: "/alumni",
          expanded: false,
        },
        {
          title: "Hostel Management",
          icon: <HostelIcon />,
          path: "/hostel-management",
          expanded: false,
        },
        {
          title: "Facility Management",
          icon: <FacilityIcon />,
          path: "/facility-management",
          expanded: false,
        },
        {
          title: "After School",
          icon: <AfterSchoolIcon />,
          path: "/after-school",
          expanded: false,
        },
        {
          title: "Canteen Management",
          icon: <CanteenIcon />,
          path: "/canteen-management",
          expanded: false,
        },
        {
          title: "Library Management",
          icon: <LibraryIcon />,
          path: "/library-management",
          expanded: false,
        },
        {
          title: "Infirmary",
          icon: <InfirmaryIcon />,
          path: "/infirmary",
          expanded: false,
        },
        {
          title: "Fixed Asset Mgt",
          icon: <Briefcase size={20} />,
          path: "/fixed-asset-mgt",
          expanded: false,
        },
        {
          title: "LMS",
          icon: <BookOpen size={20} />,
          path: "/lms",
          expanded: false,
        },
        {
          title: "Help Desk",
          icon: <HelpCircle size={20} />,
          path: "/help-desk",
          expanded: false,
        },
        {
          title: "Knowledge Base",
          icon: <FileText size={20} />,
          path: "/knowledge-base",
          expanded: false,
        },
        {
          title: "Tools",
          icon: <Tool size={20} />,
          path: "/tools",
          expanded: false,
        },
        {
          title: "Inventory Mgt Sys.",
          icon: <Package size={20} />,
          path: "/inventory-mgt-sys",
          expanded: false,
        },
        {
          title: "Set up",
          icon: <Settings size={20} />,
          path: "/setup",
          expanded: false,
        },
      ]

    case "teacher":
      return [
        {
          title: "Academics",
          icon: <GraduationCap size={20} />,
          path: "/academics",
          expanded: true,
          submenu: [
            { title: "Dashboard", icon: <Circle size={8} />, path: "/academics/dashboard" },
            { title: "Classroom", icon: <Circle size={8} />, path: "/academics/classroom" },
            { title: "Staff Room", icon: <Circle size={8} />, path: "/academics/staff-room" },
            { title: "Report Card", icon: <Circle size={8} />, path: "/academics/report-card" },
            { title: "Staff Communication", icon: <Circle size={8} />, path: "/academics/staff-communication" },
            { title: "PTM", icon: <Circle size={8} />, path: "/academics/ptm" },
            { title: "Extra-Curricular Activities", icon: <Circle size={8} />, path: "/academics/extra-curricular" },
            { title: "Events & Calendar", icon: <Circle size={8} />, path: "/academics/events-calendar" },
            { title: "LMS", icon: <Circle size={8} />, path: "/academics/lms" },
            { title: "School Pickup", icon: <Circle size={8} />, path: "/academics/school-pickup" },
          ],
        },
        {
          title: "eCommerce",
          icon: <ShoppingCart size={20} />,
          path: "/ecommerce",
          expanded: false,
        },
        {
          title: "School Bus",
          icon: <Bus size={20} />,
          path: "/school-bus",
          expanded: false,
        },
        {
          title: "Communication",
          icon: <MessageSquare size={20} />,
          path: "/communication",
          expanded: false,
        },
        {
          title: "Accounting",
          icon: <Calculator size={20} />,
          path: "/accounting",
          expanded: false,
        },
        {
          title: "Visitors Management",
          icon: <VisitorsIcon />,
          path: "/visitors-management",
          expanded: false,
        },
        {
          title: "Canteen Management",
          icon: <CanteenIcon />,
          path: "/canteen-management",
          expanded: false,
        },
        {
          title: "Library Management",
          icon: <LibraryIcon />,
          path: "/library-management",
          expanded: false,
        },
        {
          title: "HRMS",
          icon: <UserCog size={20} />,
          path: "/hrms",
          expanded: false,
        },
        {
          title: "Infirmary",
          icon: <InfirmaryIcon />,
          path: "/infirmary",
          expanded: false,
        },
        {
          title: "LMS",
          icon: <BookOpen size={20} />,
          path: "/lms",
          expanded: false,
        },
      ]

    case "parent":
      return [
        {
          title: "Academics",
          icon: <GraduationCap size={20} />,
          path: "/academics",
          expanded: true,
          submenu: [
            { title: "Report Card", icon: <Circle size={8} />, path: "/academics/report-card" },
            { title: "Extra-Curricular Activities", icon: <Circle size={8} />, path: "/academics/extra-curricular" },
            { title: "Events & Calendar", icon: <Circle size={8} />, path: "/academics/events-calendar" },
            { title: "School Pickup", icon: <Circle size={8} />, path: "/academics/school-pickup" },
          ],
        },
        {
          title: "PTM",
          icon: <Users size={20} />,
          path: "/ptm",
          expanded: false,
        },
        {
          title: "Finance",
          icon: <DollarSign size={20} />,
          path: "/finance",
          expanded: false,
        },
        {
          title: "School Bus",
          icon: <Bus size={20} />,
          path: "/school-bus",
          expanded: false,
        },
        {
          title: "Communication",
          icon: <MessageSquare size={20} />,
          path: "/communication",
          expanded: false,
        },
        {
          title: "Visitors Management",
          icon: <VisitorsIcon />,
          path: "/visitors-management",
          expanded: false,
        },
        {
          title: "Infirmary",
          icon: <InfirmaryIcon />,
          path: "/infirmary",
          expanded: false,
        },
        {
          title: "Library Management",
          icon: <LibraryIcon />,
          path: "/library-management",
          expanded: false,
        },
      ]

    case "student":
      return [
        {
          title: "Academics",
          icon: <GraduationCap size={20} />,
          path: "/academics",
          expanded: true,
          submenu: [
            { title: "Classroom", icon: <Circle size={8} />, path: "/academics/classroom" },
            { title: "Report Card", icon: <Circle size={8} />, path: "/academics/report-card" },
            { title: "Extra-Curricular Activities", icon: <Circle size={8} />, path: "/academics/extra-curricular" },
            { title: "Events & Calendar", icon: <Circle size={8} />, path: "/academics/events-calendar" },
            { title: "LMS", icon: <Circle size={8} />, path: "/academics/lms" },
          ],
        },
        {
          title: "School Bus",
          icon: <Bus size={20} />,
          path: "/school-bus",
          expanded: false,
        },
        {
          title: "Communication",
          icon: <MessageSquare size={20} />,
          path: "/communication",
          expanded: false,
        },
        {
          title: "Library Management",
          icon: <LibraryIcon />,
          path: "/library-management",
          expanded: false,
        },
        {
          title: "Infirmary",
          icon: <InfirmaryIcon />,
          path: "/infirmary",
          expanded: false,
        },
        {
          title: "After School",
          icon: <AfterSchoolIcon />,
          path: "/after-school",
          expanded: false,
        },
      ]

    case "alumni":
      return [
        {
          title: "Alumni Network",
          icon: <AlumniIcon />,
          path: "/alumni",
          expanded: false,
        },
        {
          title: "Events & Calendar",
          icon: <Calendar size={20} />,
          path: "/events-calendar",
          expanded: false,
        },
        {
          title: "Communication",
          icon: <MessageSquare size={20} />,
          path: "/communication",
          expanded: false,
        },
        {
          title: "Library Management",
          icon: <LibraryIcon />,
          path: "/library-management",
          expanded: false,
        },
      ]

    default:
      return []
  }
}
