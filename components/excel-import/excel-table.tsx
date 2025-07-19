"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, X, ChevronDown, Settings, Download, Upload } from "lucide-react"

interface Column {
  id: string
  name: string
  visible: boolean
}

interface ExcelTableProps {
  initialColumns: Column[]
  initialData: any[]
  onDataChange: (data: any[]) => void
  tableName?: string
}

export function ExcelTable({ initialColumns, initialData, onDataChange, tableName = "Data" }: ExcelTableProps) {
  const [columns, setColumns] = useState<Column[]>(initialColumns)
  const [data, setData] = useState<any[]>(initialData)
  const [searchTerm, setSearchTerm] = useState("")
  const [showColumnCustomizer, setShowColumnCustomizer] = useState(false)
  const [editingCell, setEditingCell] = useState<{ rowIndex: number; columnId: string } | null>(null)
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const tableRef = useRef<HTMLDivElement>(null)

  const isFirstRender = useRef(true)
  const prevDataStr = useRef(JSON.stringify(initialData))
  const dataChangeTimeout = useRef<NodeJS.Timeout | null>(null)

  // Filter visible columns
  const visibleColumns = columns.filter((col) => col.visible)

  // Handle data changes
  useEffect(() => {
    // Skip the initial render
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    // Use a debounce mechanism to prevent too many updates
    if (dataChangeTimeout.current) {
      clearTimeout(dataChangeTimeout.current)
    }

    dataChangeTimeout.current = setTimeout(() => {
      // Compare stringified data to avoid unnecessary updates
      const currentDataStr = JSON.stringify(data)
      if (prevDataStr.current !== currentDataStr) {
        prevDataStr.current = currentDataStr
        onDataChange(data)
      }
    }, 300)

    return () => {
      if (dataChangeTimeout.current) {
        clearTimeout(dataChangeTimeout.current)
      }
    }
  }, [data, onDataChange])

  // Handle cell edit
  const handleCellEdit = (rowIndex: number, columnId: string, value: any) => {
    const newData = [...data]
    newData[rowIndex] = { ...newData[rowIndex], [columnId]: value }
    setData(newData)
    setEditingCell(null)
  }

  // Handle column visibility toggle
  const toggleColumnVisibility = (columnId: string) => {
    setColumns(columns.map((col) => (col.id === columnId ? { ...col, visible: !col.visible } : col)))
  }

  // Handle row selection
  const toggleRowSelection = (rowIndex: number) => {
    if (selectedRows.includes(rowIndex)) {
      setSelectedRows(selectedRows.filter((index) => index !== rowIndex))
    } else {
      setSelectedRows([...selectedRows, rowIndex])
    }
  }

  // Handle select all rows
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([])
    } else {
      setSelectedRows(data.map((_, index) => index))
    }
    setSelectAll(!selectAll)
  }

  // Handle paste from clipboard
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const clipboardData = e.clipboardData.getData("text")
    const rows = clipboardData.split("\n").filter((row) => row.trim())

    if (rows.length === 0) return

    const newData = [...data]

    rows.forEach((row, rowIndex) => {
      const cells = row.split("\t")

      // Skip if we're beyond the data array length
      if (rowIndex + (editingCell?.rowIndex || 0) >= newData.length) {
        // Add new row if needed
        const newRow: any = {}
        visibleColumns.forEach((col, colIndex) => {
          if (colIndex < cells.length) {
            newRow[col.id] = cells[colIndex]
          }
        })
        newData.push(newRow)
      } else {
        // Update existing row
        visibleColumns.forEach((col, colIndex) => {
          if (colIndex < cells.length) {
            const targetRowIndex = rowIndex + (editingCell?.rowIndex || 0)
            newData[targetRowIndex] = {
              ...newData[targetRowIndex],
              [visibleColumns[colIndex].id]: cells[colIndex],
            }
          }
        })
      }
    })

    setData(newData)
  }

  // Filter data based on search term
  const filteredData = data.filter((row) => {
    if (!searchTerm) return true
    return Object.values(row).some(
      (value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    )
  })

  // Add a new empty row
  const addNewRow = () => {
    const newRow: any = {}
    columns.forEach((col) => {
      newRow[col.id] = ""
    })
    setData([...data, newRow])
  }

  // Delete selected rows
  const deleteSelectedRows = () => {
    const newData = data.filter((_, index) => !selectedRows.includes(index))
    setData(newData)
    setSelectedRows([])
    setSelectAll(false)
  }

  return (
    <div className="excel-import-container border border-divider rounded-md overflow-hidden w-full">
      {/* Header with instructions */}
      <div className="bg-light-bg dark:bg-dark-bg p-3 border-b border-divider">
        <div className="flex items-center space-x-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">
          <div className="flex items-center">
            <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white mr-2">1</span>
            <span>Select a list</span>
          </div>
          <div className="flex items-center">
            <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white mr-2">2</span>
            <span>Customise columns to display</span>
          </div>
          <div className="flex items-center">
            <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white mr-2">3</span>
            <span>Paste from Excel or type to add to or modify your list</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-light-card dark:bg-dark-card p-3 border-b border-divider flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-xs text-light-text-secondary dark:text-dark-text-secondary mb-1">List</label>
            <div className="relative">
              <select className="form-input h-9 py-1 pr-8 appearance-none">
                <option>{tableName}</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-light-text-secondary dark:text-dark-text-secondary pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-light-text-secondary dark:text-dark-text-secondary mb-1">View</label>
            <div className="relative">
              <select className="form-input h-9 py-1 pr-8 appearance-none">
                <option>Active {tableName}</option>
                <option>All {tableName}</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-light-text-secondary dark:text-dark-text-secondary pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div>
            <label className="block text-xs text-light-text-secondary dark:text-dark-text-secondary mb-1">Find</label>
            <div className="relative">
              <input
                type="text"
                className="form-input h-9 py-1 pl-8 pr-8"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-light-text-secondary dark:text-dark-text-secondary" />
              {searchTerm && (
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-4 w-4 text-light-text-secondary dark:text-dark-text-secondary" />
                </button>
              )}
            </div>
          </div>
          <button
            className="form-button-secondary h-9 px-3 py-1 ml-2 mt-5"
            onClick={() => setShowColumnCustomizer(!showColumnCustomizer)}
          >
            <Settings className="h-4 w-4 mr-1" />
            Customise Columns
          </button>
        </div>
      </div>

      {/* Currently editing indicator */}
      <div className="bg-light-bg dark:bg-dark-bg p-2 border-b border-divider">
        <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
          Currently Editing: <span className="font-medium text-primary">{tableName}</span>
        </div>
      </div>

      {/* Column customizer */}
      {showColumnCustomizer && (
        <div className="bg-light-card dark:bg-dark-card p-3 border-b border-divider">
          <h4 className="font-medium mb-2">Customize Columns</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {columns.map((column) => (
              <div key={column.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`col-${column.id}`}
                  checked={column.visible}
                  onChange={() => toggleColumnVisibility(column.id)}
                  className="mr-2"
                />
                <label htmlFor={`col-${column.id}`} className="text-sm">
                  {column.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-auto" style={{ maxHeight: "600px" }} ref={tableRef} onPaste={handlePaste}>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-light-table-header dark:bg-dark-table-header">
              <th className="border border-divider p-2 sticky top-0 bg-light-table-header dark:bg-dark-table-header z-10">
                <input type="checkbox" checked={selectAll} onChange={toggleSelectAll} className="h-4 w-4" />
              </th>
              {visibleColumns.map((column) => (
                <th
                  key={column.id}
                  className="border border-divider p-2 text-left text-sm font-medium sticky top-0 bg-light-table-header dark:bg-dark-table-header z-10"
                >
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  selectedRows.includes(rowIndex)
                    ? "bg-primary-light dark:bg-primary-light"
                    : rowIndex % 2 === 0
                      ? "bg-light-card dark:bg-dark-card"
                      : "bg-light-bg dark:bg-dark-bg"
                }`}
              >
                <td className="border border-divider p-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(rowIndex)}
                    onChange={() => toggleRowSelection(rowIndex)}
                    className="h-4 w-4"
                  />
                </td>
                {visibleColumns.map((column) => (
                  <td
                    key={`${rowIndex}-${column.id}`}
                    className="border border-divider p-0 min-w-[120px]"
                    onClick={() => setEditingCell({ rowIndex, columnId: column.id })}
                  >
                    {editingCell?.rowIndex === rowIndex && editingCell?.columnId === column.id ? (
                      <input
                        type="text"
                        value={row[column.id] || ""}
                        onChange={(e) => handleCellEdit(rowIndex, column.id, e.target.value)}
                        onBlur={() => setEditingCell(null)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleCellEdit(rowIndex, column.id, e.currentTarget.value)
                          }
                        }}
                        className="w-full h-full p-2 border-none focus:outline-none focus:ring-1 focus:ring-primary bg-transparent"
                        autoFocus
                      />
                    ) : (
                      <div className="p-2 min-h-[36px]">{row[column.id] || ""}</div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
            {/* Empty row for adding new data */}
            <tr className="bg-light-card dark:bg-dark-card">
              <td className="border border-divider p-2 text-center">
                <span className="text-light-text-secondary dark:text-dark-text-secondary">+</span>
              </td>
              {visibleColumns.map((column, colIndex) => (
                <td
                  key={`new-${column.id}`}
                  className="border border-divider p-0 min-w-[120px]"
                  onClick={() => {
                    addNewRow()
                    setEditingCell({ rowIndex: data.length, columnId: column.id })
                  }}
                >
                  <div className="p-2 min-h-[36px] text-light-text-secondary dark:text-dark-text-secondary italic">
                    {colIndex === 0 ? "Click to add new row..." : ""}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer with actions */}
      <div className="bg-light-card dark:bg-dark-card p-3 border-t border-divider flex justify-between">
        <div className="flex space-x-2">
          <button className="form-button-secondary h-9 px-3 py-1" onClick={addNewRow}>
            Add Row
          </button>
          <button
            className="form-button-secondary h-9 px-3 py-1"
            onClick={deleteSelectedRows}
            disabled={selectedRows.length === 0}
          >
            Delete Selected
          </button>
        </div>
        <div className="flex space-x-2">
          <button className="form-button-secondary h-9 px-3 py-1">
            <Upload className="h-4 w-4 mr-1" />
            Import CSV
          </button>
          <button className="form-button-secondary h-9 px-3 py-1">
            <Download className="h-4 w-4 mr-1" />
            Export
          </button>
          <button className="form-button-primary h-9 px-3 py-1">Save Changes</button>
        </div>
      </div>
    </div>
  )
}
