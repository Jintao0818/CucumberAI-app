let baseUrl = ''

switch (process.env.ENVIRONMENT) {
  case 'development':
    baseUrl = 'http://47.100.80.240:9568' //开发环境(dev)
    // baseUrl = 'http://192.168.31.144:3333' //开发环境(dev)
    break
  case 'production':
    baseUrl = 'http://47.100.80.240:9568/' //生产环境(bulid)
    break
}

export default baseUrl