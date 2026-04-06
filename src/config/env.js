export const config = {
  API_URL: import.meta.env.VITE_API_URL,
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  CLOUDINARY_UPLOAD_PRESET: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_UPLOAD_URL: import.meta.env.VITE_CLOUDINARY_UPLOAD_URL,
  DEMO_URL: import.meta.env.VITE_DEMO_URL,
  KITTY_URL: import.meta.env.VITE_HELLO_KITTY_URL
};

Object.entries(config).forEach(([key, value]) => {
  if (!value) throw new Error(`❌ Missing env variable: ${key}`);
});