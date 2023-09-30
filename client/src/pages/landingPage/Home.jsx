import Header from "../../components/hero/Header";
import MenuBar from "../../components/menubar/MenuBar";
import SearchBox from "../../components/searchBox/SearchBox";

function Home() {
    return (
        <div className="max-h-screen overflow-hidden">
            <Header></Header>
            <SearchBox></SearchBox>
            <MenuBar></MenuBar> 
            
        </div>
    );
}

export default Home;