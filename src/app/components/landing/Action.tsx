import { FaRegPaperPlane } from "react-icons/fa6";

const Action = () => {
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
            <FaRegPaperPlane className="max-w-sm rounded-lg text-6xl md:text-6xl lg:text-8xl xl:text-9xl" />
            <div className="max-w-md">
                <div className="p-10">
                <h1 className="text-5xl font-bold text-center">Time to sign up!</h1>
                <p className="py-6 text-center text-md">Sign up now to start receiving daily summaries of your favorite Instagram profiles straight to your inbox or Telegram!</p>
                <div className='flex justify-center align-center max-w-md mx-auto pr-10 pl-10'>
                    </div>
                <a className="btn btn-primary w-full" href="/auth" >Sign up</a>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Action