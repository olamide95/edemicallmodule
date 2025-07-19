"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, ChevronRight, Home, Search, Filter, Download, Pencil, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudentDiscountAssignment } from "@/components/admin/discounts/student-discount-assignment"
import Image from "next/image"
import { useTheme } from "@/components/theme-provider"

// Sample discount types data
const discountTypes = [
  {
    id: 1,
    name: "Sibling Discount",
    description: "Discount for families with multiple children",
    type: "Percentage",
    value: "15%",
    category: "Sibling",
    applicableFees: "All Fees",
    active: true,
  },
  {
    id: 2,
    name: "Staff Discount",
    description: "Discount for children of staff members",
    type: "Percentage",
    value: "50%",
    category: "General",
    applicableFees: "Tuition Fee Only",
    active: true,
  },
  {
    id: 3,
    name: "Merit Scholarship",
    description: "Discount for academic excellence",
    type: "Percentage",
    value: "25%",
    category: "Scholarship",
    applicableFees: "Tuition Fee Only",
    active: true,
  },
  {
    id: 4,
    name: "Financial Aid",
    description: "Need-based financial assistance",
    type: "Percentage",
    value: "Variable (10-100%)",
    category: "Scholarship",
    applicableFees: "All Fees",
    active: true,
  },
  {
    id: 5,
    name: "Early Payment Discount",
    description: "Discount for paying full year in advance",
    type: "Fixed Amount",
    value: "$200.00",
    category: "General",
    applicableFees: "Tuition Fee Only",
    active: false,
  },
]

export default function DiscountsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { theme } = useTheme()

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="flex h-screen bg-light-bg dark:bg-dark-bg">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuToggle={toggleSidebar} />
   
        <main className="flex-1 overflow-y-auto bg-light-bg dark:bg-[#28243D] p-6">
          {/* Header with Illustration */}
          <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg overflow-hidden shadow-sm mb-6">
            <div className="p-6 relative">
              <div className="max-w-[60%]">
                <h1 className="text-2xl font-bold mb-1">Discount Management</h1>

                <div className="flex items-center gap-2 text-sm mb-4">
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">Finance</span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    <ChevronRight size={16} className="inline" />
                  </span>
                  <span className="text-primary italic">Discount Configuration</span>
                </div>

                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 italic">
                  Configure and manage all fee discounts, scholarships, and financial aid programs for your institution
                </p>

                <Link href="/finance/admin/discounts/add">
                  <Button className="bg-[#8c57ff] hover:bg-[#8c57ff]/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Discount Type
                  </Button>
                </Link>
              </div>

              <div className="absolute right-0 top-0 h-full flex items-center">
                <Image
                  src="/discount-illustration.png"  // Update with your discount-related illustration
                  alt="Discount Illustration"
                  width={400}
                  height={200}
                  className="max-h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Discount Content */}
          <div className="space-y-6">
            <Tabs defaultValue="types" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 mb-2">
                <TabsTrigger value="types">Discount Types</TabsTrigger>
                <TabsTrigger value="assign">Assign Discount</TabsTrigger>
              </TabsList>

              <TabsContent value="types" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-6">
                      <div className="flex-1 space-y-2">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Search discounts..." className="pl-8" />
                        </div>
                      </div>
                      <div className="w-full md:w-1/4 space-y-2">
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="Filter by category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="general">General</SelectItem>
                            <SelectItem value="sibling">Sibling</SelectItem>
                            <SelectItem value="scholarship">Scholarship</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-full md:w-1/4 space-y-2">
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="Filter by status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="icon" className="h-10 w-10">
                          <Filter className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-10 w-10">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Value</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Applicable Fees</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {discountTypes.map((discount) => (
                          <TableRow key={discount.id}>
                            <TableCell className="font-medium">
                              <div>
                                <div>{discount.name}</div>
                                <div className="text-xs text-muted-foreground">{discount.description}</div>
                              </div>
                            </TableCell>
                            <TableCell>{discount.type}</TableCell>
                            <TableCell>{discount.value}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  discount.category === "Scholarship"
                                    ? "border-[#8c57ff] text-[#8c57ff]"
                                    : discount.category === "Sibling"
                                      ? "border-blue-500 text-blue-500"
                                      : "border-green-500 text-green-500"
                                }
                              >
                                {discount.category}
                              </Badge>
                            </TableCell>
                            <TableCell>{discount.applicableFees}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  discount.active ? "border-green-500 text-green-500" : "border-red-500 text-red-500"
                                }
                              >
                                {discount.active ? "Active" : "Inactive"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button variant="ghost" size="icon">
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="assign" className="space-y-4">
                <StudentDiscountAssignment />
              </TabsContent>
            </Tabs>
          </div>
        </main>

        <footer className="border-t border-divider py-3 px-6 text-sm text-light-text-secondary dark:text-dark-text-secondary flex flex-wrap justify-between items-center gap-2 bg-light-card-bg dark:bg-dark-card-bg">
          <div>© 2024, Made with ❤️ by ThemeSelection</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary">
              License
            </a>
            <a href="#" className="hover:text-primary">
              More Themes
            </a>
            <a href="#" className="hover:text-primary">
              Documentation
            </a>
            <a href="#" className="hover:text-primary">
              Support
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}