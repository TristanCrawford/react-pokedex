import React from "react";

import { useQuery } from "@apollo/client";
import { QUERY_ALL } from "@features/pokemon/PokemonAPI";

import { Grid, CircularProgress } from "@material-ui/core";

import "../App.scss";
import { PokemonCard } from "@features/pokemon/PokemonCard";

function PokeGrid() {
  const { loading, error, data } = useQuery(QUERY_ALL);

  if (loading) return <CircularProgress />;
  if (error) return <span>Error: {error.message}</span>;

  const pokemons = data.pokemons.results;

  console.log(pokemons);

  return (
    <Grid container spacing={1}>
      {pokemons.map((pokemon: any) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </Grid>
  );
}

export default function () {
  return (
    <div style={{ margin: "1em" }}>
      {/* <AppBar>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Pokedex
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar /> */}
      <PokeGrid />
    </div>
  );
}
