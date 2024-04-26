import Container from "@/components"
import { Loader } from "@/components/Loader"
import { getQuestionHandler } from "@/services/Auth.service"
import { useCallback, useEffect, useState } from "react"
import Admin from "./Admin"
import Instructions from "./Instructions"
import { FullScreen, useFullScreenHandle } from "react-full-screen"
import Gameover from "./Gameover"
import Blocked from "./Blocked"

function Home({ data_ }: { data_: any }) {


    const [started, setStarted] = useState<null | Boolean>(null)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    const handle = useFullScreenHandle();
    const [fullScreen, setFullScreen] = useState(false)
    const [blocked, setBlocked] = useState(false)
    const [endTime, setEndTime] = useState(null)

    const changeHandler = (e: any) => {

        setFullScreen(e)

    }

    const handler = async () => {
        const resp = await getQuestionHandler()

        if (resp.success) {
            setData(resp.data)
            setStarted(true)

            console.log("data after starting:", resp.data)

            setEndTime(new Date(resp.data.end_time))

        }
        else if (resp.message == "GAME_NOT_STARTED") {

            setStarted(false)
        }
        else if (resp.message == "BLOCKED") {
            setStarted(true)
            setBlocked(true)
        }
        else {
            // game already ended 
        }

        setLoading(false)
    }


    useEffect(() => {

        (async () => {

            await handler()

        })()


    }, [])

    useEffect(()=>{
        console.log("data",data)
    },[data])

    useEffect(() => {

        if (started) {
            (async () => {

                await handler()

            })()

        }

    }, [started])

    return (
        <div>
            <FullScreen handle={handle} onChange={changeHandler}>

                {
                    loading ? <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Loader />
                    </div> : ( (started === true && Object.keys(data).length) ? <Container endTime={endTime} setFullScreen={setFullScreen} data_={data_} initialRenderData={data} handle={handle} fullScreen={fullScreen}></Container> : (started === null ? <Gameover /> : (blocked ? <Blocked></Blocked> : <Instructions setData={setData} setLoading={setLoading} setEndTime={setEndTime} handle={handle} setStarted={setStarted} />)))
                }

            </FullScreen>
        </div>
    )
}

export default Home