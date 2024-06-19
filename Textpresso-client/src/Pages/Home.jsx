
import Banner from "../Components/Banner";
import Newsletter from "../Components/Newsletter";
import RecentBlog from "../Components/RecentBlog";


const Home = () => {
    
    return (
        <div>
            <Banner/>
            <RecentBlog></RecentBlog>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;