import VendorForm from '@/components/vendor/vendor-form'
import DashboardLayout from '@/layouts/dashboard-layout'
import Layout from '@/layouts/layout'
import React from 'react'

function Submission() {
  return (
    <DashboardLayout title='vendor form'>
        <div>
        <VendorForm/>
        </div>
    </DashboardLayout>
  
  )
}

export default Submission