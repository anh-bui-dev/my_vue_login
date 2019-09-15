module.exports = {
  pages: {
    'index': {
      entry: './src/pages/home/main.js',
      template: 'public/index.html',
      title: 'Home',
      chunks: [ 'chunk-vendors', 'chunk-common', 'index' ]
    },
    'login': {
      entry: './src/pages/login/main.js',
      template: 'public/index.html',
      title: 'Sign In',
      chunks: [ 'chunk-vendors', 'chunk-common', 'login' ]
    },
    'reset_password': {
      entry: './src/pages/reset_password/main.js',
      template: 'public/index.html',
      title: 'New Password',
      chunks: [ 'chunk-vendors', 'chunk-common', 'reset_password' ]
    },
  }
}