"use client"

import { useState } from "react"
import { ChevronDown, Trash2, Plus, X, Search } from "lucide-react"

interface Permission {
  id: string
  name: string
  checked: boolean
}

interface PermissionRule {
  id: string
  documentType: string
  role: string
  level: number
  creatorRestriction: "none" | "creator" | "department" | "branch"
  permissions: Permission[]
}

export function RolePermissionManager() {
  const [selectedDocumentType, setSelectedDocumentType] = useState("")
  const [selectedRole, setSelectedRole] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddRuleModal, setShowAddRuleModal] = useState(false)
  const [newRule, setNewRule] = useState({
    documentType: "",
    role: "",
    level: 0,
  })
  const [permissionRules, setPermissionRules] = useState<PermissionRule[]>([])

  const documentTypes = [
    "Salutation",
    "Student",
    "Teacher",
    "Course",
    "Assignment",
    "Grade",
    "Attendance",
    "Fee",
    "Invoice",
    "Academic Year",
    "Class",
    "Subject",
  ]

  const roles = [
    "Administrator",
    "Teacher",
    "Student",
    "Parent",
    "Staff",
    "Principal",
    "Accountant",
    "Accounts Manager",
  ]

  const allPermissions = [
    { id: "select", name: "Select" },
    { id: "read", name: "Read" },
    { id: "write", name: "Write" },
    { id: "create", name: "Create" },
    { id: "delete", name: "Delete" },
    { id: "print", name: "Print" },
    { id: "email", name: "Email" },
    { id: "report", name: "Report" },
    { id: "import", name: "Import" },
    { id: "export", name: "Export" },
    { id: "share", name: "Share" },
    { id: "cancel", name: "Cancel" },
    { id: "amend", name: "Amend" },
    { id: "submit", name: "Submit" },
    { id: "formBuilderAccess", name: "Form Builder Access" },
  ]

  const getPermissionsForLevel = (level: number): Permission[] => {
    const levelPermissions = {
      0: [
        "select",
        "read",
        "write",
        "create",
        "delete",
        "print",
        "email",
        "report",
        "import",
        "export",
        "share",
        "cancel",
        "amend",
        "submit",
        "formBuilderAccess",
      ],
      1: ["read", "write", "create", "print", "email", "export"],
      2: ["read", "write", "print", "email"],
      3: ["read", "write"],
      4: ["read"],
      5: ["select"],
      6: ["print"],
      7: ["email"],
    }

    return allPermissions.map((permission) => ({
      ...permission,
      checked: levelPermissions[level as keyof typeof levelPermissions]?.includes(permission.id) || false,
    }))
  }

  const filteredRules = permissionRules.filter((rule) => {
    const matchesSearch =
      searchQuery === "" ||
      rule.documentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.role.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDocType = selectedDocumentType === "" || rule.documentType === selectedDocumentType
    const matchesRole = selectedRole === "" || rule.role === selectedRole

    return matchesSearch && matchesDocType && matchesRole
  })

  const togglePermission = (ruleId: string, permissionId: string) => {
    setPermissionRules((prev) =>
      prev.map((rule) =>
        rule.id === ruleId
          ? {
              ...rule,
              permissions: rule.permissions.map((permission) =>
                permission.id === permissionId ? { ...permission, checked: !permission.checked } : permission,
              ),
            }
          : rule,
      ),
    )
  }

  const updateCreatorRestriction = (ruleId: string, restriction: "none" | "creator" | "department" | "branch") => {
    setPermissionRules((prev) =>
      prev.map((rule) => (rule.id === ruleId ? { ...rule, creatorRestriction: restriction } : rule)),
    )
  }

  const deleteRule = (ruleId: string) => {
    setPermissionRules((prev) => prev.filter((rule) => rule.id !== ruleId))
  }

  const openAddRuleModal = () => {
    setNewRule({
      documentType: selectedDocumentType,
      role: selectedRole,
      level: 0,
    })
    setShowAddRuleModal(true)
  }

  const addNewRule = () => {
    const existingRule = permissionRules.find(
      (rule) => rule.documentType === newRule.documentType && rule.role === newRule.role,
    )

    if (existingRule) {
      // Update existing rule's level
      setPermissionRules((prev) =>
        prev.map((rule) =>
          rule.id === existingRule.id
            ? { ...rule, level: newRule.level, permissions: getPermissionsForLevel(newRule.level) }
            : rule,
        ),
      )
    } else {
      // Create new rule
      const rule: PermissionRule = {
        id: Date.now().toString(),
        documentType: newRule.documentType,
        role: newRule.role,
        level: newRule.level,
        creatorRestriction: "none",
        permissions: getPermissionsForLevel(newRule.level),
      }
      setPermissionRules((prev) => [...prev, rule])
    }

    setShowAddRuleModal(false)
  }

  const restoreOriginalPermissions = () => {
    setPermissionRules([])
    setSelectedDocumentType("")
    setSelectedRole("")
    setSearchQuery("")
  }

  const getAvailableDocTypes = () => {
    if (newRule.role) {
      const usedDocTypes = permissionRules.filter((rule) => rule.role === newRule.role).map((rule) => rule.documentType)
      return documentTypes.filter((docType) => !usedDocTypes.includes(docType))
    }
    return documentTypes
  }

  const getAvailableRoles = () => {
    if (newRule.documentType) {
      const usedRoles = permissionRules
        .filter((rule) => rule.documentType === newRule.documentType)
        .map((rule) => rule.role)
      return roles.filter((role) => !usedRoles.includes(role))
    }
    return roles
  }

  const showAddButton = selectedDocumentType || selectedRole

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#312D4B] rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#2E263D] dark:text-white">Role Permissions Manager</h1>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors">
              Set User Permissions
            </button>
            <button
              onClick={restoreOriginalPermissions}
              className="px-4 py-2 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors"
            >
              Restore Original Permissions
            </button>
            {showAddButton && (
              <button
                onClick={openAddRuleModal}
                className="px-4 py-2 text-sm font-medium text-white bg-[#8C57FF] hover:bg-[#7C3AED] rounded-md transition-colors flex items-center gap-2"
              >
                <Plus size={16} />
                Add a New Rule
              </button>
            )}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <select
              value={selectedDocumentType}
              onChange={(e) => setSelectedDocumentType(e.target.value)}
              className="appearance-none bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md px-4 py-2 pr-10 text-sm text-[#374151] dark:text-[rgba(231,227,252,0.9)] focus:outline-none focus:ring-2 focus:ring-[#8C57FF] focus:border-transparent min-w-[200px]"
            >
              <option value="">Document Type</option>
              {documentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="appearance-none bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md px-4 py-2 pr-10 text-sm text-[#374151] dark:text-[rgba(231,227,252,0.9)] focus:outline-none focus:ring-2 focus:ring-[#8C57FF] focus:border-transparent min-w-[200px]"
            >
              <option value="">Role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] pointer-events-none" />
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]" />
            <input
              type="text"
              placeholder="Search doctype or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-md bg-[#F9FAFB] dark:bg-[#28243D] text-[#374151] dark:text-[rgba(231,227,252,0.9)] placeholder:text-[#6B7280] dark:placeholder:text-[rgba(231,227,252,0.6)] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] focus:outline-none focus:ring-2 focus:ring-[#8C57FF] focus:border-transparent min-w-[250px]"
            />
          </div>
        </div>

        {/* Empty State or Permissions Table */}
        {filteredRules.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] mb-4">
              {searchQuery ? (
                <>No permissions found for "{searchQuery}"</>
              ) : (
                <>No role permissions configured. Select a document type or role to get started.</>
              )}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
                    Document Type
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
                    Role
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
                    Level
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
                    Permissions
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRules.map((rule) => (
                  <tr key={rule.id} className="border-b border-[#F3F4F6] dark:border-[rgba(255,255,255,0.05)]">
                    <td className="py-4 px-4">
                      <div className="text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                        {rule.documentType}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-[#374151] dark:text-[rgba(231,227,252,0.9)]">{rule.role}</div>
                      <div className="space-y-2 mt-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`creator-${rule.id}`}
                            checked={rule.creatorRestriction === "none"}
                            onChange={() => updateCreatorRestriction(rule.id, "none")}
                            className="w-4 h-4 text-[#8C57FF] bg-white dark:bg-[#28243D] border border-[#D1D5DB] dark:border-[rgba(255,255,255,0.2)] focus:ring-[#8C57FF] focus:ring-2"
                          />
                          <span className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                            No Restriction
                          </span>
                        </label>

                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`creator-${rule.id}`}
                            checked={rule.creatorRestriction === "creator"}
                            onChange={() => updateCreatorRestriction(rule.id, "creator")}
                            className="w-4 h-4 text-[#8C57FF] bg-white dark:bg-[#28243D] border border-[#D1D5DB] dark:border-[rgba(255,255,255,0.2)] focus:ring-[#8C57FF] focus:ring-2"
                          />
                          <span className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                            Only If Creator
                          </span>
                        </label>

                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`creator-${rule.id}`}
                            checked={rule.creatorRestriction === "department"}
                            onChange={() => updateCreatorRestriction(rule.id, "department")}
                            className="w-4 h-4 text-[#8C57FF] bg-white dark:bg-[#28243D] border border-[#D1D5DB] dark:border-[rgba(255,255,255,0.2)] focus:ring-[#8C57FF] focus:ring-2"
                          />
                          <span className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                            If Created by Department
                          </span>
                        </label>

                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`creator-${rule.id}`}
                            checked={rule.creatorRestriction === "branch"}
                            onChange={() => updateCreatorRestriction(rule.id, "branch")}
                            className="w-4 h-4 text-[#8C57FF] bg-white dark:bg-[#28243D] border border-[#D1D5DB] dark:border-[rgba(255,255,255,0.2)] focus:ring-[#8C57FF] focus:ring-2"
                          />
                          <span className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]">
                            If Created by Branch
                          </span>
                        </label>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-[#374151] dark:text-[rgba(231,227,252,0.9)]">{rule.level}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="grid grid-cols-3 gap-3 max-w-md">
                        {rule.permissions.map((permission) => (
                          <label key={permission.id} className="flex items-center gap-2">
                            <div
                              onClick={() => togglePermission(rule.id, permission.id)}
                              className={`w-4 h-4 rounded cursor-pointer flex items-center justify-center transition-colors ${
                                permission.checked
                                  ? "bg-[#8C57FF] border-[#8C57FF]"
                                  : "bg-white dark:bg-[#28243D] border border-[#D1D5DB] dark:border-[rgba(255,255,255,0.2)]"
                              }`}
                            >
                              {permission.checked && (
                                <svg
                                  width="10"
                                  height="8"
                                  viewBox="0 0 10 8"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8.5 1L3.5 6L1.5 4"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </div>
                            <span className="text-xs text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                              {permission.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => deleteRule(rule.id)}
                        className="p-2 text-[#EF4444] hover:bg-[#FEF2F2] dark:hover:bg-[rgba(239,68,68,0.1)] rounded-md transition-colors"
                        title="Delete Rule"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Rule Modal */}
      {showAddRuleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#312D4B] rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]">
              <h3 className="text-lg font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)]">
                Add New Permission Rule
              </h3>
              <button
                onClick={() => setShowAddRuleModal(false)}
                className="p-1 hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] rounded"
              >
                <X size={20} className="text-[#6B7280] dark:text-[rgba(231,227,252,0.6)]" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)] mb-2">
                  Document Type <span className="text-[#EF4444]">*</span>
                </label>
                <div className="relative">
                  <select
                    value={newRule.documentType}
                    onChange={(e) => setNewRule((prev) => ({ ...prev, documentType: e.target.value }))}
                    disabled={selectedDocumentType && selectedRole}
                    className="appearance-none w-full bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md px-4 py-2 pr-10 text-sm text-[#374151] dark:text-[rgba(231,227,252,0.9)] focus:outline-none focus:ring-2 focus:ring-[#8C57FF] focus:border-transparent disabled:opacity-50"
                  >
                    <option value="">Select Document Type</option>
                    {getAvailableDocTypes().map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)] mb-2">
                  Role <span className="text-[#EF4444]">*</span>
                </label>
                <div className="relative">
                  <select
                    value={newRule.role}
                    onChange={(e) => setNewRule((prev) => ({ ...prev, role: e.target.value }))}
                    disabled={selectedDocumentType && selectedRole}
                    className="appearance-none w-full bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md px-4 py-2 pr-10 text-sm text-[#374151] dark:text-[rgba(231,227,252,0.9)] focus:outline-none focus:ring-2 focus:ring-[#8C57FF] focus:border-transparent disabled:opacity-50"
                  >
                    <option value="">Select Role</option>
                    {getAvailableRoles().map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#374151] dark:text-[rgba(231,227,252,0.9)] mb-2">
                  Permission Level <span className="text-[#EF4444]">*</span>
                </label>
                <div className="relative">
                  <select
                    value={newRule.level}
                    onChange={(e) => setNewRule((prev) => ({ ...prev, level: Number.parseInt(e.target.value) }))}
                    className="appearance-none w-full bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md px-4 py-2 pr-10 text-sm text-[#374151] dark:text-[rgba(231,227,252,0.9)] focus:outline-none focus:ring-2 focus:ring-[#8C57FF] focus:border-transparent"
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] pointer-events-none" />
                </div>
                <p className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] mt-1">
                  Level 0 is for document level permissions, higher levels for field level permissions.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]">
              <button
                onClick={() => setShowAddRuleModal(false)}
                className="px-4 py-2 text-sm font-medium text-[#6B7280] dark:text-[rgba(231,227,252,0.7)] bg-[#F9FAFB] dark:bg-[#28243D] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-md hover:bg-[#F3F4F6] dark:hover:bg-[#3D3759] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addNewRule}
                disabled={!newRule.documentType || !newRule.role}
                className="px-4 py-2 text-sm font-medium text-white bg-[#8C57FF] hover:bg-[#7C3AED] rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Help */}
        <div className="bg-white dark:bg-[#312D4B] rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)] mb-4">
            Quick Help for Setting Permissions:
          </h3>
          <ol className="space-y-2 text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
            <li>
              1. Permissions are set on Roles and Document Types (called DocTypes) by setting rights like Read, Write,
              Create, Delete, Submit, Cancel, Amend, Report, Import, Export, Print, Email and Set User Permissions.
            </li>
            <li>2. Permissions get applied on Users based on what Roles they are assigned.</li>
            <li>3. Roles can be set for users from their User page Setup {">"} User</li>
            <li>
              4. The system provides many pre-defined roles. You can add new roles to set finer permissions. Add a New
              Rule
            </li>
            <li>5. Permissions are automatically applied to Standard Reports and searches</li>
            <li>
              6. As a best practice, do not assign the same set of permission rule to different Roles. Instead, set
              multiple Roles to the same User.
            </li>
          </ol>
        </div>

        {/* Submit, Cancel, Amend */}
        <div className="bg-white dark:bg-[#312D4B] rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)] mb-4">
            Meaning of Submit, Cancel, Amend:
          </h3>
          <ol className="space-y-2 text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
            <li>
              1. Certain documents, like an Invoice, should not be changed once final. The final state for such
              documents is called Submitted. You can restrict which roles can Submit.
            </li>
            <li>2. You can change Submitted documents by cancelling them and then, amending them.</li>
            <li>
              3. When you Amend a document after Cancel and save it, it will get a new number that is a version of the
              old number.
            </li>
            <li>
              4. For example if you cancel and amend INV004, it will become a new document INV004-1. This helps you to
              keep track of each amendment.
            </li>
          </ol>
        </div>

        {/* Permission Levels */}
        <div className="bg-white dark:bg-[#312D4B] rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)] mb-4">
            Permission Levels:
          </h3>
          <ol className="space-y-2 text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
            <li>
              1. Permissions at level 0 are Document Level permissions, i.e. they are primary for access to the
              document.
            </li>
            <li>2. If a Role does not have access at Level 0, then higher levels are meaningless.</li>
            <li>
              3. Permissions at higher levels are Field Level permissions. All Fields have a Permission Level set
              against them and the rules defined at that permissions apply to the field. This is useful in case you want
              to hide or make certain field read-only for certain Roles.
            </li>
            <li>4. You can use Customize Form to set levels on fields Setup {">"} Customize Form</li>
          </ol>
        </div>

        {/* User Permissions */}
        <div className="bg-white dark:bg-[#312D4B] rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-[#374151] dark:text-[rgba(231,227,252,0.9)] mb-4">
            User Permissions:
          </h3>
          <ol className="space-y-2 text-sm text-[#6B7280] dark:text-[rgba(231,227,252,0.7)]">
            <li>1. User Permissions are used to limit users to specific records Setup {">"} User Permissions</li>
            <li>2. Select Document Types to set which User Permissions are used to limit access</li>
            <li>
              3. Once you have set this, the users will only be able access documents (eg. Blog Post) where the link
              exists (eg. Blogger).
            </li>
            <li>
              4. Apart from System Manager, roles with Set User Permissions right can set permissions for other users
              for that Document Type
            </li>
          </ol>
          <p className="text-xs text-[#6B7280] dark:text-[rgba(231,227,252,0.6)] mt-4">
            If these instructions where not helpful, please add in your suggestions on GitHub Issues.
          </p>
        </div>
      </div>
    </div>
  )
}
