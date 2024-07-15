import React from 'react';

interface Step3Props {
  formData: { interests: string };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prevStep: () => void;
}

const Step3: React.FC<Step3Props> = ({ formData, handleInputChange, prevStep }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Step 3: Additional Information</h2>
      <input
        type="text"
        name="interests"
        value={formData.interests}
        onChange={handleInputChange}
        placeholder="Interests"
        className="w-full p-2 mb-4 border rounded"
      />
      <div className="flex justify-between">
        <button onClick={prevStep} className="bg-gray-300 text-black px-4 py-2 rounded">
          Previous
        </button>
        <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Step3;