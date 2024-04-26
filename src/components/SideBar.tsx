import { useEffect, useState } from "react"




function SideBar({ setRequest, endTime, setQuestion, data, answer, question }: { setRequest: any, endTime: any, setQuestion: any, data: any, answer: any, question: any }) {

    const [timer, setTimer] = useState("")


    useEffect(() => {

        if (!endTime) return

        setInterval(() => {

            const now = new Date(Date.now())

            const diff = endTime.getTime() - now.getTime()

            let ss = Math.floor(diff / 1000) % 60;
            let mm = Math.floor(diff / 1000 / 60) % 60;
            let hh = Math.floor(diff / 1000 / 60 / 60);

            setTimer(`${mm} min : ${ss} ss`)

            console.log(mm,ss)

            if (mm == 0 && ss == 0) {

                setRequest(true)


            }

        }, 1000)

    }, [endTime])


    return (
        <div className='flex flex-col gap-4 shadow-md rounded-md h-3/4 p-2 m-4'>

            <div className="font-bold">
                Question {question + 1} of 30
            </div>


            <span id="timer">{timer}</span>

            <div className="grid grid-cols-4 gap-4">
                {[...Array(30).keys()].map((item: any, iter: any) => {

                    console.log(question, item)
                    return (
                        <div onClick={() => setQuestion(iter)} className={'rounded-full max-h-3/4 px-5 py-3 w-max cursor-pointer ' + (item == question ? "bg-blue-500 text-white" : (answer.has(item) ? (answer.get(item)["visited"] ? (answer.get(item)["answer"] == "e" ? "bg-slate-200" : "bg-green-500 text-white") : "bg-red-100") : "bg-red-100"))}>
                            {item + 1}

                        </div>
                    )
                })}
            </div>

            <div className="grid grid-cols-2">
                <div>
                    Not Visited : <div className="rounded-full max-h-3/4 px-3 py-3 w-max bg-red-100"></div>
                </div>
                <div>
                    Answered :  <div className="rounded-full max-h-3/4 px-3 py-3 w-max bg-green-400"></div>
                </div>
                <div>
                    Current :  <div className="rounded-full max-h-3/4 px-3 py-3 w-max bg-blue-400 text-white"></div>
                </div>
                <div>
                    Not Answered :  <div className="rounded-full max-h-3/4 px-3 py-3 w-max bg-slate-200"></div>
                </div>
            </div>

            <div className="flex gap-4 flex-col font-light">
                <p className="font-bold">Note:</p>
                <p>1. If you want to submit, navigate to Question 30</p>
                <p>2. Exiting of full screen will block you from attending quiz</p>
            </div>


        </div>
    )
}

export default SideBar