import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg'
import   './Featured.css'

const Featured = () => {
    return (
        <section className="featured-item text-white pt-8 my-20 bg-fixed">
            <SectionTitle
            heading={"Featured Item"}
            subHeading={"check it out"}
            >
               
            </SectionTitle>
            <div className="md:flex justify-center items-center pt-12 pb-20 px-36 bg-slate-500 bg-opacity-50">
               <div>
                 <img className="bg-cover" src={featuredImg} alt="" />
                
               </div>
               <div className="ml-6">
                    <p>Aug 20,2029</p>
                    <p className="uppercase">Where can i get some ?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus consectetur neque ad vitae unde reiciendis autem aliquam, eligendi delectus eum sequi magnam fuga quo accusantium non! Error rerum perferendis illo at, mollitia voluptate eum molestias, similique cupiditate harum quasi? Eos porro tempora exercitationem eum aperiam unde neque ratione aliquam quidem.</p>
                    <button className="btn btn-outline border-0 mt-4 border-b-4">Order Now</button>
               </div>
            </div>
        </section>
    );
};

export default Featured;