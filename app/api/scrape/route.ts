import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(request: Request) {
  try {
    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const scraperUrl = `http://api.scraperapi.com?api_key=${process.env.SCRAPER_API_KEY}&url=https://www.amazon.pl/dp/${productId}&render=true`;

    const response = await fetch(scraperUrl);

    if (!response.ok) {
      throw new Error(`ScraperAPI error: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Извлекаем данные с помощью Cheerio
    const productData = {
      title: $('#productTitle').text().trim(),
      price_buybox: parsePrice(
        $('.a-price-whole').first().text() || $('.a-offscreen').first().text()
      ),
      rating: parseRating($('.a-icon-alt').first().text()),
      reviews_count: parseReviewsCount($('#acrCustomerReviewText').text()),
      images: [$('#landingImage').attr('src')].filter(Boolean) as string[],
    };

    return NextResponse.json({
      success: true,
      results: [
        {
          content: {
            results: productData,
          },
        },
      ],
    });
  } catch (error) {
    console.error('Scraping error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to scrape product data' },
      { status: 500 }
    );
  }
}

// Вспомогательные функции
function parsePrice(priceText: string): number {
  if (!priceText) return 0;
  const priceMatch = priceText.replace(/[^\d,]/g, '').replace(',', '.');
  return parseFloat(priceMatch) || 0;
}

function parseRating(ratingText: string): number {
  if (!ratingText) return 0;
  const ratingMatch = ratingText.match(/(\d+[.,]\d+)/);
  return ratingMatch ? parseFloat(ratingMatch[1].replace(',', '.')) : 0;
}

function parseReviewsCount(reviewsText: string): number {
  if (!reviewsText) return 0;
  const reviewsMatch = reviewsText.match(/\d+/);
  return reviewsMatch ? parseInt(reviewsMatch[0]) : 0;
}
