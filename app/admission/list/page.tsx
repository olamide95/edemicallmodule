import { StudentInformation } from "@/components/admission/admission-list"
import  Layout  from "@/components/layout"

export default function AdmissionListPage() {
  return (
    <Layout>
      <div className="container mx-auto py-6">
        <StudentInformation />
      </div>
    </Layout>
  )
}
