import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export function EditUserPage() {
  const { user } = useAuth();
  const nav = useNavigate();

  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [gradYear, setGradYear] = useState<number | "">(user?.gradYear ?? "");
  const [currentPassword, setCurrentPassword] = useState("");

  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>(
    user?.dietaryRestrictions ?? [],
  );
  const [customDietary, setCustomDietary] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const dietaryOptions = [
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Nut-Free",
    "Halal",
    "Kosher",
    "Other",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    // If email changed, require current password
    if (email !== user?.email && !currentPassword) {
      setError("Current password is required to change email");
      setLoading(false);
      return;
    }

    const finalDietary = customDietary
      ? [...dietaryRestrictions.filter((d) => d !== "Other"), customDietary]
      : dietaryRestrictions;

    try {
      await axios.patch(
        "/updateUser",
        {
          firstName,
          lastName,
          email,
          currentPassword: email !== user?.email ? currentPassword : null,
          gradYear: gradYear === "" ? null : Number(gradYear),
          dietaryRestrictions: finalDietary,
        },
        { withCredentials: true },
      );

      setSuccess(true);
      nav(0);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 max-w-md">
      <h1 className="text-3xl font-semibold">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">Profile updated!</p>}

        <input
          className="p-2 border rounded"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          className="p-2 border rounded"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          className="p-2 border rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {email !== user?.email && (
          <input
            className="p-2 border rounded"
            type="password"
            placeholder="Current password (required to change email)"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        )}

        <input
          className="p-2 border rounded"
          type="number"
          placeholder="Graduation Year"
          value={gradYear}
          onChange={(e) =>
            setGradYear(e.target.value === "" ? "" : Number(e.target.value))
          }
        />

        <div className="flex flex-col gap-2">
          <p className="font-medium">Dietary Restrictions</p>

          {dietaryOptions.map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={dietaryRestrictions.includes(option)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setDietaryRestrictions([...dietaryRestrictions, option]);
                  } else {
                    setDietaryRestrictions(
                      dietaryRestrictions.filter((d) => d !== option),
                    );
                  }
                }}
              />
              {option}
            </label>
          ))}

          {dietaryRestrictions.includes("Other") && (
            <input
              className="p-2 border rounded"
              placeholder="Specify other dietary restriction"
              value={customDietary}
              onChange={(e) => setCustomDietary(e.target.value)}
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
