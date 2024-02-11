
import Routers from "../routes/Routers.jsx"

const Layout = () => {
    return (
        <div className="flex h-screen">
            <main className="flex-grow">
                <Routers />
            </main>
        </div>
    )
}

export default Layout