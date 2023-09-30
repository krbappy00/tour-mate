import searchIcon from "../../assets/searchIcon.svg"
import cal from "../../assets/icon/calender.svg"
import { AiOutlinePlusCircle,AiOutlineMinusCircle } from "react-icons/ai";
import { MdSupervisorAccount } from "react-icons/md";
import { useState } from "react";

export default function SearchBox() {
    const [passenger,setPassenger] = useState(2)

    return (
        <div className="">
            <div className="bg-white shadow-lg w-[85%]  mt-[-100px] absolute left-[30px] rounded-xl">
                <div className="p-6">
                    <div className="flex gap-3 pb-4">
                        <img src={searchIcon} alt="" />
                        <input className="placeholder-tgray border-none outline-none" type="text" placeholder="Leaving from..." />
                    </div>
                    <div className="w-full h-[1px] bg-[#DEDEDE] mb-4"></div>
                    <div className="flex gap-3 pb-4">
                        <img src={searchIcon} alt="" />
                        <input className="placeholder-tgray outline-none	"  type="text" placeholder="Going to..." />
                    </div>
                    <div className="w-full h-[1px] bg-[#DEDEDE]"></div>
                    <div className="pt-4 flex justify-between">
                        <div className="flex gap-2 items-center">
                            <img src={cal} alt="" />
                            <p className="text-tgray">Today</p>
                            
                        </div>
                        <div className="flex items-center text-tgray gap-3">
                            <div className="w-[1px] h-[22px] bg-[#DEDEDE]"></div>
                            {passenger === 1 ? <>
                                <div className="w-[15px] h-[26px] text-xl">{passenger}</div>
                                
                                <AiOutlinePlusCircle className="text-[#00AFF5] text-2xl" onClick={()=>setPassenger(passenger+1)}></AiOutlinePlusCircle>
                            </>:<>
                                <AiOutlineMinusCircle className="text-[#00AFF5] text-2xl" onClick={()=>setPassenger(passenger-1)}></AiOutlineMinusCircle ><div className="w-[15px] h-[26px] text-xl">{passenger}</div><AiOutlinePlusCircle className="text-[#00AFF5] text-2xl" onClick={()=>setPassenger(passenger+1)}></AiOutlinePlusCircle>
                            </> }
                            <MdSupervisorAccount className="text-[30px] text-tgray"></MdSupervisorAccount>
                            
                        </div>
                    </div>
                </div>
                <div className="">
                    <button className="bg-[#00AFF5] text-white w-full p-5 rounded-b-xl text-xl">Search</button>
                </div>
                
                
            </div>
        </div>
    );
}
