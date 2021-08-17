import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "hooks";
import { setFavorites } from "@features/pokemon/PokemonSlice";

import { useQuery } from "@apollo/client";
import { QUERY_ALL } from "@features/pokemon/PokemonAPI";

import { Grid, CircularProgress, Typography } from "@material-ui/core";

import "../App.scss";
import { PokemonCard } from "@features/pokemon/PokemonCard";

function PokeGrid({ pokemons }: any) {
  return (
    <Grid container spacing={1}>
      {pokemons.map((pokemon: any) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </Grid>
  );
}

export default function () {
  const state = useAppSelector((state) => state.pokemon);
  const dispatch = useAppDispatch();
  const { loading, error, data } = useQuery(QUERY_ALL);

  useEffect(() => {
    const favoritePokemon = localStorage.getItem("favoritePokemon");

    if (favoritePokemon !== null) {
      dispatch(setFavorites(JSON.parse(favoritePokemon)));
    }
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <span>Error: {error.message}</span>;

  const pokemons = data.pokemons.results;
  const favorites = pokemons.filter(
    (pokemon: any) => pokemon.id in state.favorites
  );

  return (
    <div style={{ margin: "1em" }}>
      <Typography variant="h5">Favorites</Typography>
      <PokeGrid pokemons={favorites} />
      <Typography variant="h5">Pokedex</Typography>
      <PokeGrid pokemons={pokemons} />
    </div>
  );
}
