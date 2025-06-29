"use client";
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import { useEffect } from "react";

// This function runs on the server
export async function generateMetadata({ params }) {
  try {
    const docRef = doc(db, "recipes", params.id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return {
        title: 'Recipe Not Found',
        description: 'The requested recipe could not be found.'
      };
    }

    const recipe = docSnap.data();
    const imageUrl = recipe.images?.[0] || '';

    return {
      title: recipe.title,
      description: recipe.description || `Check out this recipe: ${recipe.title}`,
      openGraph: {
        title: recipe.title,
        description: recipe.description || `Check out this recipe: ${recipe.title}`,
        images: imageUrl ? [{ url: imageUrl }] : [],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: recipe.title,
        description: recipe.description || `Check out this recipe: ${recipe.title}`,
        images: imageUrl ? [imageUrl] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Recipe',
      description: 'Recipe details'
    };
  }
}

// This function runs on the server
export async function generateStaticParams() {
  // This would ideally fetch all recipe IDs from Firestore
  // For now, we'll return an empty array and rely on dynamic rendering
  return [];
}

export default async function RecipePage({ params }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = `https://rater-joes.vercel.app/recipes/${params.id}`;
    }, 4000);
    return () => clearTimeout(timer);
  }, [params.id]);

  try {
    const docRef = doc(db, "recipes", params.id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      notFound();
    }

    const recipe = docSnap.data();

    return (
      <div className="min-h-screen bg-orange-50">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {recipe.title}
          </h1>

          {recipe.images && recipe.images.length > 0 && (
            <div className="mb-6">
              <img 
                src={recipe.images[0]} 
                alt={recipe.title}
                className="w-full max-w-2xl h-64 object-cover rounded-lg shadow"
              />
            </div>
          )}

          {recipe.description && (
            <div className="mb-6">
              <p className="text-gray-700 text-lg">
                {recipe.description}
              </p>
            </div>
          )}

          {recipe.ingredients && recipe.ingredients.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-3">Ingredients</h2>
              <ul className="list-disc list-inside space-y-1">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-700">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {recipe.instructions && recipe.instructions.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-3">Instructions</h2>
              <ol className="list-decimal list-inside space-y-2">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="text-gray-700">
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {recipe.cookTime && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-3">Cook Time</h2>
              <p className="text-gray-700">
                {recipe.cookTime} minutes
              </p>
            </div>
          )}

          {recipe.servings && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-3">Servings</h2>
              <p className="text-gray-700">
                {recipe.servings} servings
              </p>
            </div>
          )}

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            <p className="text-gray-600">
              Comments will be loaded client-side for real-time updates.
            </p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching recipe:', error);
    notFound();
  }
} 