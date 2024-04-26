import { memo, useEffect, useState } from "react";
import SideBar from "./SideBar";
import Question from "./Question";
import { getQuestionHandler, reportHandler } from "@/services/Auth.service";
import { FullScreen, useFullScreenHandle } from "react-full-screen";


function Container({ endTime, setFullScreen, data_, initialRenderData, handle, fullScreen }: { endTime: any, setFullScreen: any, data_: any, initialRenderData: any, handle: any, fullScreen: any }) {

  const [data, setData] = useState({})

  const [question, setQuestion] = useState(0)

  const [memory, setMemory] = useState(new Map())

  const [requesting, setRequesting] = useState(false)

  const [answer, setAnswer] = useState(new Map()) // 0 is unvisited , 1 is visited , 2 is selected 

  const [timer, setTimer] = useState(10)

  const [id, setId] = useState(null)

  const [request, setRequest] = useState(false)


  useEffect(() => {

    console.log(Object.keys(initialRenderData).length == 0, initialRenderData, initialRenderData.question)

    if (initialRenderData.question[0])
      setData(initialRenderData.question[0])

    console.log(initialRenderData.question[0], "intial render")

  }, [initialRenderData])


  useEffect(() => {
    // set if local storage has value 

    if (localStorage.getItem(data_._id)) {

      const obj = JSON.parse(localStorage.getItem(data_._id) || "")

      const newMap = new Map()

      Object.keys(obj).map(item => {
        newMap.set(Number(item), obj[item])
      })


      setAnswer(newMap)
    }
  }, [data_])

  useEffect(() => {
    console.log("question", data)
  }, [data])

  useEffect(() => {

    // if (question == 0) return

    if (memory.has(question)) {
      setData(memory.get(question))
    }
    else {
      setData(initialRenderData.question[question])
    }

    setAnswer((prev: any) => {
      if (!prev.has(question)) {
        prev.set(question, {
          "visited": true,
          "answer": "e"
        })
      }
      return prev
    })

  }, [question])

  const timerFunction = () => {
    setTimer(prev => { return prev != 0 ? prev - 1 : prev })
  }

  const startTimer = () => {

    const id = setInterval(timerFunction, 1000)
    setId(id)
  }

  const clearTimer = () => {

    if (id)
      clearInterval(id)

  }


  useEffect(() => {

    if (!fullScreen) {
      // start timer 
      startTimer()
    }
    else {
      clearTimer()
    }

  }, [fullScreen])


  useEffect(() => {

    //end timer and reload page 
    if (timer == 0) {

      (async () => {
        const resp = await reportHandler()

        if (resp.success) {
          window.location.reload()
        }
      })()
    }


  }, [timer])

  useEffect(() => {

    const handleVisibilityChange = () => {
      if (document.hidden) {

        // alert("You will be blocked")
        setFullScreen(false)


      }


    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

  }, [])



  return (
    <div>

      {
        !fullScreen ?
          <div className="flex w-full flex-col items-center mt-40 justify-center gap-4">
            {timer}


            <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
              <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Danger alert!</span> Go to full screen mode. You will be blocked otherwise.
              </div>
            </div>

            <button id="button" className="rounded-lg shadow-lg p-4" onClick={handle.enter}>Enter Full Screen mode</button>
          </div> :
          Object.keys(data).length && (<div className="flex gap-4 w-full p-2">
            <Question request={request} data_={data_} answer={answer} setAnswer={setAnswer} requesting={requesting} setData={setData} question={question} setQuestion={setQuestion} data={data} ></Question>

            <SideBar setRequest={setRequest} endTime={endTime} setQuestion={setQuestion} data={data} question={question} answer={answer}></SideBar>
          </div>)
      }


    </div>
  );
}

export default Container;
