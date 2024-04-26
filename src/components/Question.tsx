
import { submitGameHandler } from "@/services/Auth.service";
import { useEffect, useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";


// const images = [
//     { url: "'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'" },
//     { url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80' },
//     { url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80' },
//     { url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80' },
//     { url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80' },
//     { url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80' },
//     { url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80' },
// ];


// <div >
// <SimpleImageSlider
//     style={{ position: "relative" }}
//     width={400}
//     height={400}
//     images={images}
//     showBullets={true}
//     showNavs={true}
// />
// </div>


const mapToObject = (map: any) => Object.fromEntries(map.entries());


function Question({ request, data_, answer, setAnswer, requesting, data, question, setQuestion, setData }: { request: any, data_: any, answer: any, setAnswer: any, requesting: any, data: any, question: any, setQuestion: any, setData: any }) {

    const [modal, setModal] = useState(false)

    const [successSubmit, setSuccessSubmit] = useState(null)

    const [submitRequest, setSubmitRequest] = useState(false)

    const handleAnswer = (question: any, iter: any) => {

        setAnswer((prev: any) => {

            let temp = null

            if (!prev.has(question))
                temp = {
                    "answer": "e",
                    "visited": true
                }
            else
                temp = prev.get(question)

            temp["answer"] = String.fromCharCode("A".charCodeAt(0) + iter).toLocaleLowerCase()

            prev.set(question, temp)

            return new Map(prev)
        })

    }

    useEffect(() => {
        if (data_._id)
            localStorage.setItem(data_._id, JSON.stringify(mapToObject(answer)))
    }, [answer])

    useEffect(() => {
        if (request) {

            (
                async () => {
                    console.log("Last minute")
                    setSubmitRequest(true)

                    const resp = await submitAnswer()
                    setSubmitRequest(false)

                    if (resp.success) {

                        setTimeout(() => {
                            window.location.reload()
                        }, [3000])
                    }
                    else {
                        console.log(resp)
                        window.location.reload()
                    }

                }
            )()

        }
    }, [request])


    const submitAnswer = async () => {

        const resp = await submitGameHandler(answer)

        return resp
    }

    const decrement = () => {
        setQuestion((prev: any) => {
            if (prev != 0) return prev - 1
            return prev
        })
    }

    const increment = () => {
        setQuestion((prev: any) => {
            if (prev != 29) return prev + 1
            return prev
        })
    }

    useEffect(() => {
        setSuccessSubmit(null)
    }, [modal])


    return (
        <div className="w-3/4 shadow-md rounded-md justify-center flex flex-col">


            {modal && <div className=" h-screen flex items-center justify-center w-screen" style={{
                zIndex: 3,
                "position": "absolute",
                "top": "50%",
                "left": "50%",
                "transform": "translate(-50%,-50%)",
                "backgroundColor": "rgba(0, 0, 0, 0.5)"
            }}>   <div

                className="bg-white p-4 rounded-lg shadow-md"
            >

                    {
                        successSubmit === null ?
                            (
                                <div className={"flex flex-col gap-4 "}>
                                    <div className="text-lg font-bold">
                                        Are you sure about submitting the test ?
                                    </div>

                                    <div className="flex gap-4">
                                        <button onClick={() => setModal(false)} className="p-2 rounded-lg bg-red-400 text-white">Continue test</button>
                                        <button onClick={async () => {
                                            setSubmitRequest(true)

                                            const resp = await submitAnswer()
                                            setSubmitRequest(false)

                                            if (resp.success) {
                                                setSuccessSubmit(true)
                                                setTimeout(() => {
                                                    window.location.reload()
                                                }, [3000])
                                            }
                                            else {
                                                setSuccessSubmit(false)
                                            }
                                        }} className={"p-2 rounded-lg bg-green-400 text-white " + (submitRequest && "bg-green-200")} disabled={submitRequest} > {submitRequest ? "Please Wait" : "Submit test"}</button>
                                    </div>
                                </div>
                            ) : <>
                                {
                                    successSubmit ? <div className="p-2 items-center flex flex-col gap-4">
                                        <p className="text-lg font-bold">Test Completed Successfully</p>
                                        <img height={"100px"} src={"check-mark-verified.gif"}></img>
                                    </div> : <div className="p-2 items-center flex flex-col gap-4">
                                        <p className="text-lg font-bold">Something went wrong</p>
                                        <img style={{ height: "200px", width: "200px" }} src={"close-refuse.gif"}></img>
                                        <button className="p-3 rounded-lg bg-black text-white" onClick={() => setModal(false)}>Go back</button>
                                    </div>
                                }
                            </>}



                </div></div>}

            {
                data && Object.keys(data).length && (<>
                    <div className="flex flex-col gap-4 h-3/4 p-2 overflow-y-scroll">


                        <div className="text-lg font-bold">{question + 1} . {data.description.split("\n").map((item: any) => {
                            return <div>
                                {item}
                            </div>
                        })}</div>


                        <div>

                            {
                                data.options.map((item: any, iter: any) => {
                                    return (
                                        <label htmlFor={question + "default-radio-" + iter} className="flex items-center mb-4 cursor-pointer rounded-lg shadow-md p-4">
                                            <input checked={answer.has(question) ? (answer.get(question)["answer"] === String.fromCharCode("A".charCodeAt(0) + iter).toLocaleLowerCase()) : false} onChange={() => { handleAnswer(question, iter) }} id={question + "default-radio-" + iter} type="radio" value={iter} name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label htmlFor={question + "default-radio-" + iter} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{item}</label>
                                        </label>

                                    )
                                })
                            }



                        </div>


                    </div >

                    <div className="flex justify-between m-4">
                        <button disabled={requesting} onClick={() => {
                            decrement()
                        }} className={"p-2 outline-none rounded-lg shadow-md " + (requesting && "cursor-not-allowed opacity-50")} >{requesting ? "Please wait fetching" : "Prev Question"}</button>

                        {
                            question === 29 ? <button disabled={requesting} onClick={() => {
                                setModal(true)
                                console.log("submitting")
                            }} className={"p-2 text-white outline-none bg-blue-500 rounded-lg shadow-md " + (requesting && "cursor-not-allowed opacity-50")} >Submit Quiz</button> : <button disabled={requesting} onClick={() => {
                                increment()
                            }} className={"p-2 outline-none bg-blue-200 rounded-lg shadow-md " + (requesting && "cursor-not-allowed opacity-50")} >{requesting ? "Please wait fetching" : "Next Question"}</button>
                        }


                    </div></>)
            }



        </div >
    )
}

export default Question