import useFavouritesStore from '../components/store/AddToFavStore';
import FavWeatherCards from '../components/FavWeatherCards';

const FavWeathers = () => {
  const { favourites } = useFavouritesStore();

  return (
    <div className="bg-gradient-to-b from-sky-300 via-sky-100 to-sky-50 w-full min-h-screen">
      <h4 className="text-2xl font-poppins font-semibold text-center py-2">
        Your favourites
      </h4>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
        {favourites.length > 0 ? (
          favourites.map((item, index) => (
            <>
              <FavWeatherCards
                key={index}
                city={item.name}
                lat={item.lat}
                lon={item.lon}
              />
            </>
          ))
        ) : (
          <p className="col-span-full text-center text-lg font-semibold text-gray-700">
            You don't have any favourite place
          </p>
        )}
      </div>
    </div>
  );
};

export default FavWeathers;
