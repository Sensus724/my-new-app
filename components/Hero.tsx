import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <img src="/logo.jpg" alt="Sensus Logo" className="hero-logo" />
        </div>

        <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full inline-block mb-6">
          <span className="text-sm font-medium">Tu espacio seguro</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Encuentra tu Calma
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white/90">
          Sensus es tu espacio seguro y personal para el manejo de la ansiedad.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/hamilton-test"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
          >
            Empieza Gratis
          </Link>
          <Link
            href="/anxiety-types"
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-purple-600"
          >
            Conoce Más
          </Link>
        </div>
      </div>
    </section>
  );
}
