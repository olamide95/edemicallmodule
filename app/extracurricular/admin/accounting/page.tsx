import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccountingOverview } from "@/components/accounting-overview"
import { GeneralLedger } from "@/components/general-ledger"
import { FinancialReports } from "@/components/financial-reports"

export default function AccountingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Accounting</h1>
        <p className="text-muted-foreground">Manage financial aspects of extracurricular activities</p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="general-ledger">General Ledger</TabsTrigger>
          <TabsTrigger value="reports">Financial Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <AccountingOverview />
        </TabsContent>

        <TabsContent value="general-ledger">
          <GeneralLedger />
        </TabsContent>

        <TabsContent value="reports">
          <FinancialReports />
        </TabsContent>
      </Tabs>
    </div>
  )
}
