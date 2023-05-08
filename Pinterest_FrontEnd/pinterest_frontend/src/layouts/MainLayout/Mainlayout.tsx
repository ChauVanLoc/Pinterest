import { Outlet } from 'react-router-dom'
import Footer from 'src/pages/Footer'
import Header from 'src/pages/Header'

function Mainlayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Mainlayout
