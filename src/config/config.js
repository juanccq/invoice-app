const config = {
  development: {
    uploadDir: 'public/uploads'
  },
  production: {
    uploadDir: 'public/uploads'
  }
};

export default config[process.env.NODE_ENV || 'production'];