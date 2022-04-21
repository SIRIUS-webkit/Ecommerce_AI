import Banner from "../components/Banner";
import Details from "../components/Details";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Mission from "../components/Mission";
import Productshowcase from "../components/Productshowcase";

function Home() {
  return (
    <>
      <div id="main-container">
        <Header />
        <Banner />
        <Details />
        <Productshowcase />
        <Mission />
        <Footer />
      </div>
    </>
  );
}

export default Home;
