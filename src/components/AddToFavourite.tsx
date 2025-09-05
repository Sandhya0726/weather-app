import { BookmarkPlus } from 'lucide-react';
import useFavouritesStore from './store/AddToFavStore';
import type { AddToFavProps } from '../types/FavWeatherCardProps';

const AddToFavourite = ({ lat, lon, name }: AddToFavProps) => {
  const { favourites, addFavourite, removeFavourite } = useFavouritesStore();

  const isFav = favourites.some((f) => f.lat === lat && f.lon === lon);

  const handleClick = () => {
    if (isFav) {
      if (lat !== undefined && lon !== undefined) {
        removeFavourite(lat, lon);
      }
    } else if (lat !== undefined && lon !== undefined && name !== undefined) {
      addFavourite({ lat, lon, name });
    }
  };

  return (
    <div className="w-full  flex gap-2 justify-end rounded-md p-2 cursor-pointer">
      <span className="font-semibold font-poppins text-black">
        {isFav ? 'Remove from favourites' : 'Add to favourites'}
      </span>
      <BookmarkPlus
        color={isFav ? 'orange' : 'gray'}
        fill={isFav ? 'orange' : 'white'}
        onClick={handleClick}
      />
    </div>
  );
};

export default AddToFavourite;
