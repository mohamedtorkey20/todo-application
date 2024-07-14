import { FC } from "react";
import { NavLink } from "react-router-dom";
import { FcTodoList } from "react-icons/fc";
import { IoIosCloudDone } from "react-icons/io";

interface IProps {
  name: string;
  image: string;
}
const SidBar: FC<IProps> = () => {
  return (
    <>
      <div className="flex flex-col p-10 gap-10 ">
        <div className="flex justify-start items-center p-2 rounded-lg gap-2 bg-slate-50">
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
              width={25}
              alt=""
            />
          </div>
          <div className="text-xs text-blue-950">Mohamed torkey</div>
        </div>
        <div className="text-xs text-gray-400">General</div>

        <NavLink
          to=""
          className={({ isActive }) =>
            isActive
              ? "text-blue-950 rounded-lg bg-slate-50  text-md font-bold"
              : "text-blue-950 text-md"
          }
        >
          <div className=" rounded-lg hover:bg-slate-50 flex items-center px-4 py-3 gap-2">
            <FcTodoList size={20} />
            Todo
          </div>
        </NavLink>

        <NavLink
          to="index"
          className={({ isActive }) =>
            isActive
              ? "text-blue-950 rounded-lg bg-slate-50  text-md font-bold"
              : "text-blue-950 text-md"
          }
        >
          <div className="rounded-lg hover:bg-slate-50 flex items-center px-4 py-3 gap-2">
            <IoIosCloudDone size={20} />
            Compeleted
          </div>
        </NavLink>
      </div>
    </>
  );
};

export default SidBar;
