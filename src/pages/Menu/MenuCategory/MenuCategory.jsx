import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";



const MenuCategory = ({ items,title,img }) => {
    
    return (
        <div>
           { title &&  <Cover img={img} title={title}></Cover>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-16">
                {
                    // menu.map(item=><MenuItem
                     items.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }

            </div>
        <Link to={`/order/${title}`}><button className="btn btn-outline border-0 mt-4 border-b-4">Order Now</button></Link>
        </div>
    );
};

export default MenuCategory;