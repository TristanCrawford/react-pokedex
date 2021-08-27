import React, { useEffect, useState } from "react";

import debounce from "@features/common/debounce";

import { useAppDispatch, useAppSelector } from "hooks";
import { setFavorites } from "@features/pokemon/PokemonSlice";

import { useQuery } from "@apollo/client";
import { QUERY_ALL } from "@features/pokemon/PokemonAPI";

import {
  Grid,
  CircularProgress,
  Typography,
  TextField,
} from "@material-ui/core";

import "../App.scss";
import { PokemonCard } from "@features/pokemon/PokemonCard";

function PokeGrid({ pokemons }: any) {
  if (pokemons.length === 0) {
    return <Typography>No Pokemon Found :(</Typography>;
  }

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

  const [searchFilter, setSearchFilter] = useState("");

  const [pokemons, setPokemons] = useState([]);
  //data.pokemons.results;
  const favorites = pokemons.filter(
    (pokemon: any) => pokemon.id in state.favorites
  );

  useEffect(() => {
    const favoritePokemon = localStorage.getItem("favoritePokemon");

    if (favoritePokemon !== null) {
      dispatch(setFavorites(JSON.parse(favoritePokemon)));
    }
  }, []);

  useEffect(() => {
    if (data) {
      setPokemons(data.pokemons.results);
    }
  }, [data]);

  useEffect(() => {
    if (searchFilter.length > 0) {
      setPokemons(
        pokemons.filter((pokemon: any) => pokemon.name.includes(searchFilter))
      );
    } else if (data) {
      setPokemons(data.pokemons.results);
    }
  }, [searchFilter]);

  if (loading) return <CircularProgress />;
  if (error) return <span>Error: {error.message}</span>;

  return (
    <div style={{ margin: "1em" }}>
      <TextField
        label="Search..."
        onChange={debounce((e: any) => setSearchFilter(e.target.value))}
      />
      <Typography variant="h5">Favorites</Typography>
      <PokeGrid pokemons={favorites} />
      <Typography variant="h5">Pokedex</Typography>
      <PokeGrid pokemons={pokemons} />
    </div>
  );
}
