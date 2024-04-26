
function Gameover() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className='flex flex-col items-center gap-4'>
        <p className="text-lg text-red">Game already ended. Please wait for Round 2 call. </p>
        <button onClick={() => {
          localStorage.removeItem("jwtToken")
          window.location.reload()
        }} className='p-3 rounded-lg bg-black text-white'>Logout</button>
      </div>
    </div>

  )
}

export default Gameover