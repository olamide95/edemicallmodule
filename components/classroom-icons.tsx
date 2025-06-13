import Image from "next/image"

export function PromotionTransferIcon() {
  return (
    <div className="w-16 h-16 flex items-center justify-center">
      <Image
        src="/promotion-transfer-icon.png"
        alt="Promotion & Transfer"
        width={64}
        height={64}
        className="object-contain"
      />
    </div>
  )
}

export function WelcomeMessageIcon() {
  return (
    <div className="w-16 h-16 flex items-center justify-center">
      <Image src="/welcome-message-icon.png" alt="Welcome Message" width={64} height={64} className="object-contain" />
    </div>
  )
}

export function ClassAttendanceIcon() {
  return (
    <div className="w-16 h-16 flex items-center justify-center">
      <svg viewBox="0 0 64 64" className="w-full h-full">
        <rect x="12" y="16" width="4" height="4" rx="1" fill="#56CA00" />
        <rect x="20" y="16" width="32" height="2" rx="1" fill="#8A8D93" />
        <rect x="12" y="24" width="4" height="4" rx="1" fill="#FF4C51" />
        <rect x="20" y="24" width="32" height="2" rx="1" fill="#8A8D93" />
        <rect x="12" y="32" width="4" height="4" rx="1" fill="#56CA00" />
        <rect x="20" y="32" width="32" height="2" rx="1" fill="#8A8D93" />
        <rect x="12" y="40" width="4" height="4" rx="1" fill="#56CA00" />
        <rect x="20" y="40" width="32" height="2" rx="1" fill="#8A8D93" />
      </svg>
    </div>
  )
}

export function ParentCommunicationIcon() {
  return (
    <div className="w-16 h-16 flex items-center justify-center">
      <svg viewBox="0 0 64 64" className="w-full h-full">
        <circle cx="20" cy="20" r="8" fill="#FFB400" />
        <path d="M12 40c0-4.4 3.6-8 8-8s8 3.6 8 8v4H12v-4z" fill="#16B1FF" />
        <circle cx="44" cy="20" r="8" fill="#FF4C51" />
        <path d="M36 40c0-4.4 3.6-8 8-8s8 3.6 8 8v4H36v-4z" fill="#8C57FF" />
        <path d="M28 48l8-4 8 4v8l-8-4-8 4v-8z" fill="#56CA00" />
      </svg>
    </div>
  )
}

export function ClassTimetableIcon() {
  return (
    <div className="w-16 h-16 flex items-center justify-center">
      <Image src="/class-timetable-icon.png" alt="Class Timetable" width={64} height={64} className="object-contain" />
    </div>
  )
}

export function AcademicActivityIcon() {
  return (
    <div className="w-16 h-16 flex items-center justify-center">
      <svg viewBox="0 0 64 64" className="w-full h-full">
        <rect x="8" y="8" width="48" height="32" rx="4" fill="#F4F5FA" stroke="#8A8D93" strokeWidth="2" />
        <circle cx="32" cy="20" r="6" fill="#FFB400" />
        <circle cx="20" cy="32" r="4" fill="#16B1FF" />
        <circle cx="32" cy="32" r="4" fill="#56CA00" />
        <circle cx="44" cy="32" r="4" fill="#FF4C51" />
        <rect x="16" y="48" width="32" height="8" rx="2" fill="#8C57FF" />
      </svg>
    </div>
  )
}

export function IEPIcon() {
  return (
    <div className="w-16 h-16 flex items-center justify-center">
      <svg viewBox="0 0 64 64" className="w-full h-full">
        <rect x="12" y="8" width="40" height="48" rx="4" fill="#56CA00" />
        <rect x="16" y="12" width="32" height="40" rx="2" fill="#FFFFFF" />
        <rect x="20" y="16" width="24" height="2" rx="1" fill="#8A8D93" />
        <rect x="20" y="20" width="20" height="2" rx="1" fill="#8A8D93" />
        <rect x="20" y="24" width="16" height="2" rx="1" fill="#8A8D93" />
        <path d="M48 40l8 8-8 8v-6H40v-4h8v-6z" fill="#FFB400" />
      </svg>
    </div>
  )
}

export function PhotoGalleryIcon() {
  return (
    <div className="w-16 h-16 flex items-center justify-center">
      <svg viewBox="0 0 64 64" className="w-full h-full">
        <circle cx="32" cy="32" r="24" fill="#FFB400" />
        <path d="M20 32a12 12 0 0124 0" fill="#56CA00" />
        <path d="M32 20a12 12 0 010 24" fill="#16B1FF" />
        <path d="M44 32a12 12 0 01-24 0" fill="#FF4C51" />
        <circle cx="32" cy="32" r="4" fill="#FFFFFF" />
      </svg>
    </div>
  )
}

export function HappyMomentIcon() {
  return (
    <div className="w-16 h-16 flex items-center justify-center">
      <svg viewBox="0 0 64 64" className="w-full h-full">
        <circle cx="24" cy="20" r="6" fill="#FFB400" />
        <circle cx="40" cy="20" r="6" fill="#16B1FF" />
        <circle cx="32" cy="36" r="6" fill="#56CA00" />
        <path d="M18 32c0-3.3 2.7-6 6-6s6 2.7 6 6v8H18v-8z" fill="#FFB400" opacity="0.7" />
        <path d="M34 32c0-3.3 2.7-6 6-6s6 2.7 6 6v8H34v-8z" fill="#16B1FF" opacity="0.7" />
        <path d="M26 44c0-3.3 2.7-6 6-6s6 2.7 6 6v8H26v-8z" fill="#56CA00" opacity="0.7" />
      </svg>
    </div>
  )
}

export function ReportIcon() {
  return (
    <div className="w-16 h-16 flex items-center justify-center">
      <svg viewBox="0 0 64 64" className="w-full h-full">
        <rect x="8" y="48" width="8" height="8" fill="#FF4C51" />
        <rect x="20" y="40" width="8" height="16" fill="#56CA00" />
        <rect x="32" y="32" width="8" height="24" fill="#FFB400" />
        <rect x="44" y="24" width="8" height="32" fill="#16B1FF" />
        <path
          d="M16 24l12-8 12 8 12-8"
          stroke="#8A8D93"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="24" r="2" fill="#8A8D93" />
        <circle cx="28" cy="16" r="2" fill="#8A8D93" />
        <circle cx="40" cy="24" r="2" fill="#8A8D93" />
        <circle cx="52" cy="16" r="2" fill="#8A8D93" />
      </svg>
    </div>
  )
}
