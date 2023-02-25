export type TRating = {
  rating?: number;
  setRating?: (rating: number) => void;
  hideRatingCount?: boolean;
};

export type TStarIcon = {
  percentage: number;
  $clickable?: boolean;
};
