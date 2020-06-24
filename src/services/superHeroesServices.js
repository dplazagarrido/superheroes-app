import { superHeroesAppis } from "../utils/apisUrlConfig";
import axios from "axios";

export function getAllSuperHeroes() {
  return axios.get(superHeroesAppis + "/v1/test/superheroes");
}

export function getSuperHeroeById(superHeroeId) {
  return axios.get(superHeroesAppis + "/v1/test/superheroes/" + superHeroeId);
}

export function getFlySuperHeroes(value) {
  return axios.get(
    superHeroesAppis + "/v1/test/superheroes/?puedeVolar=" + value
  );
}
