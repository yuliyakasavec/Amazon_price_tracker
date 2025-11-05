export async function scrapeProduct(productId: string) {
  try {
    const testData = {
      title: `Amazon Product ${productId}`,
      images: ['https://m.media-amazon.com/images/I/61Y30DpqRVL.jpg'],
      rating: 5,
      price_buybox: 1250.99,
      reviews_count: 195,
    };

    const {
      title = 'Unknown Product',
      images = ['/placeholder-image.jpg'],
      rating = 0,
      price_buybox = 0,
      reviews_count = 0,
    } = testData;

    if (!title) {
      throw new Error('Product title is required');
    }

    return {
      title,
      img: images[0],
      price: price_buybox * 100,
      reviewsCount: reviews_count,
      reviewsAverageRating: rating,
      amazonId: productId,
    };
  } catch (error) {
    console.error('❌ Error adding product:', error);
    throw new Error(`Failed to add product: ${error.message}`);
  }
}
