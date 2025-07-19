"use client"

import { useRef, useEffect, useContext } from "react"
import { OnboardingContext } from "@/components/onboarding/onboarding-layout"
import { useTheme } from "next-themes"

interface Department {
  id: string
  name: string
  isAcademic: boolean
  type: "parent" | "department" | "sub" | "class"
  parentDepartment: string | null
}

interface OrganogramVisualizationProps {
  departments: Department[]
}

export function OrganogramVisualization({ departments }: OrganogramVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { schoolData } = useContext(OnboardingContext)
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = 800 // Increased height for better visualization

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw organogram
    drawOrganogram(ctx, canvas.width, canvas.height, departments, schoolData.name, isDarkMode)
  }, [departments, schoolData.name, isDarkMode])

  const drawOrganogram = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    departments: Department[],
    organizationName: string,
    isDarkMode: boolean,
  ) => {
    // Set up dimensions and spacing
    const nodeRadius = 40
    const nodeOuterRadius = 50
    const verticalSpacing = 150
    const horizontalSpacing = 180
    const lineColor = isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"
    const textColor = isDarkMode ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)"
    const subTextColor = isDarkMode ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)"
    const lineWidth = 1

    // Colors for different levels
    const colors = {
      organization: "#8C57FF", // Purple for organization (top level)
      parent: "#D81B60", // Pink/Magenta for department heads
      department: "#D81B60", // Pink/Magenta for departments
      sub: "#FF5722", // Orange for sub-departments
      class: "#FF5722", // Orange for classes
    }

    // Draw the school name at the very top
    ctx.font = "bold 20px Arial"
    ctx.fillStyle = isDarkMode ? "#FFFFFF" : "#000000"
    ctx.textAlign = "center"
    ctx.fillText(organizationName, width / 2, 30)

    // Start with the organization at the top
    const startY = 80
    const startX = width / 2

    // Draw organization node (top level)
    drawNode(
      ctx,
      startX,
      startY,
      nodeRadius,
      nodeOuterRadius,
      colors.organization,
      organizationName,
      true,
      isDarkMode,
      textColor,
      subTextColor,
    )

    // Find parent departments (those with no parent)
    const parentDepts = departments.filter(
      (dept) => dept.type === "parent" || (!dept.parentDepartment && dept.type === "department"),
    )

    if (parentDepts.length === 0) return

    // Calculate positions for parent departments
    const parentY = startY + verticalSpacing
    const parentWidth = Math.max(width * 0.8, parentDepts.length * horizontalSpacing)
    const parentStartX = (width - parentWidth) / 2 + horizontalSpacing / 2

    // Store positions of departments for line drawing
    const positions: Record<string, { x: number; y: number }> = {}

    // Draw lines from organization to parent departments
    parentDepts.forEach((dept, index) => {
      const x = parentStartX + index * horizontalSpacing
      positions[dept.id] = { x, y: parentY }

      // Draw line from organization to this parent department
      ctx.beginPath()
      ctx.moveTo(startX, startY + nodeOuterRadius)
      ctx.lineTo(startX, parentY - verticalSpacing / 2)
      ctx.lineTo(x, parentY - verticalSpacing / 2)
      ctx.lineTo(x, parentY - nodeOuterRadius)
      ctx.strokeStyle = lineColor
      ctx.lineWidth = lineWidth
      ctx.stroke()

      // Draw parent department node
      drawNode(
        ctx,
        x,
        parentY,
        nodeRadius,
        nodeOuterRadius,
        colors.parent,
        dept.name,
        false,
        isDarkMode,
        textColor,
        subTextColor,
      )

      // Find employees for this department
      const deptEmployees = schoolData.employees?.filter((emp) => emp.department === dept.name) || []
      if (deptEmployees.length > 0) {
        // Display employee names under the department
        ctx.font = "11px Arial"
        ctx.fillStyle = subTextColor
        ctx.textAlign = "center"

        deptEmployees.forEach((emp, empIndex) => {
          ctx.fillText(emp.name, x, parentY + nodeOuterRadius + 60 + empIndex * 15)
        })
      }
    })

    // Draw second level (departments with parent)
    const secondLevelDepts = departments.filter((dept) =>
      parentDepts.some((parent) => dept.parentDepartment === parent.id),
    )

    if (secondLevelDepts.length > 0) {
      // Group second level departments by their parent
      const groupedByParent: Record<string, Department[]> = {}

      secondLevelDepts.forEach((dept) => {
        if (!dept.parentDepartment) return

        if (!groupedByParent[dept.parentDepartment]) {
          groupedByParent[dept.parentDepartment] = []
        }

        groupedByParent[dept.parentDepartment].push(dept)
      })

      // Draw each group under its parent
      Object.entries(groupedByParent).forEach(([parentId, childDepts]) => {
        const parentPos = positions[parentId]
        if (!parentPos) return

        const childY = parentY + verticalSpacing
        const childWidth = childDepts.length * horizontalSpacing
        const childStartX = parentPos.x - childWidth / 2 + horizontalSpacing / 2

        // Draw children
        childDepts.forEach((child, index) => {
          const x = childStartX + index * horizontalSpacing
          positions[child.id] = { x, y: childY }

          // Draw line from parent to this child
          ctx.beginPath()
          ctx.moveTo(parentPos.x, parentPos.y + nodeOuterRadius)
          ctx.lineTo(parentPos.x, childY - verticalSpacing / 2)
          ctx.lineTo(x, childY - verticalSpacing / 2)
          ctx.lineTo(x, childY - nodeOuterRadius)
          ctx.strokeStyle = lineColor
          ctx.lineWidth = lineWidth
          ctx.stroke()

          // Draw child node
          drawNode(
            ctx,
            x,
            childY,
            nodeRadius,
            nodeOuterRadius,
            child.isAcademic ? colors.department : colors.sub,
            child.name,
            false,
            isDarkMode,
            textColor,
            subTextColor,
          )

          // Find employees for this department
          const deptEmployees = schoolData.employees?.filter((emp) => emp.department === child.name) || []
          if (deptEmployees.length > 0) {
            // Display employee names under the department
            ctx.font = "11px Arial"
            ctx.fillStyle = subTextColor
            ctx.textAlign = "center"

            deptEmployees.forEach((emp, empIndex) => {
              ctx.fillText(emp.name, x, childY + nodeOuterRadius + 60 + empIndex * 15)
            })
          }
        })
      })

      // Draw third level (sub-departments or classes)
      const thirdLevelDepts = departments.filter((dept) =>
        secondLevelDepts.some((parent) => dept.parentDepartment === parent.id),
      )

      if (thirdLevelDepts.length > 0) {
        // Group third level departments by their parent
        const groupedByParent: Record<string, Department[]> = {}

        thirdLevelDepts.forEach((dept) => {
          if (!dept.parentDepartment) return

          if (!groupedByParent[dept.parentDepartment]) {
            groupedByParent[dept.parentDepartment] = []
          }

          groupedByParent[dept.parentDepartment].push(dept)
        })

        // Draw each group under its parent
        Object.entries(groupedByParent).forEach(([parentId, childDepts]) => {
          const parentPos = positions[parentId]
          if (!parentPos) return

          const childY = parentY + verticalSpacing * 2
          const childWidth = childDepts.length * horizontalSpacing
          const childStartX = parentPos.x - childWidth / 2 + horizontalSpacing / 2

          // Draw children
          childDepts.forEach((child, index) => {
            const x = childStartX + index * horizontalSpacing

            // Draw line from parent to this child
            ctx.beginPath()
            ctx.moveTo(parentPos.x, parentPos.y + nodeOuterRadius)
            ctx.lineTo(parentPos.x, childY - verticalSpacing / 2)
            ctx.lineTo(x, childY - verticalSpacing / 2)
            ctx.lineTo(x, childY - nodeOuterRadius)
            ctx.strokeStyle = lineColor
            ctx.lineWidth = lineWidth
            ctx.stroke()

            // Draw child node
            drawNode(
              ctx,
              x,
              childY,
              nodeRadius,
              nodeOuterRadius,
              child.isAcademic ? colors.department : colors.sub,
              child.name,
              false,
              isDarkMode,
              textColor,
              subTextColor,
            )

            // Find employees for this department
            const deptEmployees = schoolData.employees?.filter((emp) => emp.department === child.name) || []
            if (deptEmployees.length > 0) {
              // Display employee names under the department
              ctx.font = "11px Arial"
              ctx.fillStyle = subTextColor
              ctx.textAlign = "center"

              deptEmployees.forEach((emp, empIndex) => {
                ctx.fillText(emp.name, x, childY + nodeOuterRadius + 60 + empIndex * 15)
              })
            }
          })
        })
      }
    }
  }

  const drawNode = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    innerRadius: number,
    outerRadius: number,
    color: string,
    name: string,
    isOrganization: boolean,
    isDarkMode: boolean,
    textColor: string,
    subTextColor: string,
  ) => {
    // Draw outer circle with shadow
    ctx.save()
    ctx.shadowColor = "rgba(0, 0, 0, 0.2)"
    ctx.shadowBlur = 10
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 4
    ctx.beginPath()
    ctx.arc(x, y, outerRadius, 0, Math.PI * 2)
    ctx.fillStyle = isDarkMode ? "rgba(49, 45, 75, 0.7)" : "rgba(255, 255, 255, 0.7)" // Semi-transparent background
    ctx.fill()
    ctx.restore()

    // Draw colored circle border
    ctx.beginPath()
    ctx.arc(x, y, innerRadius, 0, Math.PI * 2)
    ctx.strokeStyle = color
    ctx.lineWidth = 4
    ctx.stroke()

    // Draw inner circle
    ctx.beginPath()
    ctx.arc(x, y, innerRadius - 2, 0, Math.PI * 2)
    ctx.fillStyle = isDarkMode ? "rgba(49, 45, 75, 0.7)" : "rgba(255, 255, 255, 0.7)" // Semi-transparent background
    ctx.fill()

    // Draw user icon
    drawUserIcon(ctx, x, y, color)

    // Draw name text below the node
    ctx.fillStyle = textColor
    ctx.font = isOrganization ? "bold 14px Arial" : "14px Arial"
    ctx.textAlign = "center"
    ctx.fillText(name || "Unnamed", x, y + outerRadius + 20)

    // Draw description text (smaller and gray)
    ctx.fillStyle = subTextColor
    ctx.font = "12px Arial"
    const description = isOrganization ? "Organization" : name.includes("Department") ? "Department" : "Team"
    ctx.fillText(description, x, y + outerRadius + 40)
  }

  const drawUserIcon = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string) => {
    // Draw a simple user icon
    const headRadius = 8
    const bodyHeight = 10

    // Head
    ctx.beginPath()
    ctx.arc(x, y - 5, headRadius, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()

    // Body
    ctx.beginPath()
    ctx.moveTo(x - 10, y + 15)
    ctx.quadraticCurveTo(x, y + 5, x + 10, y + 15)
    ctx.fillStyle = color
    ctx.fill()
  }

  return (
    <div className="w-full overflow-auto rounded-lg" style={{ backgroundColor: "transparent" }}>
      <canvas ref={canvasRef} className="w-full" style={{ minHeight: "800px" }} />
    </div>
  )
}
