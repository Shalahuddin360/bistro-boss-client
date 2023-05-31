
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import MenuItem from "../Shared/MenuItem/MenuItem";
import useMenu from "../../hooks/useMenu";


const PopularMenu = () => {
    const [menu] = useMenu();
    console.log(menu)
    const popular = menu.filter(item=>item.category ==="popular");
    // console.log(popular);

    // const [menu,setMenu] = useState([])
    // useEffect(()=>{
    //     fetch('menu.json')
    //     .then(res=>res.json())
    //     .then(data=>{
    //         // console.log(data)
    //         const popularItems = data.filter(item=> item.category ==='popular')
    //         // console.log(popularItems)
    //         setMenu(popularItems)
    //     })
    // },[])

    return (
        <section className="mb-12">
            <SectionTitle heading={"From Our Menu"} subHeading={"Popular Items"}>
            </SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {
                // menu.map(item=><MenuItem
                popular.map(item=><MenuItem
                key={item._id}
                item={item}
                ></MenuItem>)
            }

            </div>
            <button className="btn btn-outline border-0 mt-4 border-b-4 ">View ALL Menu</button>
        </section>
    );
};

export default PopularMenu;