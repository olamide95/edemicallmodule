import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

const recentPayments = [
  {
    id: 1,
    receiptNumber: "RCT-10045",
    studentName: "Alex Smith",
    paymentDate: "2023-04-10",
    amount: "$1,200.00",
    paymentMethod: "Bank Transfer",
    status: "Completed",
  },
  {
    id: 2,
    receiptNumber: "RCT-10046",
    studentName: "Emma Smith",
    paymentDate: "2023-03-15",
    amount: "$1,500.00",
    paymentMethod: "Paystack",
    status: "Completed",
  },
  {
    id: 3,
    receiptNumber: "RCT-10047",
    studentName: "Alex Smith",
    paymentDate: "2023-02-08",
    amount: "$800.00",
    paymentMethod: "Flutterwave",
    status: "Completed",
  },
]

export function RecentPayments() {
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader className="bg-table-header">
          <TableRow>
            <TableHead>Receipt</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentPayments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium">{payment.receiptNumber}</TableCell>
              <TableCell>{payment.studentName}</TableCell>
              <TableCell>{payment.paymentDate}</TableCell>
              <TableCell>{payment.amount}</TableCell>
              <TableCell>{payment.paymentMethod}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Receipt
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
