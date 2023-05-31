
import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import menuImg from '../../../assets/menu/banner3.jpg';
import dessertImg from '../../../assets/menu/dessert-bg.jpeg';
import offeredImg from '../../../assets/menu/pizza-bg.jpg';
import soupImg from '../../../assets/menu/soup-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';

import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';

const Menu = () => {
    const [menu] = useMenu();
    const desserts = menu.filter(item=>item.category === "dessert");
    const soup = menu.filter(item=>item.category === "soup");
    const salad = menu.filter(item=>item.category === "salad");
    const offered = menu.filter(item=>item.category === "offered");
    const pizza = menu.filter(item=>item.category ==="pizza")
    return (
        <div>
            <Helmet>
                <title>Bistro Boss || Menu</title>
           
            </Helmet>
            <Cover img={menuImg} title={"our menu"}></Cover>

            {/* <PopularMenu></PopularMenu> */}

            {/* main cover  */}
            <SectionTitle subHeading="don't miss" heading="Today's offer"></SectionTitle>
            {/* offered menu items  */}
            <MenuCategory title={"offered"} img={offeredImg} items={offered}></MenuCategory>

            <SectionTitle subHeading="don't miss" heading="Today's offer"></SectionTitle>
            {/* dessert menu items  */}
            <MenuCategory title={"dessert"} img={dessertImg} items={desserts}></MenuCategory>

            <SectionTitle subHeading="don't miss" heading="Today's offer"></SectionTitle>
            {/* soup menu items  */}
            <MenuCategory title={"soup"} img={soupImg} items={soup} ></MenuCategory>
            
            <SectionTitle subHeading="don't miss" heading="Today's offer"></SectionTitle>
            {/* salad menu items  */}
            <MenuCategory title={"salad"} img={saladImg} items={salad} ></MenuCategory>

            <SectionTitle subHeading="don't miss" heading="Today's offer"></SectionTitle>
            {/* salad menu items  */}
            <MenuCategory title={"pizza"} img={saladImg} items={pizza} ></MenuCategory>
        </div>
    );
};

export default Menu;