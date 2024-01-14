import Carousel from 'nuka-carousel';
import PropTypes from 'prop-types';

/**
 * Component to display a carousel with custom slides.
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the carousel.
 * @param {Array} props.items - An array of items to be displayed in the carousel.
 * @param {React.Component} props.SlideComponent - The component used as a slide in the carousel.
 * @returns {JSX.Element} - The rendered component.
 */
export default function WhatsNextCarousel({ title, items, SlideComponent }) {
  return (
    <div className="summary-carousel">
      <h2>{title}</h2>
      <Carousel autoplay autoplayInterval={5000} wrapAround pauseOnHover>
        {items.map(i => (
          <SlideComponent key={i.id} data={i} />
        ))}
      </Carousel>
    </div>
  );
}

WhatsNextCarousel.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  SlideComponent: PropTypes.elementType.isRequired
};
