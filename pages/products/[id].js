import Head from 'next/head';
import { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export async function getServerSideProps(context) {
  const { id } = context.params;
  let product = null;
  try {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      // Convert Firestore Timestamp fields to ISO strings
      for (const key in data) {
        if (data[key] && typeof data[key] === 'object' && data[key].toDate) {
          data[key] = data[key].toDate().toISOString();
        }
      }
      product = { id: docSnap.id, ...data };
    }
  } catch (e) {
    // ignore
  }
  return {
    props: {
      product: product || null,
      id,
    },
  };
}

export default function ProductSSRPage({ product, id }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = `https://rater-joes.vercel.app/products/${id}`;
    }, 4000);
    return () => clearTimeout(timer);
  }, [id]);

  if (!product) {
    return <div className="text-center mt-10">Product not found.</div>;
  }

  const imageUrl = product.images?.[0] || product.image || '';
  const description = product.description || `Check out ${product.name} at Rater Joe's`;
  const url = `https://rater-joes-next.vercel.app/products/${id}`;

  return (
    <>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.name} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
      </Head>
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">{product.category}</p>
              <p className="text-gray-700 mb-4">{product.description}</p>
            </div>
            <div className="overflow-hidden rounded-lg shadow">
              {imageUrl ? (
                <img src={imageUrl} alt={product.name} className="w-full h-64 object-cover" />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            <p className="text-gray-600">Reviews and ratings will be loaded client-side for real-time updates.</p>
          </div>
        </div>
      </div>
    </>
  );
} 