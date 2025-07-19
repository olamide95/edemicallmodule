import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function StudentUpcomingAssignments() {
  const assignments = [
    {
      id: 1,
      title: "Mathematics Problem Set",
      course: "Mathematics",
      dueDate: "2023-05-15",
      status: "pending",
    },
    {
      id: 2,
      title: "English Literature Essay",
      course: "English",
      dueDate: "2023-05-16",
      status: "in-progress",
    },
    {
      id: 3,
      title: "Physics Lab Report",
      course: "Physics",
      dueDate: "2023-05-18",
      status: "pending",
    },
    {
      id: 4,
      title: "History Research Paper",
      course: "History",
      dueDate: "2023-05-20",
      status: "in-progress",
    },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Assignment</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assignments.map((assignment) => (
          <TableRow key={assignment.id}>
            <TableCell className="font-medium">{assignment.title}</TableCell>
            <TableCell>{assignment.course}</TableCell>
            <TableCell>{new Date(assignment.dueDate).toLocaleDateString()}</TableCell>
            <TableCell>
              <Badge variant={assignment.status === "pending" ? "outline" : "secondary"}>
                {assignment.status === "pending" ? "Pending" : "In Progress"}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
