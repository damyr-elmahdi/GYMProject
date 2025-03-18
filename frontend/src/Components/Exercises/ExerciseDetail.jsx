import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const ExerciseDetail = () => {
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExerciseDetails = async () => {
      try {
        const response = await fetch(`/api/exercises/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch exercise details");
        }

        const data = await response.json();
        setExercise(data);

        // Check if exercise is in favorites
        const favResponse = await fetch("/api/favorites", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (favResponse.ok) {
          const favorites = await favResponse.json();
          setIsFavorite(favorites.some(fav => fav._id === id));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExerciseDetails();
  }, [id]);

  const toggleFavorite = async () => {
    try {
      const response = await fetch(`/api/favorites/${id}`, {
        method: isFavorite ? "DELETE" : "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(isFavorite ? "Failed to remove from favorites" : "Failed to add to favorites");
      }

      setIsFavorite(!isFavorite);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading exercise details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        Error: {error}
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-lg">
        Exercise not found.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-4">
        <Link
          to="/client/exercises"
          className="text-blue-500 hover:text-blue-700 flex items-center"
        >
          <i className="ri-arrow-left-line mr-1"></i> Back to Exercises
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              className="w-full h-64 md:h-full object-cover"
              src={exercise.imageUrl || "https://via.placeholder.com/600x400?text=No+Image"}
              alt={exercise.name}
            />
          </div>
          <div className="p-6 md:w-1/2">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-800">{exercise.name}</h1>
              <button
                onClick={toggleFavorite}
                className="bg-white p-2 rounded-full shadow-md"
              >
                <i className={`ri-heart-${isFavorite ? 'fill text-red-500' : 'line text-gray-500'} text-2xl`}></i>
              </button>
            </div>
            
            <div className="mt-4 space-y-4">
              <div>
                <span className={`inline-block text-sm font-medium px-3 py-1 rounded ${
                  exercise.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                  exercise.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {exercise.difficulty}
                </span>
                <span className="ml-2 text-gray-600">
                  <i className="ri-time-line mr-1"></i> {exercise.duration || 'N/A'}
                </span>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Target Muscles</h3>
                <p className="text-gray-600">{exercise.targetMuscles}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Equipment Required</h3>
                <p className="text-gray-600">{exercise.equipment || 'None'}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Description</h3>
                <p className="text-gray-600">{exercise.description}</p>
              </div>
              
              {exercise.videoUrl && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Instruction Video</h3>
                  <div className="relative pt-56.25 mt-2">
                    <iframe
                      className="absolute inset-0 w-full h-full rounded"
                      src={exercise.videoUrl}
                      title={`${exercise.name} video`}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetail;