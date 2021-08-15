import React from "react";

import { useQuery } from "@apollo/client";
import { QUERY_ONE } from "./PokemonAPI";

import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  IconButton,
  makeStyles,
  createStyles,
  Theme,
  CircularProgress,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";

import "./Pokemon.scss";

import waterImg from "./static/water.png";
import startCapImg from "./static/pokeball-top.svg";
import endCapImg from "./static/pokeball-bottom.svg";

function titleCase(input: string) {
  return input
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

function hectogramsToPounds(hectograms: number) {
  return (hectograms / 4.5359237).toFixed(1);
}

function decimetersToInches(decimeters: number) {
  return (decimeters * 3.937).toFixed(1);
}

function PokemonStats({ name }: { name: string }) {
  const { loading, error, data } = useQuery(QUERY_ONE, { variables: { name } });

  if (loading) return <CircularProgress />;
  if (error) return <div>Error: {error.message}</div>;

  const { types, height, weight } = data.pokemon;

  console.log(types);

  return (
    <div>
      <p>
        {"Types: " +
          types
            .map(({ type }: { type: any }) => titleCase(type.name))
            .join(", ")}
      </p>
      <p>Height: {decimetersToInches(height)} in</p>
      <p>Weight: {hectogramsToPounds(weight)} lbs</p>
    </div>
  );
}

function PokemonCard(props: any) {
  const pokemon = props.pokemon;
  return (
    <Grid item xs={12} sm={6} md={4}>
      <div className="pokemon-card">
        <div
          className="name-plate"
          onClick={() => window.open(pokemon.url, "_blank")}
        >
          <img className="start-cap" src={startCapImg} />
          {titleCase(pokemon.name)}
          <img className="end-cap" src={endCapImg} />
        </div>
        <img className="sprite" src={pokemon.image} alt={pokemon.name} />
        <PokemonStats name={pokemon.name} />
      </div>
    </Grid>
  );
}

export { PokemonCard };
