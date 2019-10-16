
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          body: {

          },
          head: {
            errorCode: 60204,
            message: 'Account and password are incorrect.'
          }
        }
      }

      return {
        body: {
          depId: "1",
          depName: "金财互联",
          depPathUrl: "金财互联",
          guid: "c9af8dfcecb645f2aa450d53e78c020c",
          insId: "1",
          phone: "13760749780",
          token: "46dcec3f740243d1aed0c6d5e4eff6c41000100610b2d23371ccd37c",
          userId: "199480887871430659",
          userName: "李强"
        },
        head: {
          errorCode: '0',
          gtime: 77,
          requestId: "2c3b44751ae520bcfe56a7b782cb548b",
          time: 68,
          timestamp: 1570765118449
        }
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          body: {
          },
          head: {
            errorCode: 50008,
            message: 'Login failed, unable to get user details.'
          }
        }
      }

      return {
        body: {},
        head: {
          errorCode: 20000,
          data: info
        }
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        body: {},
        head: {
          errorCode: 20000,
          data: 'success'
        }
      }
    }
  }
]
