import { OnboardingData } from "@/lib/types";
import { useState } from "react";

const steps = ["Basic Info", "Education", "Final Details"];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<OnboardingData>({
    name: "",
    email: "",
    school: "",
    bio: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">{steps[step]}</h2>

      {step === 0 && (
        <>
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" />
        </>
      )}

      {step === 1 && (
        <>
          <input type="text" name="school" placeholder="School Name" value={formData.school} onChange={handleChange} className="w-full p-2 border rounded" />
        </>
      )}

      {step === 2 && (
        <>
          <textarea name="bio" placeholder="Tell us about yourself..." value={formData.bio} onChange={handleChange} className="w-full p-2 border rounded"></textarea>
          <p className="text-sm text-gray-500">Review your details before submitting.</p>
        </>
      )}

      <div className="mt-4 flex justify-between">
        {step > 0 && <button onClick={prevStep} className="px-4 py-2 bg-gray-300 rounded">Back</button>}
        {step < steps.length - 1 ? (
          <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
        ) : (
          <button onClick={() => alert("Onboarding Complete!")} className="px-4 py-2 bg-green-500 text-white rounded">Finish</button>
        )}
      </div>
    </div>
  );
}
