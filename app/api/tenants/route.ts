// app/api/tenants/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Hash password
    const hashedPassword = await bcrypt.hash(body.adminPassword, 10)

    // Create tenant and admin user in transaction
    const tenant = await prisma.$transaction(async (prisma: { tenant: { create: (arg0: { data: { name: any; domain: any; subscription: any } }) => any; update: (arg0: { where: { id: any }; data: { adminId: any } }) => any }; user: { create: (arg0: { data: { tenantId: any; email: any; name: any; role: string; password: string } }) => any } }) => {
      const newTenant = await prisma.tenant.create({
        data: {
          name: body.name,
          domain: body.domain,
          subscription: body.subscription
        }
      })

      const adminUser = await prisma.user.create({
        data: {
          tenantId: newTenant.id,
          email: body.adminEmail,
          name: body.adminName,
          role: 'admin',
          password: hashedPassword
        }
      })

      // Update tenant with adminId
      await prisma.tenant.update({
        where: { id: newTenant.id },
        data: { adminId: adminUser.id }
      })

      return newTenant
    })

    return NextResponse.json(tenant, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to create tenant' },
      { status: 500 }
    )
  }
}