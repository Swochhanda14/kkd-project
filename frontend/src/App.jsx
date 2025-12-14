import Navbar from "./Components/Navbar/Navbar"
import { BrowserRouter } from 'react-router-dom'
import RouterComponent from "./RouterComponent"
import Footer from "./Components/Footer/Footer"


function App() {

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="absolute inset-0 bg-[url('/bgpattern.png')] bg-repeat opacity-[0.03] -z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent to-red-50/30 -z-10"></div>
      <BrowserRouter future={{ v7_startTransition: true }}>
        <Navbar />
        <main className="relative z-0">
          <RouterComponent />
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
