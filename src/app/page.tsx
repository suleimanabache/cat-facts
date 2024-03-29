"use client";

import React, { useEffect, useState, useRef } from "react";

import Image from "next/image";
import { RefreshIcon } from "./components/RefreshIcon";
import { HeartIcon } from "./components/HeartIcon";

export interface Facts {
  _id: string;
  text: string;
  createdAt: string;
  used: string;
}

export const getRandomItem = (array: Facts[] = []): Facts | null => {
  if (array.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const Home = () => {
  const [dailyFact, setDailyFact] = useState<string | undefined>("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const favRef = useRef<string[]>([]);

  const listFacts = async () => {
    try {
      const response = await fetch("https://cat-fact.herokuapp.com/facts");
      const catFacts: Facts[] = await response.json();

      const resultArray = catFacts.filter(
        (element) => !favRef.current.includes(element.text)
      );
      const randomItemObj = getRandomItem(resultArray);
      const randomItem = randomItemObj?.text;
      setDailyFact(randomItem);
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
    <main className='flex min-h-screen flex-col items-center pt-4'>
      <Image
        width={100}
        height={200}
        alt='Cat Image'
        src='/assets/catImg.jpg'
      />

      <h1 className='mt-8 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl'>
        Random Cat Fact:
      </h1>
      <div className='flex items-center'>
        <p className='text-sm italic'>
          There are a total of 5 Cat Facts. One will be displayed after every
          reload. Click on the Love icon to add facts to favorites
        </p>
      </div>

      <div className='items-center pt-10'>
        <ul className='mt-8 flex items-center max-w-96'>
          <li>{dailyFact}</li>
        </ul>
        <div className='flex space-x-2'>
          <button
            type='button'
            onClick={() => reloadFacts()}
            aria-label='Reload'
          >
            <RefreshIcon />
          </button>
          <button
            type='button'
            onClick={() => addToFavorites(dailyFact!)}
            aria-label='Like'
          >
            <HeartIcon />
          </button>
        </div>
      </div>

      <div className='flex min-h-screen flex-col items-center'>
        <h1 className='mt-8 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl'>
          Favorites:
        </h1>
        <ul>
          {favorites.map((favorite, index) => (
            <li key={index} className='mt-8 flex items-center max-w-96'>
              {favorite}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Home;
