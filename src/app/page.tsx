"use client";

import React, { useEffect, useState, useRef } from "react";
import { Button } from "@nextui-org/react";

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

export const Home = () => {
  const [dailyFact, setDailyFact] = useState<string>("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const favRef = useRef<string[]>([]);

  const getRandomItem = (array: Facts[] = []): Facts | null => {
    if (array.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  const listFacts = async () => {
    try {
      const response = await fetch("https://cat-fact.herokuapp.com/facts");
      const catFacts: Facts[] = await response.json();

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
  return (
    <main className='flex min-h-screen flex-col items-center p-44'>
      <Image width='100' alt='Cat Image' src={icon} />
      <div style={{ marginTop: "30px" }}>
        <Button
          onClick={() => reloadFacts()}
          color='danger'
          aria-label='Reload'
          isIconOnly
        >
          <RefreshIcon />
        </Button>
      </div>

      <h1 style={{ marginTop: "30px" }}> Cat Facts:</h1>
      <div style={{ marginTop: "30px" }}>
        {" "}
        <ul style={{ marginTop: "30px" }}>
          {dailyFact}
          <Button
            onClick={() => addToFavorites(dailyFact)}
            color='danger'
            aria-label='Like'
            isIconOnly
          >
            <HeartIcon />
          </Button>
        </ul>
      </div>
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
};
