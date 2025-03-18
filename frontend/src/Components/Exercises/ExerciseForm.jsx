import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ExerciseForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    image: null,
    urlVido: "",
    niveauDifficult: "",
    partieCorps: "",
    partieCorpsPic: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
        if (formData[key]) {
            data.append(key, formData[key]);
        }
    });

    try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/exercises", { // Uses Vite proxy
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`, // Do NOT set Content-Type
            },
            body: data, // Browser will auto-set Content-Type for FormData
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to create exercise");
        }

        alert("Exercise created successfully!");
        navigate("/admin/exercises");

    } catch (error) {
        console.error("Error submitting form:", error);
        setError(error.message);
    } finally {
        setLoading(false);
    }
};



  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create New Exercise</h2>
      {error && <div className="bg-red-100 p-3 mb-4 text-red-700">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name:</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block mb-1">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            rows="4"
          ></textarea>
        </div>
        
        <div>
          <label className="block mb-1">Video URL:</label>
          <input
            type="text"
            name="urlVido"
            value={formData.urlVido}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block mb-1">Difficulty Level:</label>
          <select
            name="niveauDifficult"
            value={formData.niveauDifficult}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select Difficulty</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        
        <div>
          <label className="block mb-1">Body Part:</label>
          <select
            name="partieCorps"
            value={formData.partieCorps}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select Body Part</option>
            <option value="Arms">Arms</option>
            <option value="Legs">Legs</option>
            <option value="Chest">Chest</option>
            <option value="Back">Back</option>
            <option value="Shoulders">Shoulders</option>
            <option value="Core">Core</option>
            <option value="Full Body">Full Body</option>
          </select>
        </div>
        
        <div>
          <label className="block mb-1">Exercise Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block mb-1">Body Part Reference Image:</label>
          <input
            type="file"
            name="partieCorpsPic"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Exercise"}
        </button>
      </form>
    </div>
  );
};

export default ExerciseForm;