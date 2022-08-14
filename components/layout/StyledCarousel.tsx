import React, { FC } from 'react';
import Image from 'next/image';
import CardMedia from '@mui/material/CardMedia';
import { useTheme } from '@mui/material/styles';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import useWindowSize from '../../utils/hooks/useWindowSize';

const StyledCarousel: FC<{
  images: string[];
  imageSize: number;
  thumbSize: number;
  height: string;
  onClickItem?: (index: number, item: React.ReactNode) => void;
}> = ({ images, imageSize, thumbSize, height, onClickItem }) => {
  const theme = useTheme();
  const { width } = useWindowSize();

  const renderThumbs = () => {
    return images.map((image) => {
      return (
        <Image
          key={image}
          objectFit="cover"
          src={`${
            process.env.NEXT_PUBLIC_BASE_URL
          }/uploads/post_images/${image}/image_${160}.webp`}
          width={thumbSize}
          height={thumbSize}
          alt={`post-image-${image}-${160}`}
        />
      );
    });
  };

  const indicatorStyles = {
    display: 'inline-block',
    marginRight: '10px',
    cursor: 'pointer',
    height: '10px',
    width: '10px',
    borderRadius: '50%',
  };

  const renderIndicator = (
    clickHandler: (
      // eslint-disable-next-line no-unused-vars
      e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>,
    ) => void,
    isSelected: boolean,
    index: number,
    label: string,
  ): React.ReactNode => {
    return (
      <li
        style={{
          ...indicatorStyles,
          backgroundColor: isSelected
            ? theme.palette.primary.main
            : theme.palette.background.default,
        }}
        onClick={clickHandler}
        onKeyDown={clickHandler}
        value={index}
        key={index}
        role="button"
        tabIndex={0}
        aria-label={`${label} ${index + 1}`}
      />
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
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/post_images/${image}/image_${imageSize}.webp`}
              alt={`post-image-${image}-${imageSize}`}
            />
          </CardMedia>
        );
      })}
    </Carousel>
  );
};

export default StyledCarousel;
