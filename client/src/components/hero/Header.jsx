import hero from "../../assets/heroBanner/hero.svg"
export default function Header() {
    return (
        <div className="z-0">
            <h1 className="text-white absolute text-4xl text-center left-5 mt-[35px] ">Your pick of rides at <br/> low prices</h1>
            <img src={hero} alt="" />
        </div>
    );
}

