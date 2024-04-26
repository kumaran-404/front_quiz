import { startGameHandler } from "@/services/Auth.service"

const data = [
    "30 mins are allocated for completing the quiz",
    "Attend the test in full screen mode",
    "Note : Exiting of full screen mode will issue emergency timer to get back. If not get backed within the time you will be blocked from attending",
    "Changing window and screens are sure way to get blocked from test"
]

function Instructions({  setStarted, setLoading, handle }: { setData: any, setStarted: any, handle: any, setLoading: any }) {

    const handler = async () => {

        handle.enter()

        setLoading(true)


        const resp = await startGameHandler()
        console.log(resp.data)
        if (resp.success) {
            setStarted(true)

        }


        setLoading(false)



    }


    return (
        <div className="flex items-center justify-center h-screen w-full p-4">
            <div className="flex flex-col gap-4">

                <h3 className="text-3xl ">Welcome to Round 1 Quiz</h3>

                <p className="text-lg">Please carefully read the instruction before starting:</p>

                <div className="flex flex-col gap-2">
                    {
                        data.map((item: any, iter: number) => {
                            return (
                                <p>{iter + 1}.{item}</p>
                            )
                        })
                    }
                </div>

                <button onClick={async () => await handler()} className="p-3 bg-green-500 text-white rounded-lg shadow-md">Start the Test</button>

            </div>
        </div>

    )
}

export default Instructions