import { story } from '../data/story'

function Story() {
  return (
    <section
      id="story"
      className="relative py-24 px-6 bg-cover bg-center"
      style={{ backgroundImage: "url('/firstbg.png')" }}
    >
      <div className="absolute inset-0 bg-white/12 pointer-events-none" />
      <div className="relative max-w-2xl mx-auto">
        <h2 className="text-3xl mb-10 text-center">{story.title}</h2>

        <p className="text-xl text-[#3b342d] font-heading italic text-center mb-10">
          {story.quote}
        </p>

        <div className="space-y-6 text-[#7a7268] leading-relaxed text-center">
          {story.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <p className="mt-10 text-xl text-[#d6b26e] font-heading italic text-center">
          {story.closing}
        </p>
      </div>
    </section>
  )
}

export default Story
