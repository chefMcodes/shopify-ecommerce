export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
        Get in Touch
      </h1>

      <p className="text-gray-700 text-lg mb-6 text-center">
        Have feedback or just want to say hello? I’d love to hear from you! This
        project is a personal e-commerce build to practice and showcase my
        development skills.
      </p>

      <div className="space-y-4 text-center">
        <p className="text-gray-600">
          📩 <span className="font-medium">Email:</span>{' '}
          <a
            href="mailto:mustaphabakare2@gmail.com"
            className="text-blue-600 hover:underline"
          >
            mustaphabakare2@gmail.com
          </a>
        </p>
        {/* <p className="text-gray-600">
          💼 <span className="font-medium">LinkedIn:</span>{' '}
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            linkedin.com/in/yourprofile
          </a>
        </p> */}
        <p className="text-gray-600">
          🧑‍💻 <span className="font-medium">GitHub:</span>{' '}
          <a
            href="https://github.com/chefMcodes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            github.com/chefMcodes
          </a>
        </p>
      </div>

      <p className="mt-10 text-center text-sm text-gray-500 italic">
        Your feedback is always appreciated — it helps me grow and improve!
      </p>
    </div>
  );
}
