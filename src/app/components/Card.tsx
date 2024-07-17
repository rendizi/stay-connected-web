const Card = () => {
    return (
        <div className="bg-gray-200 w-32 h-32 rounded-xl pr-2 pl-2 shadow-xl">
            <div className="flex items-center">
            <div className="avatar online w-6 h-6 rounded-full overflow-hidden mt-2">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="User Avatar" className="object-cover w-full h-full" />
            </div>
            <p className="ml-2 text-black text-sm">@armansu</p>
            </div>
            <p className="text-black text-xs pr-1 pl-1 mt-2">I really like this product, it saves so much time!</p>
        </div> 
    )
}

export default Card 