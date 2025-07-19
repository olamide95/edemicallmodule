import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Eye, Plus, Download } from "lucide-react"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export const metadata: Metadata = {
  title: "Referral Payouts | School Finance Management",
  description: "Manage referral program payouts and rewards",
}

export default function ReferralPayoutsPage() {
  return (
    <div className="flex h-screen bg-light-bg dark:bg-dark-bg">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-light-bg dark:bg-[#28243D] p-6">
          {/* Tools Header with Illustration - Dark Mode Support */}
          <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg overflow-hidden shadow-sm mb-6">
            <div className="p-6 relative">
              <div className="max-w-[60%]">
                <h1 className="text-2xl font-bold mb-1">Referral Payouts</h1>

                <div className="flex items-center gap-2 text-sm mb-4">
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">Marketing</span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    <ChevronRight size={16} className="inline" />
                  </span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">Referral Program</span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    <ChevronRight size={16} className="inline" />
                  </span>
                  <span className="text-primary italic">Payout Management</span>
                </div>

                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 italic">
                  Process and manage all referral rewards and incentive payouts
                </p>

                <div className="flex gap-4">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Payout
                  </Button>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search payouts..."
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="absolute right-0 top-0 h-full flex items-center">
                <Image
                  src="/payouts-illustration.png"
                  alt="Payouts Illustration"
                  width={400}
                  height={200}
                  className="max-h-full object-contain"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Tabs defaultValue="pending" className="space-y-4">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="approved">Approved</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>

              <TabsContent value="pending" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Pending Payout Requests</CardTitle>
                        <CardDescription>Requests awaiting approval and processing</CardDescription>
                      </div>
                      <Badge variant="secondary">3 requests</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Referrer</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Program</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Request Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Mary Johnson</TableCell>
                          <TableCell>Staff</TableCell>
                          <TableCell>Cash Payout</TableCell>
                          <TableCell>₦25,000</TableCell>
                          <TableCell>May 15, 2023</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">John Smith</TableCell>
                          <TableCell>Parent</TableCell>
                          <TableCell>Tuition Discount</TableCell>
                          <TableCell>10% on Tuition</TableCell>
                          <TableCell>May 12, 2023</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Sarah Williams</TableCell>
                          <TableCell>Staff</TableCell>
                          <TableCell>Cash Payout</TableCell>
                          <TableCell>₦25,000</TableCell>
                          <TableCell>May 10, 2023</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="approved" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Approved Requests</CardTitle>
                        <CardDescription>Requests that have been approved but not yet processed</CardDescription>
                      </div>
                      <Badge variant="secondary">2 requests</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Referrer</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Program</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Approval Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">David Miller</TableCell>
                          <TableCell>Parent</TableCell>
                          <TableCell>Cash Payout</TableCell>
                          <TableCell>₦15,000</TableCell>
                          <TableCell>May 8, 2023</TableCell>
                          <TableCell>
                            <Badge className="bg-blue-500">Processing</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Jennifer Lee</TableCell>
                          <TableCell>Staff</TableCell>
                          <TableCell>Tuition Discount</TableCell>
                          <TableCell>15% on Tuition</TableCell>
                          <TableCell>May 5, 2023</TableCell>
                          <TableCell>
                            <Badge className="bg-blue-500">Processing</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rejected" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Rejected Requests</CardTitle>
                        <CardDescription>Requests that have been rejected</CardDescription>
                      </div>
                      <Badge variant="secondary">1 request</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Referrer</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Program</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Rejection Date</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Michael Brown</TableCell>
                          <TableCell>Parent</TableCell>
                          <TableCell>Cash Payout</TableCell>
                          <TableCell>₦15,000</TableCell>
                          <TableCell>May 3, 2023</TableCell>
                          <TableCell>Insufficient referrals</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Payout History</CardTitle>
                        <CardDescription>Complete history of all processed payouts</CardDescription>
                      </div>
                      <Badge variant="secondary">3 records</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Referrer</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Program</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Request Date</TableHead>
                          <TableHead>Processed Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Robert Wilson</TableCell>
                          <TableCell>Staff</TableCell>
                          <TableCell>Cash Payout</TableCell>
                          <TableCell>₦25,000</TableCell>
                          <TableCell>Apr 20, 2023</TableCell>
                          <TableCell>Apr 25, 2023</TableCell>
                          <TableCell>
                            <Badge className="bg-green-500">Completed</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Emily Davis</TableCell>
                          <TableCell>Parent</TableCell>
                          <TableCell>Tuition Discount</TableCell>
                          <TableCell>10% on Tuition</TableCell>
                          <TableCell>Apr 15, 2023</TableCell>
                          <TableCell>Apr 18, 2023</TableCell>
                          <TableCell>
                            <Badge className="bg-green-500">Completed</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">James Wilson</TableCell>
                          <TableCell>Staff</TableCell>
                          <TableCell>Cash Payout</TableCell>
                          <TableCell>₦25,000</TableCell>
                          <TableCell>Apr 10, 2023</TableCell>
                          <TableCell>Apr 15, 2023</TableCell>
                          <TableCell>
                            <Badge className="bg-green-500">Completed</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
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