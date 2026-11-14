import React from 'react'

export default function Dashboard() {
    return (
        <>
            <div className='bg-[#fafafa] px-3 sm:px-5 md:px-8 py-2.5 sm:py-4'>
                <p className='font-bold text-gray-900'>Dashboard</p>
                <p className='text-[12px] sm:text-[13px] text-gray-900'>This is the admin dashboard of the marketplace, allowing admin user(s) to monitor, manage, and control all key aspects of the platform.</p>
            </div>

            <div className='admin-container'>
                <p className='w-fit text-[12px] font-bold'><span className='text-gray-400'>Admin</span> / Dashboard</p>
            </div>
        </>
    )
}