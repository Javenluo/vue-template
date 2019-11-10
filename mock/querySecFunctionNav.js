
export default [
  // user login
  {
    url: '/back/functionService/querySecFunctionNav',
    type: 'post',
    response: config => {
      const mock = {
        head: {
          requestId: "92A4363285352472AB90613142535080",
          errorCode: "0",
          timestamp: 1572584065973,
          time: 49,
          gtime: 116
        },
        body: [{
          code: "/org-manage/project-manager",
          functioinId: "283eec11ad9a4a6a8d4fa7f2051f7007",
          functionType: "desk",
          imageUrl: "iconfont fsicon-weibiaoti25",
          name: "v-1级菜单",
          parentId: "1",
          subNodeFlag: "0",
          url: "/one-leve-menu"
        }, {
          functioinId: "5bc0b657fc9a4e02af66d713c1a19ad4",
          name: "v-配置管理",
          code: "/org-manage",
          functionType: "dest",
          url: "/org-manage",
          parentId: "1",
          imageUrl: "fsicon-shezhi",
          subNodeFlag: "1",
          childSecFunctioinDTOs: [{
            functioinId: "4175e7428ce7408288c24b80689be30f",
            name: "菜单管理",
            code: "/org-manage/project-manager",
            functionType: "menu",
            url: "user-dep-manager",
            parentId: "5bc0b657fc9a4e02af66d713c1a19ad4",
            subNodeFlag: "1",
            childSecFunctioinDTOs: [{
              functioinId: "4175e7428ce7408288c24b80689be30f",
              name: "菜单管理1",
              code: "/org-manage/project-manager",
              functionType: "menu",
              url: "user-dep-manager1",
              parentId: "5bc0b657fc9a4e02af66d713c1a19ad4",
              subNodeFlag: "1",
              childSecFunctioinDTOs: [{
                functioinId: "4175e7428ce7408288c24b80689be30f",
                name: "菜单管理1-1",
                code: "/org-manage/project-manager",
                functionType: "menu",
                url: "user-dep-manager1-1",
                parentId: "5bc0b657fc9a4e02af66d713c1a19ad4",
                subNodeFlag: "0",
              }, {
                functioinId: "4175e7428ce7408288c24b80689be30f",
                name: "菜单管理1-2",
                code: "/org-manage/project-manager",
                functionType: "menu",
                url: "user-dep-manager2",
                parentId: "5bc0b657fc9a4e02af66d713c1a19ad4",
                subNodeFlag: "0",
              }]
            }, {
              functioinId: "4175e7428ce7408288c24b80689be30f",
              name: "菜单管理-2",
              code: "/org-manage/project-manager",
              functionType: "menu",
              url: "user-dep-manager2",
              parentId: "5bc0b657fc9a4e02af66d713c1a19ad4",
              subNodeFlag: "1",
              childSecFunctioinDTOs: [{
                functioinId: "4175e7428ce7408288c24b80689be30f",
                name: "菜单管理2-1",
                code: "/org-manage/project-manager",
                functionType: "menu",
                url: "user-dep-manager2-1",
                parentId: "5bc0b657fc9a4e02af66d713c1a19ad4",
                subNodeFlag: "0",
              }]
            }]
          }, {
            functioinId: "e71fc970852b4d9e9fad9ebe41da53cf",
            name: "机构管理",
            code: "/org-manage/project-manager",
            functionType: "menu",
            url: "org-manager",
            parentId: "5bc0b657fc9a4e02af66d713c1a19ad4",
            subNodeFlag: "0"
          }
          ]
        }, {
          functioinId: "5bc0b657fc9a4e02af66d713c1a19ad4",
          name: "v-配置管理2",
          code: "/org-manage",
          functionType: "menu",
          url: "/org-manage--2",
          parentId: "1",
          imageUrl: "fsicon-shezhi",
          subNodeFlag: "1",
          childSecFunctioinDTOs: [{
            functioinId: "4175e7428ce7408288c24b80689be30f",
            name: "菜单管理2",
            code: "/org-manage/project-manager",
            functionType: "menu",
            url: "user-dep-manager-1",
            parentId: "5bc0b657fc9a4e02af66d713c1a19ad4",
            imageUrl: "",
            subNodeFlag: "0"
          }, {
            functioinId: "e71fc970852b4d9e9fad9ebe41da53cf",
            name: "机构管理2",
            code: "/org-manage/project-manager",
            functionType: "menu",
            url: "org-manager-2",
            parentId: "5bc0b657fc9a4e02af66d713c1a19ad4",
            subNodeFlag: "0"
          }
          ]
        }]
      }
      return mock
    }
  }
]
