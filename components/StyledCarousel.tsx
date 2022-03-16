import React, { FC } from 'react';
import { Carousel } from 'react-responsive-carousel';
import CardMedia from '@mui/material/CardMedia';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import useWindowSize from '../utils/hooks/useWindowSize';

const StyledCarousel: FC<{
  images: string[];
  imageSize: number;
  thumbSize: number;
  onClickItem?: (index: number, item: React.ReactNode) => void;
}> = ({ images, imageSize, thumbSize, onClickItem }) => {
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
          }/uploads/post_images/${image}/image_${160}.png`}
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
      showThumbs={width ? width >= 600 : false}
      renderIndicator={renderIndicator}
      renderThumbs={renderThumbs}
      swipeScrollTolerance={50}
      preventMovementUntilSwipeScrollTolerance={true}
      onClickItem={onClickItem}
    >
      {images.map((image) => {
        return (
          <CardMedia
            key={image}
            component="img"
            height={imageSize}
            image={`/uploads/post_images/${image}/image_${640}.png`}
            alt={`post-image-${image}-${640}`}
          />
        );
      })}
    </Carousel>
  );
};

export default StyledCarousel;
