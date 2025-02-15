import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { FaHeart, FaPlus, FaStar } from 'react-icons/fa';

import { Anime, DefaultResponseData } from '@types';
import { AnimeModel } from '@models';
import { AnimesResources } from '@resources';
import { useLayoutContext } from '../../../context/layout';
import Title from '@layouts/Title';
import KitsuButton from '../../../components/common/KitsuButton';

interface Props extends DefaultResponseData {
  anime: Anime;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { slug } = context.params;

  const anime = AnimesResources.one(await AnimeModel.findBySlug(slug as string));

  return { props: { anime } };
};

const AnimePage: NextPage<Props> = ({ anime }) => {
  const {
    headerTransparentState: [headerTransparent, setHeaderTransparent],
    scrollPercent,
  } = useLayoutContext();

  useEffect(() => {
    const boolean: boolean = scrollPercent < 10;
    if (headerTransparent !== boolean) setHeaderTransparent(boolean);
  }, [scrollPercent]);

  useEffect(() => {
    return () => setHeaderTransparent(false);
  }, []);

  if (!anime) return null;

  return (
    <div className="h-1900">
      <Title>{anime.canonicalTitle}</Title>
      <div className="relative">
        <div
          className="absolute top-[-56px] bottom-0 -z-10 w-full h-[570px] bg-gradient-to-b from-red-800 bg-cover bg-top"
          style={{ backgroundImage: `url('${anime.cover.small}')` }}
        />
        <div className="flex relative z-30 w-full mx-auto px-10 lg:px-2 pt-[250px] max-w-[1200px]">
          <div className="mx-1 w-full mt-[175px]">
            <div className="h-20 w-full border rounded" />
            <div className="mx-1 py-3 divide-opacity-10 divide-y-2">
              <div className="flex py-1">
                <h2 className="text-3xl">{anime.canonicalTitle}</h2>
                <span className="text-md mt-2 ml-2 text-opacity-70">
                  ({anime.season})
                </span>
              </div>
              <div className="flex w-full py-2 justify-between">
                <div className="flex text-sm">
                  <i className="mx-1">
                    <FaStar size={18} className="text-yellow-400" />
                  </i>
                  <span>
                    Rank {anime.rating.rank} ({anime.rating.average}%)
                  </span>
                </div>
                <div className="flex text-sm">
                  <span>
                    Rank {anime.popularity.rank} ({anime.popularity.count})
                  </span>
                  <i className="mx-1">
                    <FaHeart size={18} className="text-red-700" />
                  </i>
                </div>
              </div>
              <div className="py-1">
                <p className="text-justify"> {anime?.description}</p>
              </div>
            </div>
          </div>
          <div className="sticky top-[250px] mx-4">
            <Image
              width={320}
              className="rounded-sm shadow-lg"
              height={440}
              src={anime.poster.small}
              alt="poster"
              onClick={() => window?.open(`https://kitsu.io/anime/${anime.slug}`)}
            />
            <div>
              <div className="mx-auto">
                <div className="my-1">
                  <button className="w-full text-white rounded bg-primary py-1 shadow-lg hover:shadow-2xl hover:scale-105 transform transition">
                    <span className="flex justify-center font-bold">
                      Ajouter
                      <i className="ml-2 my-auto">
                        <FaPlus />
                      </i>
                    </span>
                  </button>
                </div>
                <div className="my-2">
                  <KitsuButton slug={anime.slug} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimePage;
