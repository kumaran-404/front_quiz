import React from 'react'

function Blocked() {
    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='flex flex-col gap-4 items-center '>

                <p>You are blocked</p>

                <p>Contact Organizers</p>

                <button onClick={() => {
                    localStorage.removeItem("jwtToken")
                    window.location.reload()
                }} className='p-3 rounded-lg bg-black text-white'>Logout</button>

            </div>
        </div>

    )
}

export default Blocked