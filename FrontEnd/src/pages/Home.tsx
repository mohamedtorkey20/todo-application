import { FC } from "react"
import { Outlet } from "react-router-dom"
import SidBar from "../Components/sidBar/SidBar"


interface IProps{

}
const Home:FC<IProps>= () => {
  return (
    <>
       
       <div className="w-full h-svh bg-slate-50 flex">
        <div className="w-2/12 bg-slate-200 h-full">
          <SidBar name="mohamed" image="image.png" />
        </div>
        <div className="w-10/12 ml-2/12 overflow-auto">
          <Outlet />
        </div>
        
      </div>

    </>
)
}

export default Home