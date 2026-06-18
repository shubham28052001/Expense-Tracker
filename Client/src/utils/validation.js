// utils/validation.js
  const emailRegex = /\S+@\S+\.\S+/;
export const validateRegister = (user) => {
  const errors = {};
  const { fullName, email, password } = user;

  // Full Name
  if (!fullName.trim()) {
    errors.fullName = "Full name is required";
  } else if (fullName.trim().length < 3) {
    errors.fullName = "Name must be at least 3 characters";
  }

  // Email
  if (!email.trim()) {
    errors.email = "Email is required";
  } else {
    if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email";
    }
  }

  // Password
  if (!password.trim()) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

export const validateLogin = (user) => {
  const errors = {};
  const { email, password } = user;

    // Email
    if (!email.trim()) {
    errors.email = "Email is required";
  } else {
    if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email";
    }
  }

  // Password
  if (!password.trim()) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
}