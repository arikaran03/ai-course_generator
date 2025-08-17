import React, { useState } from 'react';

const MCQBlock = ({ question, options, answer }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const getOptionClassName = (index) => {
    if (!isSubmitted) return 'mcq-option';
    if (index === answer) return 'mcq-option correct';
    if (index === selectedOption) return 'mcq-option incorrect';
    return 'mcq-option';
  };

  return (
    <div className="mcq-block-container">
      <h4 className="mcq-question">{question}</h4>
      <form onSubmit={handleSubmit}>
        {options.map((option, index) => (
          <div key={index} className={getOptionClassName(index)}>
            <label>
              <input
                type="radio"
                name="mcq"
                value={index}
                onChange={() => setSelectedOption(index)}
                disabled={isSubmitted}
              />
              {option}
            </label>
          </div>
        ))}
        {!isSubmitted && (
          <button type="submit" className="mcq-submit-button" disabled={selectedOption === null}>
            Check Answer
          </button>
        )}
      </form>
    </div>
  );
};
                       
export default MCQBlock;