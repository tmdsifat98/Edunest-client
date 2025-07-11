import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import axios from "axios";
import useUserRole from "../../hooks/useUserRole";
import LoadingSpinner from "../../Components/LoadingSpinner";

const MyProfile = () => {
  const { user } = useAuth();
  const { role } = useUserRole();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => {
          setProfileData(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch user profile:", err);
        });
    }
  }, [user, axiosSecure]);

  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    photoURL: user?.photoURL || "",
    phone: user?.phone || "",
  });

  // Image upload handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataImage = new FormData();
    formDataImage.append("image", file);

    setLoading(true);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`,
        formDataImage
      );

      if (res.data.success) {
        const uploadedURL = res.data.data.display_url;
        // শুধু এখানেই formData.photoURL আপডেট করো
        setFormData((prev) => ({ ...prev, photoURL: uploadedURL }));
      }
    } catch (err) {
      console.error("Image Upload Failed:", err);
      Swal.fire("Error", "Image upload failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await updateProfile(user, {
        displayName: formData.name,
        photoURL: formData.photoURL,
      });

      await axiosSecure.patch(`/users/${user.email}`, {
        name: formData.name,
        photoURL: formData.photoURL,
        phone: formData.phone,
      });

      Swal.fire("Updated!", "Profile has been updated.", "success");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update profile.", "error");
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.displayName || "",
      photoURL: user?.photoURL || "",
      phone: user?.phone || "",
    });
    setIsEditing(false);
  };

  if (!profileData) return <LoadingSpinner />;
  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg max-w-md w-full border border-base-300">
        <div className="flex flex-col items-center text-center">
          {isEditing || (
            <img
              src={formData.photoURL || "/default-avatar.png"}
              alt="User"
              className="w-28 h-28 rounded-full object-cover border-4 border-primary mb-4"
            />
          )}
          {isEditing ? (
            <div className="flex justify-center mb-2 items-center">
              <div
                className="relative w-24 h-24 tooltip"
                data-tip="Upload image"
              >
                {loading ? (
                  <div className="w-28 h-28 rounded-full border-4 border-dashed border-gray-400 animate-spin"></div>
                ) : (
                  <div className="relative mt-10">
                    <div className="w-28 h-28 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-dashed border-gray-400 animate-spin"></div>
                    <img
                      src={formData.photoURL || "/default-avatar.png"}
                      alt="Profile"
                      className="w-24 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-24 object-cover rounded-full"
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
          ) : (
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              {formData.name}
            </h2>
          )}
          <p className="text-sm text-gray-500 dark:text-gray-300">
            {role === "student"
              ? "Student"
              : role === "teacher"
              ? "Teacher"
              : "Admin"}
          </p>
        </div>

        <div className="mt-6 space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <div>
            <span className="font-semibold">Email:</span> {user?.email}
          </div>

          <div>
            <span className="font-semibold">Name:</span>{" "}
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full mt-1 dark:bg-gray-700"
              />
            ) : (
              formData.name
            )}
          </div>

          <div>
            <span className="font-semibold">Phone:</span>{" "}
            {isEditing ? (
              <input
                type="text"
                name="phone"
                defaultValue={profileData.phone}
                onChange={handleChange}
                className="input input-bordered w-full mt-1 dark:bg-gray-700"
              />
            ) : (
              profileData.phone || "No phone number provided"
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-between gap-2">
          {isEditing ? (
            <div className="flex items-center gap-3 justify-between">
              <button
                onClick={handleSubmit}
                className="btn btn-primary text-black"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="btn btn-secondary btn-outline"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-primary w-full"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
