import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";


// import resList from "../utils/mockdata";

const Body = () => {
    // react state variable const[name, function for updation] = useState(default values);
    const [listofRestaurant, setlistofRestaurant] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);
    const [searchText, setSearchText] = useState("");

    //Higher Order component 
    const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);


    //UseEffect(arrow function, dependency array)
    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        try {
            // const data = await fetch("   ");
            const MoreData = await fetch("https://www.swiggy.com/mapi/homepage/getCards?lat=12.96340&lng=77.58550");

            // const json = await data.json();
            const json2 = await MoreData.json();

            // console.log("resdata", json.data);

            // setlistofRestaurant(json?.data?.cards[2]?.data?.data?.cards);
            // console.log("dasdad", json.data.success.cards[1].gridWidget.gridElements.infoWithStyle.restaurants);
            // setFilteredRestaurant(json?.data?.cards[2]?.data?.data?.cards);


            // setlistofRestaurant(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle.restaurants);
            setlistofRestaurant(json2?.data.success.cards[4].gridWidget.gridElements.infoWithStyle.restaurants);
            setFilteredRestaurant(json2?.data.success.cards[4].gridWidget.gridElements.infoWithStyle.restaurants);
            // console.log(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle.restaurants);
            // console.log(json2?.data.success.cards[4].gridWidget.gridElements.infoWithStyle.restaurants);

        } catch (error) {
            console.log(error);
        }

    }

    const onlineStatus = useOnlineStatus();

    if (onlineStatus === false) return (<h1>Please check internet connection you are 🔴Offline</h1>);


    if (listofRestaurant.length === 0) {
        return <Shimmer />
    }


    return (
        <div className='body'>
            <div className='filter flex justify-center p-5'>
                <div className="search">

                    <input type="text" placeholder="Search" className=" rounded-lg mr-0.5 border-l-gray-900 px-4 py-2 bg-slate-200" value={searchText}
                        onChange={(e) => { setSearchText(e.target.value) }} />

                    <button className=" px-4 py-2 bg-blue-600 text-white font-medium rounded-lg"
                        onClick={() => {
                            const filteredRestaurant = listofRestaurant.filter(
                                (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()));
                            setFilteredRestaurant(filteredRestaurant);
                        }}>Submit</button>

                </div>
            </div>
            <div className='flex justify-center flex-wrap'>
                {filteredRestaurant.map((restaurant) =>
                    <Link key={restaurant?.info?.id} to={"/restaurant/" + restaurant?.info?.id}>
                        {/* <RestaurantCard resData={restaurant} /> */}
                        {restaurant.info.avgRating > 4 ? <RestaurantCardPromoted resData={restaurant} /> : <RestaurantCard resData={restaurant} />}
                    </Link>)}
                {/* {filteredRestaurant.map((restaurant) => <RestaurantCard resData={restaurant} />)} */}
            </div>
        </div>
    )
}

export default Body;