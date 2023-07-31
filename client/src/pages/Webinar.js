import Title from "../components/Title";
import Footer from "../components/footers/Footer";

const Webinar = () => {
  return (
    <div className="contactUs">
      <div className="contactUs-container">
        <Title title="The Hacker News | Cybersecurity Webinars" />
        <div className="contactUs-list">
          <p>
            Our webinars cover a wide range of cybersecurity topics, including
            cloud security, network security, incident response, compliance, and
            more. Each webinar is led by a cybersecurity expert with years of
            experience in the field, ensuring that you receive top-quality,
            up-to-date information and insights.
          </p>

          <p>
            Check out our upcoming and recent cybersecurity webinars and take
            the first step towards protecting your business from cyber threats.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Webinar;
