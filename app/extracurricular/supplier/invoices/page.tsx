import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SupplierInvoices } from "@/components/supplier-invoices"

export default function SupplierInvoicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Invoices</h1>
        <p className="text-muted-foreground">Manage and track your club invoices</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
          <SupplierInvoices />
        </CardContent>
      </Card>
    </div>
  )
}
