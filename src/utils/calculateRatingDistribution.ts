export function calculateRatingDistribution(reviews: { rating: number }[]) {
  const total = reviews.length;
  const counts: Record<1 | 2 | 3 | 4 | 5, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  reviews.forEach((review) => {
    const star = review.rating as 1 | 2 | 3 | 4 | 5;
    counts[star] += 1;
  });

  // Convert to percentages
  const percentages = Object.fromEntries(
    (Object.entries(counts) as [string, number][]).map(([star, count]) => [
      Number(star) as 1 | 2 | 3 | 4 | 5,
      total > 0 ? Math.round((count / total) * 100) : 0,
    ])
  ) as Record<1 | 2 | 3 | 4 | 5, number>;

  return percentages;
}
