import { adminLoginHandler, loginHandler } from "@/services/Auth.service"
import { useState } from "react"



function Login({ admin }: { admin: any }) {

    const [requesting, setRequesting] = useState(false)

    const [error, setError] = useState("")

    const handler = async (admin: any) => {

        setError("")

        const password = document.getElementById("password")?.value

        const email = document.getElementById("email")?.value



        if (email.trim().length == 0 || password.trim().length == 0) {
            setError("Empty fields")
            return
        }


        setRequesting(true)

        const resp = admin ? await adminLoginHandler({
            email, password
        }) : await loginHandler({
            email,
            password
        })

        if (resp.success) {
            localStorage.setItem("jwtToken", resp.data.jwtToken)
            window.location.href = "/"
        }
        else {
            setError(resp.message)
        }

        setRequesting(false)

    }

    return (
        <div className="flex flex-col w-1/5 gap-10 items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

            <h3 className="font-semibold text-lg">
                {admin ? "Admin Login" : "Round 1"}
            </h3>
            <div className="text-sm text-red-500">
                {error}
            </div>
            <div className="flex flex-col gap-8">
                <input className="p-2 outline-none rounded-lg shadow-md" id={"email"} placeholder={"Email"} type="text"></input>

                <input className="p-2 outline-none rounded-lg shadow-md" id="password" placeholder="Password" type="password"></input>

                <button disabled={requesting} className={"p-2 bg-black text-white rounded-lg " + (requesting ? "cursor-not-allowed opacity-50" : "")} onClick={async () => { await handler(admin) }}>Login</button>

            </div>

        </div>

    )
}

export default Login