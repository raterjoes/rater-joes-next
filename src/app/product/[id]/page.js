import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import RedirectToMain from './RedirectToMain';

// This function runs on the server
export async function generateMetadata({ params }) {
  try {
    const docRef = doc(db, "products", params.id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return {
        title: 'Product Not Found',
        description: 'The requested product could not be found.'
      };
    }

    const product = { id: docSnap.id, ...docSnap.data() };
    const imageUrl = product.images?.[0] || product.image || '';
    const url = `https://rater-joes-next.vercel.app/product/${params.id}`;

    return {
      title: product.name,
      description: product.description || `Check out ${product.name} at Rater Joe's`,
      openGraph: {
        title: product.name,
        description: product.description || `Check out ${product.name} at Rater Joe's`,
        images: imageUrl ? [{ url: imageUrl }] : [],
        type: 'website',
        url,
      },
      twitter: {
        card: 'summary_large_image',
        title: product.name,
        description: product.description || `Check out ${product.name} at Rater Joe's`,
        images: imageUrl ? [imageUrl] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Product',
      description: 'Product details'
    };
  }
}

// This function runs on the server
export async function generateStaticParams() {
  // This would ideally fetch all product IDs from Firestore
  // For now, we'll return an empty array and rely on dynamic rendering
  return [];
}

export default async function ProductPage({ params }) {
  try {
    const docRef = doc(db, "products", params.id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      notFound();
    }

    const product = { id: docSnap.id, ...docSnap.data() };

    return (
      <>
        <RedirectToMain id={params.id} />
        <div className="min-h-screen bg-white">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  {product.newUntil && new Date() < new Date(product.newUntil) && (
                    <div className="mb-2">
                      <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full shadow-sm bg-pink-100 text-pink-700">
                        🆕 New
                      </span>
                    </div>
                  )}
                  {product.name}
                </h1>
                <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                  {product.category}
                </p>
                
                {product.seasonal && product.season && (() => {
                  const seasonStyles = {
                    Winter: { emoji: "❄️", bg: "bg-blue-100", text: "text-blue-700" },
                    Spring: { emoji: "🌱", bg: "bg-green-100", text: "text-green-700" },
                    Summer: { emoji: "☀️", bg: "bg-yellow-100", text: "text-yellow-700" },
                    Fall: { emoji: "🍂", bg: "bg-orange-100", text: "text-orange-700" },
                  };
                  const style = seasonStyles[product.season] || {};
                  return (
                    <div className="mb-2">
                      <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full shadow-sm ${style.bg} ${style.text}`}>
                        {style.emoji} Limited time: {product.season}
                      </span>
                    </div>
                  );
                })()}
                
                <p className="text-gray-700 mb-4">
                  {product.description}
                </p>
              </div>

              <div className="overflow-hidden rounded-lg shadow">
                {product.images && product.images.length > 0 ? (
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                ) : product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Reviews</h2>
              <p className="text-gray-600">
                Reviews and ratings will be loaded client-side for real-time updates.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound();
  }
} 