import Image from "next/image"

export function AcademicSetupIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24 32C28.4183 32 32 28.4183 32 24C32 19.5817 28.4183 16 24 16C19.5817 16 16 19.5817 16 24C16 28.4183 19.5817 32 24 32Z"
        fill="#8AFF80"
      />
      <path
        d="M24 28C26.2091 28 28 26.2091 28 24C28 21.7909 26.2091 20 24 20C21.7909 20 20 21.7909 20 24C20 26.2091 21.7909 28 24 28Z"
        fill="#8C57FF"
      />
      <path
        d="M42.1213 17.8787C41.7308 17.4882 41.7308 16.8551 42.1213 16.4645L45.0711 13.5147C45.4616 13.1242 46.0948 13.1242 46.4853 13.5147C46.8758 13.9052 46.8758 14.5384 46.4853 14.9289L43.5355 17.8787C43.145 18.2692 42.5118 18.2692 42.1213 17.8787Z"
        fill="#8C57FF"
      />
      <path
        d="M42.1213 30.1213C42.5118 29.7308 43.145 29.7308 43.5355 30.1213L46.4853 33.0711C46.8758 33.4616 46.8758 34.0948 46.4853 34.4853C46.0948 34.8758 45.4616 34.8758 45.0711 34.4853L42.1213 31.5355C41.7308 31.145 41.7308 30.5118 42.1213 30.1213Z"
        fill="#8C57FF"
      />
      <path
        d="M17.8787 5.87868C17.4882 5.48815 16.8551 5.48815 16.4645 5.87868L13.5147 8.82843C13.1242 9.21895 13.1242 9.85212 13.5147 10.2426C13.9052 10.6332 14.5384 10.6332 14.9289 10.2426L17.8787 7.29289C18.2692 6.90237 18.2692 6.2692 17.8787 5.87868Z"
        fill="#8C57FF"
      />
      <path
        d="M30.1213 5.87868C30.5118 6.2692 30.5118 6.90237 30.1213 7.29289L27.1716 10.2426C26.781 10.6332 26.1479 10.6332 25.7574 10.2426C25.3668 9.85212 25.3668 9.21895 25.7574 8.82843L28.7071 5.87868C29.0976 5.48815 29.7308 5.48815 30.1213 5.87868Z"
        fill="#8C57FF"
      />
      <path
        d="M5.87868 17.8787C5.48815 18.2692 5.48815 18.9024 5.87868 19.2929L8.82843 22.2426C9.21895 22.6332 9.85212 22.6332 10.2426 22.2426C10.6332 21.8521 10.6332 21.2189 10.2426 20.8284L7.29289 17.8787C6.90237 17.4882 6.2692 17.4882 5.87868 17.8787Z"
        fill="#8C57FF"
      />
      <path
        d="M5.87868 30.1213C6.2692 29.7308 6.90237 29.7308 7.29289 30.1213L10.2426 33.0711C10.6332 33.4616 10.6332 34.0948 10.2426 34.4853C9.85212 34.8758 9.21895 34.8758 8.82843 34.4853L5.87868 31.5355C5.48815 31.145 5.48815 30.5118 5.87868 30.1213Z"
        fill="#8C57FF"
      />
      <path
        d="M17.8787 42.1213C18.2692 41.7308 18.2692 41.0976 17.8787 40.7071L14.9289 37.7574C14.5384 37.3668 13.9052 37.3668 13.5147 37.7574C13.1242 38.1479 13.1242 38.781 13.5147 39.1716L16.4645 42.1213C16.8551 42.5118 17.4882 42.5118 17.8787 42.1213Z"
        fill="#8C57FF"
      />
      <path
        d="M30.1213 42.1213C29.7308 41.7308 29.0976 41.7308 28.7071 42.1213L25.7574 45.0711C25.3668 45.4616 25.3668 46.0948 25.7574 46.4853C26.1479 46.8758 26.781 46.8758 27.1716 46.4853L30.1213 43.5355C30.5118 43.145 30.5118 42.5118 30.1213 42.1213Z"
        fill="#8C57FF"
      />
      <path
        d="M42.1213 5.87868C41.7308 5.48815 41.0976 5.48815 40.7071 5.87868L37.7574 8.82843C37.3668 9.21895 37.3668 9.85212 37.7574 10.2426C38.1479 10.6332 38.781 10.6332 39.1716 10.2426L42.1213 7.29289C42.5118 6.90237 42.5118 6.2692 42.1213 5.87868Z"
        fill="#8C57FF"
      />
    </svg>
  )
}

export function DashboardIcon() {
  return (
    <div className="w-12 h-12 flex items-center justify-center">
      <Image src="/dashboard_11832071.png" alt="Dashboard" width={48} height={48} className="object-contain" />
    </div>
  )
}

export function ClassroomIcon() {
  return (
    <div className="w-12 h-12 flex items-center justify-center">
      <Image src="/Classroom.png" alt="Classroom" width={48} height={48} className="object-contain" />
    </div>
  )
}

export function StaffRoomIcon() {
  return (
    <div className="w-12 h-12 flex items-center justify-center">
      <Image src="/Staffroom1.png" alt="Staff Room" width={48} height={48} className="object-contain" />
    </div>
  )
}

export function ReportCardIcon() {
  return (
    <div className="w-12 h-12 flex items-center justify-center">
      <Image
        src="/hand-drawn-report-card-illustration-b.png"
        alt="Report Card"
        width={48}
        height={48}
        className="object-contain"
      />
    </div>
  )
}

export function UploadsIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="8" width="32" height="8" rx="2" fill="#56CA00" />
      <rect x="8" y="20" width="32" height="8" rx="2" fill="#E0E0E0" />
      <rect x="8" y="32" width="32" height="8" rx="2" fill="#E0E0E0" />
      <path
        d="M32 24L36 28M36 28L40 24M36 28V16"
        stroke="#56CA00"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 36L36 40M36 40L40 36M36 40V28"
        stroke="#56CA00"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CommunicationIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="16" stroke="#FF4C51" strokeWidth="2" />
      <circle cx="24" cy="20" r="8" stroke="#FF4C51" strokeWidth="2" />
      <path d="M12 38C14.5 32 18.4 28 24 28C29.6 28 33.5 32 36 38" stroke="#FF4C51" strokeWidth="2" />
      <path d="M24 36V44" stroke="#FF4C51" strokeWidth="2" />
      <path d="M16 40L32 40" stroke="#FF4C51" strokeWidth="2" />
      <path d="M8 24L16 24" stroke="#FF4C51" strokeWidth="2" />
      <path d="M32 24L40 24" stroke="#FF4C51" strokeWidth="2" />
      <path d="M12 12L18 18" stroke="#FF4C51" strokeWidth="2" />
      <path d="M30 18L36 12" stroke="#FF4C51" strokeWidth="2" />
    </svg>
  )
}

export function PTMIcon() {
  return (
    <div className="w-12 h-12 flex items-center justify-center">
      <Image src="/PTM.png" alt="Parent Teacher Meeting" width={48} height={48} className="object-contain" />
    </div>
  )
}

export function ExtraCurricularIcon() {
  return (
    <div className="w-12 h-12 flex items-center justify-center">
      <Image
        src="/Extra-Curricular-Activities.png"
        alt="Extra-Curricular Activities"
        width={48}
        height={48}
        className="object-contain"
      />
    </div>
  )
}

export function EventsCalendarIcon() {
  return (
    <div className="w-12 h-12 flex items-center justify-center">
      <Image
        src="/Events-and-Calender.png"
        alt="Events and Calendar"
        width={48}
        height={48}
        className="object-contain"
      />
    </div>
  )
}

export function LMSIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="4" width="24" height="40" rx="2" stroke="#8C57FF" strokeWidth="2" />
      <circle cx="24" cy="36" r="2" stroke="#8C57FF" strokeWidth="2" />
      <rect x="16" y="12" width="16" height="2" rx="1" fill="#8C57FF" />
      <rect x="16" y="18" width="16" height="2" rx="1" fill="#8C57FF" />
      <rect x="16" y="24" width="16" height="2" rx="1" fill="#8C57FF" />
      <circle cx="32" cy="8" r="2" fill="#8C57FF" />
    </svg>
  )
}

export function SchoolPickupIcon() {
  return (
    <div className="w-12 h-12 flex items-center justify-center">
      <Image src="/School-pickup.png" alt="School Pickup" width={48} height={48} className="object-contain" />
    </div>
  )
}

export function ReportsIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 40H40" stroke="#16B1FF" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 40V28" stroke="#16B1FF" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 40V20" stroke="#16B1FF" strokeWidth="2" strokeLinecap="round" />
      <path d="M28 40V24" stroke="#16B1FF" strokeWidth="2" strokeLinecap="round" />
      <path d="M36 40V16" stroke="#16B1FF" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M24 16C26.2091 16 28 14.2091 28 12C28 9.79086 26.2091 8 24 8C21.7909 8 20 9.79086 20 12C20 14.2091 21.7909 16 24 16Z"
        fill="#FFB400"
      />
      <path d="M24 16V24" stroke="#FFB400" strokeWidth="2" />
    </svg>
  )
}

export function StaffCommunicationIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="16" stroke="#FF4C51" strokeWidth="2" />
      <circle cx="24" cy="20" r="8" stroke="#FF4C51" strokeWidth="2" />
      <path d="M12 38C14.5 32 18.4 28 24 28C29.6 28 33.5 32 36 38" stroke="#FF4C51" strokeWidth="2" />
      <path d="M24 36V44" stroke="#FF4C51" strokeWidth="2" />
      <path d="M16 40L32 40" stroke="#FF4C51" strokeWidth="2" />
      <path d="M8 24L16 24" stroke="#FF4C51" strokeWidth="2" />
      <path d="M32 24L40 24" stroke="#FF4C51" strokeWidth="2" />
      <path d="M12 12L18 18" stroke="#FF4C51" strokeWidth="2" />
      <path d="M30 18L36 12" stroke="#FF4C51" strokeWidth="2" />
    </svg>
  )
}
