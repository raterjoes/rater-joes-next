import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Rater Joe's - Next.js Migration
        </h1>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-3">
            🚀 Rich Preview Migration
          </h2>
          <p className="text-blue-700 mb-4">
            This Next.js app provides server-side rendering for rich previews when sharing product and recipe links on social media platforms like WhatsApp, Facebook, and Twitter.
          </p>
          <p className="text-blue-700">
            The main app continues to run on Vite for optimal development experience, while this Next.js version handles the dynamic pages that need SEO and rich previews.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              📱 Product Pages
            </h3>
            <p className="text-gray-600 mb-4">
              Dynamic product pages with server-side rendering for rich previews.
            </p>
            <div className="text-sm text-gray-500">
              <p>Example: <code className="bg-gray-100 px-2 py-1 rounded">/product/[product-id]</code></p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              🍳 Recipe Pages
            </h3>
            <p className="text-gray-600 mb-4">
              Dynamic recipe pages with server-side rendering for rich previews.
            </p>
            <div className="text-sm text-gray-500">
              <p>Example: <code className="bg-gray-100 px-2 py-1 rounded">/recipe/[recipe-id]</code></p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            🔗 How to Use
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Deploy this Next.js app to Vercel</li>
            <li>Update your main app's product/recipe links to point to this Next.js app</li>
            <li>When users share links, they'll get rich previews with images and descriptions</li>
            <li>Keep your main Vite app for all other functionality</li>
          </ol>
        </div>

        <div className="mt-8 text-center">
          <a 
            href="http://localhost:5174" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            🏠 Go to Main App (Vite)
          </a>
        </div>
      </div>
    </div>
  );
}
