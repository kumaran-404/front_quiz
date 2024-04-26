import { getAllHandler } from "@/services/Auth.service"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

function millisToMinutesAndSeconds(millis:number) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (Number(seconds) < 10 ? '0' : '') + seconds;
  }

function Fetch() {

    const [data, setData] = useState([])

    const handler = async () => {
        const resp = await getAllHandler()

        if (resp) {

            if (!resp.success) {
                toast.error(resp.message)
            }
            else {
                setData(resp.data)
            }


        }
        else {
            toast.error("Something went wrong")
        }

    }
    useEffect(() => {

        (async () => {
            await handler()
        })()

    }, [])x

    return (
        <div className=' p-5 px-40 w-full  h-screen'>

            <p className='font-bolder text-3xl'>Top 20 users</p>

            <button className="p-3 my-3 w-max-content bg-green-400 text-white rounded-lg shadow-lg" onClick={async () => await handler()}>Reload </button>

            <div className='w-full h-full rounded-lg shadow-md p-5'>
                {
                    data.map((item: any, iter: number) => {
                        return (
                            <div className={"py-4 flex items-center gap-6 px-2 " + (iter % 2 == 0 ? "bg-slate-300" : "bg-white text-black")}>
                                <div>{item["teamname"]}</div>
                                <div>Phone: {item["number"]}</div>
                                <div>{item["score"]}</div>
                                <div>{millisToMinutesAndSeconds(item["timeDifference"])}</div>
                            </div>
                        )
                    })
                }
            </div>


        </div>
    )
}

export default Fetch