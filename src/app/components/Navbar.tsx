const Navbar = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">stay connected</a>
            </div>
            <div className="navbar-center hidden lg:flex">
            </div>
            <div className="navbar-end">
                <a className="btn mr-2">register</a>
                <a className="btn">login</a>
            </div>
        </div>
    )
}

export default Navbar