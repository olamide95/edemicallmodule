import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const upcomingPayments = [
  {
    id: 1,
    invoiceNumber: "INV-2023-001",
    studentName: "Alex Smith",
    dueDate: "2023-05-15",
    amount: "$1,250.00",
    status: "Upcoming",
  },
  {
    id: 2,
    invoiceNumber: "INV-2023-002",
    studentName: "Emma Smith",
    dueDate: "2023-05-15",
    amount: "$1,250.00",
    status: "Upcoming",
  },
  {
    id: 3,
    invoiceNumber: "INV-2023-003",
    studentName: "Alex Smith",
    dueDate: "2023-06-10",
    amount: "$750.00",
    status: "Future",
  },
]

export function UpcomingPayments() {
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader className="bg-table-header">
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {upcomingPayments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium">{payment.invoiceNumber}</TableCell>
              <TableCell>{payment.studentName}</TableCell>
              <TableCell>{payment.dueDate}</TableCell>
              <TableCell>{payment.amount}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    payment.status === "Upcoming" ? "border-warning text-warning" : "border-secondary text-secondary"
                  }
                >
                  {payment.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  className={payment.status === "Upcoming" ? "bg-primary-solid hover:bg-primary/90" : "bg-secondary"}
                >
                  Pay Now
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
