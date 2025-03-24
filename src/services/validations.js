export const EMAIL_VALIDATION = {
  required: "email is required",
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Invalid email format",
  },
};
export const NEW_PASSWORD_VALIDATION = {
  required: "Password is required",
  validate: (value) => {
    if (value.length < 6) return "Password must be at least 6 characters long.";
    if (!/[a-z]/.test(value))
      return "Password must include at least one lowercase letter.";
    if (!/[A-Z]/.test(value))
      return "Password must include at least one uppercase letter.";
    if (!/\d/.test(value)) return "Password must include at least one digit.";
    if (!/[\W_]/.test(value))
      return "Password must include at least one special character.";
    return true;
  },
};
export const USER_NAME_VALIDATION = {
  required: "The userName is required.",
  validate: (value) => {
    if (value.length < 4) return "Password must be at least 4 characters long.";
    if (value.length >8) return "Password must be at most 8 characters long.";
    if (/\s/.test(value))
      return "The userName must contain characters and end with numbers without spaces.";
    if (!/[A-Za-z]/.test(value))
      return "The userName must contain at least one letter.";
    if (!/\d$/.test(value))
      return "The userName must end with a number.";
    return true;
  },
};

