import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PokemonState {
  value: any[];
}

const initialState = { value: [] } as PokemonState;

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPokemon(state, action: PayloadAction<any[]>) {
      state.value = action.payload;
    },
  },
});

export const { setPokemon } = pokemonSlice.actions
export default pokemonSlice.reducer