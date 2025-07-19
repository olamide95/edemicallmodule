"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

export function WelcomePage() {
  const router = useRouter()

  const handleStartOnboarding = () => {
    router.push("/onboarding/school-details")
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side with illustration */}
      <div className="w-full lg:w-3/5 bg-[#F4F5FA] flex flex-col">
        <div className="p-8">
          <div className="edemics-logo">
            <Image src="/logo.png" alt="Edemics Logo" width={120} height={40} />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-8 relative">
          <div className="relative w-full max-w-xl mx-auto">
            {/* Main illustration */}
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HRMS_FIGMA_FILE-hLNvCu39XFaquMU6nrRoGmYVDTeOfS.png"
              alt="Welcome Illustration"
              width={600}
              height={600}
              className="mx-auto"
              priority
            />
          </div>
        </div>
      </div>

      {/* Right side with content */}
      <div className="hidden lg:flex lg:w-2/5 bg-white flex-col justify-center p-12">
        <div className="max-w-md mx-auto">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-medium text-[#2E263D]">
                "Welcome aboard! Start your seamless onboarding journey and embark on a path to success with us!"
              </h1>
            </div>

            <button
              onClick={handleStartOnboarding}
              className="w-full py-3 px-4 bg-[#8C57FF] text-white rounded-md hover:bg-[#7E57C2] transition-colors"
            >
              click to start your onboarding
            </button>

            <div className="text-center">
              <p className="text-sm text-[#2E263D]">
                Didn't get the mail? <button className="text-[#8C57FF] hover:underline">Resend</button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile view for the right side content */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white p-6 rounded-t-3xl shadow-lg">
        <div className="space-y-4">
          <h1 className="text-xl font-medium text-[#2E263D]">
            "Welcome aboard! Start your seamless onboarding journey and embark on a path to success with us!"
          </h1>

          <button
            onClick={handleStartOnboarding}
            className="w-full py-3 px-4 bg-[#8C57FF] text-white rounded-md hover:bg-[#7E57C2] transition-colors"
          >
            click to start your onboarding
          </button>

          <div className="text-center">
            <p className="text-sm text-[#2E263D]">
              Didn't get the mail? <button className="text-[#8C57FF] hover:underline">Resend</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
