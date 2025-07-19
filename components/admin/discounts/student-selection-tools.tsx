"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, Users, Save, Download, Upload } from "lucide-react"

interface StudentSelectionToolsProps {
  selectedCount: number
  onBulkAssign: () => void
  onIndividualAssign: () => void
}

export function StudentSelectionTools({ selectedCount, onBulkAssign, onIndividualAssign }: StudentSelectionToolsProps) {
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-between items-start sm:items-center border rounded-md p-3 bg-muted/30">
      <div className="flex items-center space-x-2">
        <Badge variant="outline" className="bg-[#8c57ff] text-white">
          {selectedCount} students selected
        </Badge>
        <Select defaultValue="actions">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selection Actions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="actions">Selection Actions</SelectItem>
            <SelectItem value="selectAll">Select All</SelectItem>
            <SelectItem value="deselectAll">Deselect All</SelectItem>
            <SelectItem value="invertSelection">Invert Selection</SelectItem>
            <SelectItem value="saveSelection">Save Selection</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onIndividualAssign}
          disabled={selectedCount !== 1}
          className={selectedCount === 1 ? "border-[#8c57ff] text-[#8c57ff]" : ""}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Individual Assign
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onBulkAssign}
          disabled={selectedCount === 0}
          className={selectedCount > 0 ? "border-[#8c57ff] text-[#8c57ff]" : ""}
        >
          <Users className="h-4 w-4 mr-2" />
          Bulk Assign Discount
        </Button>
        <Button variant="outline" size="sm">
          <Save className="h-4 w-4 mr-2" />
          Save Selection
        </Button>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button variant="outline" size="sm">
          <Upload className="h-4 w-4 mr-2" />
          Import
        </Button>
      </div>
    </div>
  )
}
