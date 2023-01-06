import StarRatings from 'react-star-ratings';

export default function ProductRating({ rating, setRating, size }) {
  const sizes = {
    lg: '100px',
    md: '80px',
    sm: '40px',
    xs: '20px'
  };

  return (
    <StarRatings
      rating={rating}
      starRatedColor='gold'
      starHoverColor='gold'
      changeRating={setRating}
      numberOfStars={5}
      name='rating'
      starDimension={sizes[size]}
    />
  );
}
