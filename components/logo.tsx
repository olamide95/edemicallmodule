import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  collapsed?: boolean
}

export function Logo({ collapsed = false }: LogoProps) {
  return (
    <Link href="/" className="flex items-center">
      {collapsed ? (
        <div className="w-8 h-8 relative">
          <Image src="/Purple Logo icon png.png" alt="Edemics" width={32} height={32} className="object-contain" />
        </div>
      ) : (
        <div className="h-8 w-auto relative">
          <Image src="/edemics-logo.png" alt="Edemics" width={120} height={32} className="object-contain" />
        </div>
      )}
    </Link>
  )
}
