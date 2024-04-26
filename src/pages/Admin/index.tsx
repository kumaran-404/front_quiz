
import { useNavigate } from 'react-router-dom'

function Admin() {
    const navigate = useNavigate()


    return (
        <div>
            <div className='flex flex-col gap-4 rounded-lg shadow-lg p-4'>

                <button onClick={() => navigate("/create")} className='bg-black text-white p-3 rounded-lg shadow-md' >Create New User</button>

                <button className='bg-black text-white p-3 rounded-lg shadow-md' onClick={() => navigate("/fetch")} >Fetch Users</button>

                <button className='bg-red-500 text-white p-3 rounded-lg shadow-md' onClick={() => {
                    localStorage.removeItem("jwtToken")
                    window.location.reload()
                }} >Logout</button>


            </div>

        </div>
    )
}

export default Admin