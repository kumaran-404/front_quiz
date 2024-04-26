import { createUserHandler } from "@/services/Auth.service"
import { createRef, useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"


function Create() {

    const [password, setPassword] = useState("")

    const [requesting, setRequesting] = useState(false)

    const createPassword = () => {
        const newPassword = Math.floor(100000 + Math.random() * 900000)
        setPassword(String(newPassword))
    }

    const email = useRef<(() => void) | null>(null), number = useRef<(() => void) | null>(null), name = useRef<(() => void) | null>(null);


    const submit = async () => {



        let email_ = email.current?.value.trim(), number_ = number.current?.value.trim(), name_ = name.current?.value.trim();


        if (email_.length == 0 || number_.length == 0 || password.length == 0 || name_.length == 0) {
            toast.error("Some fields are empty")
            return
        }

        setRequesting(true)

        const resp = await createUserHandler({
            email: email_, name: name_, number: number_, password
        })

        if (resp) {

            if (resp.success) {
                toast.success("User created successfully")

            }
            else {
                toast.error(resp.message)

            }
        }
        else {
            toast.error("Something went wrong")

        }


        setRequesting(false)

    }

    const clearAll = () => {
        setPassword("")

        email.current.value = ""

        number.current.value = ""

        name.current.value = ""
    }

    useEffect(() => {

        email.current = document.getElementById("email")
        number.current = document.getElementById("number")
        name.current = document.getElementById("name")

    }, [])

    return (
        <div className='flex  flex-col gap-8  justify-center p-5 px-40 w-full  h-screen'>

            <p className='font-bolder text-3xl'>Create New User</p>

            <input className="p-2 outline-none rounded-lg shadow-md" id="email" placeholder="Email" type="text"></input>

            <input className="p-2 outline-none rounded-lg shadow-md" id="name" placeholder="Name" type="text"></input>

            {/* <input className="p-2 outline-none rounded-lg shadow-md" id={"email"} placeholder={"Email"} type="text"></input> */}

            <input className="p-2 outline-none rounded-lg shadow-md" id="number" placeholder="Phone Number" type="text"></input>

            <div className='flex flex-col gap-4'>

                <input disabled={true} value={password} className="p-2 outline-none rounded-lg shadow-md" id="password" placeholder="Password" type="text"></input>
                <button onClick={() => createPassword()} className='bg-black text-white p-3 rounded-lg'>Generate Password</button>

            </div>

            <button onClick={async () => await submit()} disabled={requesting} className={'bg-green-400 text-white p-3 rounded-lg ' + (requesting && "bg-green-200")}> {!requesting ? "Create user" : "Please wait..."}</button>

            <button onClick={() => clearAll()} className={'bg-slate-400 text-white p-3 rounded-lg ' + (requesting && "bg-green-200")}> Clear All</button>


        </div>
    )
}

export default Create