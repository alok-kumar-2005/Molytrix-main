import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Building, Phone } from "lucide-react";
import back from "../img/back.jpeg";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const RegisterPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [interests, setInterests] = useState([]);

  const serviceInterests = [
    {
      id: "automotive",
      name: "Automotive Lubricants",
      description: "Engine oils, transmission fluids, brake fluids",
    },
    {
      id: "industrial",
      name: "Industrial Solutions",
      description: "Hydraulic fluids, gear oils, cutting oils",
    },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Min 6 characters";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm your password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (formData.phone && !/^\+?[\d\s-()]+$/.test(formData.phone))
      newErrors.phone = "Enter a valid phone";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const res = await fetch(`${backendURL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors({ email: data.message || "Registration failed" });
        return;
      }
      onLogin(formData);
      alert("Registration successful!");
    } catch (err) {
      setErrors({ email: "Server error" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleInterestChange = (id) => {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 ">
      {/* Left side image only visible on md+ */}
      <div
        className="hidden md:block w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${back})` }}
      ></div>

      <div className="flex items-center justify-center w-full md:w-[88%] ml-0 px-2 sm:px-4 lg:px-6 py-12">

        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-500 font-medium hover:underline">
                sign in to your existing account
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {["name", "email", "company", "phone"].map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {field === "name"
                      ? "Full Name *"
                      : field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {
                        {
                          name: <User />,
                          email: <Mail />,
                          company: <Building />,
                          phone: <Phone />,
                        }[field]
                      }
                    </div>
                    <input
                      id={field}
                      name={field}
                      type={field === "email" ? "email" : "text"}
                      value={formData[field]}
                      onChange={handleChange}
                      required={field === "name" || field === "email"}
                      className={`w-full pl-10 pr-3 py-2 border ${
                        errors[field] ? "border-red-300" : "border-gray-300"
                      } rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      placeholder={`Enter your ${field}`}
                    />
                  </div>
                  {errors[field] && (
                    <p className="text-sm text-red-600 mt-1">{errors[field]}</p>
                  )}
                </div>
              ))}

              {/* Interests */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Service Interests (Optional)
                </label>
                <div className="space-y-3">
                  {serviceInterests.map(({ id, name, description }) => (
                    <div key={id} className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id={id}
                        checked={interests.includes(id)}
                        onChange={() => handleInterestChange(id)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <div>
                        <label
                          htmlFor={id}
                          className="text-sm font-medium text-gray-900"
                        >
                          {name}
                        </label>
                        <p className="text-xs text-gray-600">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Password Fields */}
              {["password", "confirmPassword"].map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {field === "password" ? "Password *" : "Confirm Password *"}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id={field}
                      name={field}
                      type={
                        (
                          field === "password"
                            ? showPassword
                            : showConfirmPassword
                        )
                          ? "text"
                          : "password"
                      }
                      value={formData[field]}
                      onChange={handleChange}
                      required
                      className={`w-full pl-10 pr-10 py-2 border ${
                        errors[field] ? "border-red-300" : "border-gray-300"
                      } rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      placeholder={`Enter your ${
                        field === "password" ? "password" : "confirmation"
                      }`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() =>
                          field === "password"
                            ? setShowPassword(!showPassword)
                            : setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {(
                          field === "password"
                            ? showPassword
                            : showConfirmPassword
                        ) ? (
                          <EyeOff />
                        ) : (
                          <Eye />
                        )}
                      </button>
                    </div>
                  </div>
                  {errors[field] && (
                    <p className="text-sm text-red-600 mt-1">{errors[field]}</p>
                  )}
                </div>
              ))}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#335676] hover:bg-[#1a61a3] focus:ring-2 focus:ring-blue-500"
                }`}
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
