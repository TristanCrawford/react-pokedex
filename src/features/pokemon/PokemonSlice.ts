import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PokemonState {
  favorites: Record<number, string>;
}

const initialState = { favorites: {} } as PokemonState;

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<any>) {
      state.favorites = action.payload;
      localStorage.setItem("favoritePokemon", JSON.stringify(state.favorites));
    },
    addFavorite(state, action: PayloadAction<{ name: string, id: number }>) {
      state.favorites[action.payload.id] = action.payload.name;
      localStorage.setItem("favoritePokemon", JSON.stringify(state.favorites));
    },
    removeFavorite(state, action: PayloadAction<{ name: string, id: number }>) {
      if (!(action.payload.id in state.favorites)) return;

      delete state.favorites[action.payload.id];
      localStorage.setItem("favoritePokemon", JSON.stringify(state.favorites));
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite } =
  pokemonSlice.actions;
export default pokemonSlice.reducer;
