import Catalog from './components/Catalog';

export default function Page() {
    return (
        <main className="min-h-screen bg-gray-50 p-6">
            <div className='max-w-6xl mx-auto'>
                <header className='mb-6'>
                    <h1 className='text-3xl font-bold'>Mini StoreFront</h1>
                    <p className='text-gray-600'>Browse products to add to cart and watch stock change over time.</p>
                </header>
                <Catalog />

            </div>
        </main>
    );
}