

const SectionTitle = ({heading,subHeading}) => {
    return (
        <div className="md:w-4/12 my-8 mx-auto text-center">
            <p className="text-yellow-600 mb-4 text-2xl">- - -{subHeading}- - -</p>
            <h3 className="text-4xl uppercase border-y-4 py-4">{heading}</h3>
        </div>
    );
};

export default SectionTitle;