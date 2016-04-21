/**
 * mongodb配置文件
 */
module.exports = {
  uri: 'mongodb://localhost/kickoffexpress',
  options: {
    server: {
      socketOptions: {
        keepAlive: 1
      }
    }
  }
};