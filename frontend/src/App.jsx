import Navbar from "./Components/Navbar/Navbar"
import { BrowserRouter } from 'react-router-dom'
import RouterComponent from "./RouterComponent"
import Footer from "./Components/Footer/Footer"


function App() {

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-[url('/bgpattern.png')] bg-repeat opacity-5 -z-10"></div>
      <BrowserRouter future={{ v7_startTransition: true }}>
        <Navbar />
        <RouterComponent />
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
