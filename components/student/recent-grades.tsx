import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function StudentRecentGrades() {
  const grades = [
    {
      id: 1,
      assignment: "Biology Quiz",
      course: "Biology",
      grade: "A",
      score: "92%",
    },
    {
      id: 2,
      assignment: "Chemistry Lab",
      course: "Chemistry",
      grade: "B+",
      score: "88%",
    },
    {
      id: 3,
      assignment: "Algebra Test",
      course: "Mathematics",
      grade: "A-",
      score: "90%",
    },
    {
      id: 4,
      assignment: "Literature Analysis",
      course: "English",
      grade: "B",
      score: "85%",
    },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Assignment</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Grade</TableHead>
          <TableHead>Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {grades.map((grade) => (
          <TableRow key={grade.id}>
            <TableCell className="font-medium">{grade.assignment}</TableCell>
            <TableCell>{grade.course}</TableCell>
            <TableCell>{grade.grade}</TableCell>
            <TableCell>{grade.score}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
