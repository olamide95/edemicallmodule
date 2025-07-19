"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function CreateAdminPage() {
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    adminEmail: "",
    adminName: "",
    adminPassword: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.adminPassword !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await api.post('/tenants', {
        name: formData.name,
        domain: formData.domain,
        subscription: "premium",
        adminEmail: formData.adminEmail,
        adminName: formData.adminName,
        adminPassword: formData.adminPassword
      });

      toast.success(`Tenant ${response.name} created successfully!`);
      router.push('/login');
    } catch (error) {
      toast.error("Failed to create tenant");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Create New Tenant Admin</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="tenantName">Organization Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="domain">Domain (e.g., your-school)</Label>
            <Input
              id="domain"
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="adminEmail">Admin Email</Label>
            <Input
              type="email"
              id="adminEmail"
              name="adminEmail"
              value={formData.adminEmail}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="adminName">Admin Name</Label>
            <Input
              id="adminName"
              name="adminName"
              value={formData.adminName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="adminPassword">Password</Label>
            <Input
              type="password"
              id="adminPassword"
              name="adminPassword"
              value={formData.adminPassword}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Tenant Admin"}
          </Button>
        </form>
      </div>
    </div>
  )
}