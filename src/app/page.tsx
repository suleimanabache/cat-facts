"use client";

import React, { useEffect, useState, useRef } from "react";
import { Button, ButtonGroup } from "@nextui-org/react";

import Image from "next/image";
import icon from "./catImg.jpg";
import { RefreshIcon } from "./components/RefreshIcon";
import { HeartIcon } from "./components/HeartIcon";

interface Facts {
  _id: string;
  text: string;
  createdAt: string;
  used: string;
}

export default function Home() {
  const [dailyFact, setDailyFact] = useState<string>("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const favRef = useRef([]);

  const getRandomItem = (array: Facts[]) => {
    if (array.length === 0) {
      return undefined;
    }

    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  const listFacts = async () => {
    try {
      const response = await fetch("https://cat-fact.herokuapp.com/facts");
      const catFacts = await response.json();

      const resultArray = catFacts.filter(
        (element) => !favRef.current.includes(element.text)
      );
      const randomItem = getRandomItem(resultArray);
      setDailyFact(randomItem?.text);
    } catch (error) {
      console.error("error here");
    }
  };

  useEffect(() => {
    listFacts();
  }, []);

  const reloadFacts = () => {
    listFacts();
  };

  const addToFavorites = (factText: string) => {
    setFavorites((prevFavorites) => [...prevFavorites, factText]);
    favRef.current = [...favRef.current, factText ?? ""];
    listFacts();
  };
  //1st
  //add a reload button to reload facts
  //add favourite button to move cat facts to favourite screen
  //2nd
  //on fav screen add remove cat facts to return facts to facts screen
  //3rd
  //push to git
  //4th
  //unit test
  return (
    <main className='flex min-h-screen flex-col items-center p-44'>
      <Image width='100' alt='icon' src={icon} />
      <Button onClick={() => reloadFacts()} color='danger' aria-label='Like'>
        <RefreshIcon />
      </Button>
      <h1 style={{ marginTop: "30px" }}> Cat Facts:</h1>
      <ul style={{ marginTop: "30px" }}>{dailyFact}</ul>
      <ul>
        <Button
          onClick={() => addToFavorites(dailyFact)}
          color='danger'
          aria-label='Like'
        >
          <HeartIcon />
        </Button>
      </ul>
      <div className='favorites-container'>
        <h2 style={{ marginTop: "30px" }}>Favorites:</h2>
        <ul>
          {favorites.map((favorite, index) => (
            <li key={index} style={{ marginBottom: "20px" }}>
              {favorite}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
