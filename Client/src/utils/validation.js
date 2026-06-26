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

export const validateAccountForm = (accountData, isEdit = false) => {
  const errors = {};

  const { name, type, initialBalance } = accountData;

  if (!name?.trim()) {
    errors.name = "Account name is required";
  } else if (name.trim().length < 3) {
    errors.name = "Account name must be at least 3 characters";
  }

  if (!type) {
    errors.type = "Account type is required";
  } else if (!["SAVING", "CURRENT"].includes(type)) {
    errors.type = "Invalid account type";
  }

  if (!isEdit) {
    if (initialBalance === "" ||initialBalance === null ||initialBalance === undefined) {
      errors.initialBalance = "Initial balance is required";
    } else if (Number(initialBalance) < 0) {
      errors.initialBalance = "Initial balance cannot be negative";
    }
  }

  return errors;
};