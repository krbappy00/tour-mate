import { Link } from "react-router-dom"
import ibox from "../../assets/icon/inbox.svg"
import profile from "../../assets/icon/profile.svg"
import publish from "../../assets/icon/publish.svg"
import rides from "../../assets/icon/rides.svg"
import search from "../../assets/icon/search.svg"

function MenuBar() {
    return (
            <div className="w-[100vh] h-[100px]">
                <div className="border-t-2 h-[100px] fixed bottom-0  w-screen">
                    <div className="ml-4 flex gap-7 items-center h-[100px] fixed bottom-0  w-screen">
                        <img src={search} alt="" />
                        <img src={rides} alt="" />
                        <img src={publish} alt="" />
                        <Link to="/login"><img className="cursor-pointer" src={ibox} alt="" /></Link>
                        <img src={profile} alt="" />
                    </div>
                </div>
               
            </div>
    );
}

export default MenuBar;