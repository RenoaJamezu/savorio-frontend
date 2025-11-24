import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="w-full h-full bg-secondary min-h-screen">
      <Sidebar />
      <Navbar />

      <main className="ml-80 pt-24 p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout