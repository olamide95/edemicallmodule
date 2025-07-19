import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

const children = [
  {
    id: 1,
    name: "Alex Smith",
    class: "Grade 10A",
    totalFees: 3000,
    paidFees: 1500,
    dueDate: "2023-05-15",
  },
  {
    id: 2,
    name: "Emma Smith",
    class: "Grade 8B",
    totalFees: 2500,
    paidFees: 1000,
    dueDate: "2023-05-15",
  },
]

export function ChildrenFeeStatus() {
  return (
    <div className="space-y-6">
      {children.map((child) => {
        const paymentPercentage = Math.round((child.paidFees / child.totalFees) * 100)

        return (
          <div key={child.id} className="space-y-2">
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={`/abstract-geometric-shapes.png?height=40&width=40&query=${child.name}`}
                  alt={child.name}
                />
                <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{child.name}</p>
                <p className="text-xs text-muted-foreground">{child.class}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Payment Progress</span>
                <span>{paymentPercentage}%</span>
              </div>
              <Progress value={paymentPercentage} className="h-2" />

              <div className="flex justify-between text-xs">
                <span className="text-success">${child.paidFees.toFixed(2)} Paid</span>
                <span className="text-error">${(child.totalFees - child.paidFees).toFixed(2)} Due</span>
              </div>

              <div className="text-xs text-muted-foreground">Due Date: {child.dueDate}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
