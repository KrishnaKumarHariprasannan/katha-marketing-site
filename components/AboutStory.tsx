// The About story: a lead line followed by the full description. Rendered
// without a card so it can sit beside the artwork on the About page.
export default function AboutStory() {
  return (
    <div className="about__copy">
      <h2 className="about__lead">
        We translate complex, meaningful work into communication that informs,
        engages, and drives action.
      </h2>

      <div className="about__body">
        <p>
          Katha is an impact communications studio that helps brands,
          organisations, and movements say what they mean and say it like they
          mean it. Our work blends strategy, data, creativity, and cultural
          insight to create communication that resonates, engages, and drives
          measurable impact.
        </p>
        <p>
          Whether you’re launching, scaling, or reimagining your voice, we
          partner with you to turn ideas into meaningful, memorable
          communication.
        </p>
      </div>
    </div>
  );
}
