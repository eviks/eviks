import React, { FC } from 'react';
import Image from 'next/image';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import YoutubeEmbed from '../YoutubeEmbed';
import useWindowSize from '../../utils/hooks/useWindowSize';
import { CarouselContent } from '../../types';
import { youtubeIdFromLink } from '../../utils';

const StyledCarousel: FC<{
  content: CarouselContent[];
  imageSize: number;
  thumbSize: number;
  height: string;
  external: boolean;
  temp?: boolean;
  onClickItem?: (index: number, item: React.ReactNode) => void;
}> = ({
  content,
  imageSize,
  thumbSize,
  height,
  external,
  temp,
  onClickItem,
}) => {
  const theme = useTheme();
  const { width } = useWindowSize();

  const renderThumbs = () => {
    return content.map(({ link, type }) => {
      return type === 'image' ? (
        <Image
          key={link}
          objectFit="cover"
          src={
            external
              ? link
              : `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${
                  temp ? 'temp/' : ''
                }post_images/${link}/image_${160}.webp`
          }
          width={thumbSize}
          height={thumbSize}
          alt={`post-image-${link}-${160}`}
          placeholder="blur"
          blurDataURL="/img/blur.webp"
        />
      ) : (
        <Image
          key={link}
          objectFit="cover"
          src={`https://img.youtube.com/vi/${youtubeIdFromLink(
            link,
          )}/hqdefault.jpg`}
          width={thumbSize}
          height={thumbSize}
          alt={`post-image-${link}-${160}`}
          placeholder="blur"
          blurDataURL="/img/blur.webp"
        />
      );
    });
  };

  const renderIndicator = (
    _clickHandler: (
      // eslint-disable-next-line no-unused-vars
      e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>,
    ) => void,
    isSelected: boolean,
    index: number,
    _label: string,
  ): React.ReactNode => {
    return (
      isSelected && (
        <Chip
          sx={{
            backgroundColor: theme.palette.background.default,
          }}
          label={`${index + 1} / ${content.length}`}
          variant="filled"
        />
      )
    );
  };

  return (
    <Carousel
      infiniteLoop={true}
      showStatus={false}
      showThumbs={width ? width >= 900 : false}
      renderIndicator={renderIndicator}
      renderThumbs={renderThumbs}
      swipeScrollTolerance={100}
      preventMovementUntilSwipeScrollTolerance={true}
      onClickItem={onClickItem}
    >
      {content.map(({ link, type }, index) => {
        return (
          <CardMedia
            sx={{
              height,
              width: '100%',
              position: 'relative',
            }}
            key={link}
          >
            {type === 'image' ? (
              <Image
                priority={index === 0}
                objectFit="cover"
                layout="fill"
                src={
                  external
                    ? link
                    : `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${
                        temp ? 'temp/' : ''
                      }post_images/${link}/image_${imageSize}.webp`
                }
                alt={`post-image-${link}-${imageSize}`}
                placeholder="blur"
                blurDataURL="/img/blur.webp"
              />
            ) : (
              <YoutubeEmbed link={link} />
            )}
          </CardMedia>
        );
      })}
    </Carousel>
  );
};

export default StyledCarousel;
