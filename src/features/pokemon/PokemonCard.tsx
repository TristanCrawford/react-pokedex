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

import bugTypeImg from "./static/bug.png";
import darkTypeImg from "./static/dark.png";
import dragonTypeImg from "./static/dragon.png";
import electricTypeImg from "./static/electric.png";
import fairyTypeImg from "./static/fairy.png";
import fightingTypeImg from "./static/fighting.png";
import fireTypeImg from "./static/fire.png";
import flyingTypeImg from "./static/flying.png";
import ghostTypeImg from "./static/ghost.png";
import grassTypeImg from "./static/grass.png";
import groundTypeImg from "./static/ground.png";
import iceTypeImg from "./static/ice.png";
import normalTypeImg from "./static/normal.png";
import poisonTypeImg from "./static/poison.png";
import psychicTypeImg from "./static/psychic.png";
import rockTypeImg from "./static/rock.png";
import shadowTypeImg from "./static/shadow.png";
import steelTypeImg from "./static/steel.png";
import unknownTypeImg from "./static/unknown.png";
import waterTypeImg from "./static/water.png";

const typeImgMap = {
  bug: bugTypeImg,
  dark: darkTypeImg,
  dragon: dragonTypeImg,
  electric: electricTypeImg,
  fairy: fairyTypeImg,
  fighting: fightingTypeImg,
  fire: fireTypeImg,
  flying: flyingTypeImg,
  ghost: ghostTypeImg,
  grass: grassTypeImg,
  ground: groundTypeImg,
  ice: iceTypeImg,
  normal: normalTypeImg,
  poison: poisonTypeImg,
  psychic: psychicTypeImg,
  rock: rockTypeImg,
  shadow: shadowTypeImg,
  steel: steelTypeImg,
  unknown: unknownTypeImg,
  water: waterTypeImg,
};

function titleCase(input: string) {
  return input
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

function hectogramsToPounds(hectograms: number): number {
  return hectograms / 4.536;
}

function decimetersToInches(decimeters: number): number {
  return decimeters * 3.937;
}

function PokemonStats({ name }: { name: string }) {
  const { loading, error, data } = useQuery(QUERY_ONE, { variables: { name } });

  if (loading) return <CircularProgress />;
  if (error) return <div>Error: {error.message}</div>;

  const { types, height, weight } = data.pokemon;

  const heightInches = decimetersToInches(height);
  const weightPounds = hectogramsToPounds(weight);

  return (
    <div className="stats">
      <div className="types">
        {types.map(({ type }: { type: any }, idx: number) => {
          if (type.name in typeImgMap) {
            return (
              <img
                key={idx}
                src={(typeImgMap as any)[type.name]}
                alt={type.name}
              />
            );
          }
          return <img key={idx} src={unknownTypeImg} alt={type.name} />;
        })}
      </div>
      <p>Height: {(heightInches / 12).toFixed(0)}'{(heightInches % 12).toFixed(0)}"</p>
      <p>Weight: {weightPounds.toFixed(1)} lbs</p>
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
