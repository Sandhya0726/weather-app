import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface Favourite {
  lat: number;
  lon: number;
  name: string;
}

interface State {
  favourites: Favourite[];
}

interface Actions {
  addFavourite: (fav: Favourite) => void;
  removeFavourite: (lat: number, lon: number) => void;
}

const INITIAL_STATE: State = {
  favourites: JSON.parse(localStorage.getItem('favourites') || '[]'),
};

const useFavouritesStore = create(
  devtools<State & Actions>(
    (set) => ({
      ...INITIAL_STATE,

      addFavourite: (fav: Favourite) =>
        set((state) => {
          if (
            state.favourites.some((f) => f.lat === fav.lat && f.lon === fav.lon)
          ) {
            return state;
          }
          const updated = [...state.favourites, fav];
          localStorage.setItem('favourites', JSON.stringify(updated));
          return { favourites: updated };
        }),

      removeFavourite: (lat: number, lon: number) =>
        set((state) => {
          const updated = state.favourites.filter(
            (f) => f.lat !== lat || f.lon !== lon
          );
          localStorage.setItem('favourites', JSON.stringify(updated));
          return { favourites: updated };
        }),
    }),
    { name: 'Favourites Store' }
  )
);

export default useFavouritesStore;
