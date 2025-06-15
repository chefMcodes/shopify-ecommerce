export default function About() {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-20 max-w-4xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
        About This Project
      </h1>

      <p className="text-gray-700 text-lg mb-6 leading-relaxed text-center">
        Welcome to my personal e-commerce practice project! This site is
        designed and built from scratch to demonstrate my skills in frontend
        development and user experience.
      </p>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">🚀 Tech Stack</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>React with Vite</li>
          <li>Tailwind CSS for styling</li>
          <li>React Router for navigation</li>
          <li>Firebase for authentication and data storage</li>
          <li>Context API for global cart and wishlist management</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-3">👨‍💻 Purpose</h2>
        <p className="text-gray-700 leading-relaxed">
          This project is not a live store. it's a way for me to learn and
          demonstrate my front-end development abilities. I plan to add more
          features like checkout integration, responsive design for all devices,
          and animations to enhance the experience.
        </p>
      </div>

      <p className="mt-10 text-center text-sm text-gray-500 italic">
        Thanks for visiting! Feel free to explore other pages to see the
        functionality in action.
      </p>
    </div>
  );
}
