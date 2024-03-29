import React, { FC } from 'react';
import Image from 'next/image';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import useWindowSize from '../../utils/hooks/useWindowSize';

const StyledCarousel: FC<{
  images: string[];
  imageSize: number;
  thumbSize: number;
  height: string;
  external: boolean;
  temp?: boolean;
  onClickItem?: (index: number, item: React.ReactNode) => void;
}> = ({
  images,
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
    return images.map((image) => {
      return (
        <Image
          key={image}
          objectFit="cover"
          src={
            external
              ? image
              : `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${
                  temp ? 'temp/' : ''
                }post_images/${image}/image_${160}.webp`
          }
          width={thumbSize}
          height={thumbSize}
          alt={`post-image-${image}-${160}`}
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
          label={`${index + 1} / ${images.length}`}
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
      {images.map((image, index) => {
        return (
          <CardMedia
            sx={{
              height,
              width: '100%',
              position: 'relative',
            }}
            key={image}
          >
            <Image
              priority={index === 0}
              objectFit="cover"
              layout="fill"
              src={
                external
                  ? image
                  : `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${
                      temp ? 'temp/' : ''
                    }post_images/${image}/image_${imageSize}.webp`
              }
              alt={`post-image-${image}-${imageSize}`}
              placeholder="blur"
              blurDataURL="/img/blur.webp"
            />
          </CardMedia>
        );
      })}
    </Carousel>
  );
};

export default StyledCarousel;
