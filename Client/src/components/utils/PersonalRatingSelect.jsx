import { ratings } from "./FormFields";

export const PersonalRatingSelect = props => {
  const personalRating = props.personalRating;
  const setPersonalRating = props.setPersonalRating;
  const pRatingSelectColors = personalRating => {
    return personalRating != ratings[0]
      ? Object.values(pRatingColors)[pRatingToNum(personalRating) - 1]
      : { background: '#e8e7e7', font: 'black' };
  };

  return (
    <select
      style={{
        backgroundColor: pRatingSelectColors.background,
        color: pRatingSelectColors.font
      }}
      value={personalRating}
      onChange={e => setPersonalRating(e.target.value)}
    >
      {ratings.map((rating, index) => (
        <option key={index} value={rating}>
          {rating}
        </option>
      ))}
    </select>
  );
};
