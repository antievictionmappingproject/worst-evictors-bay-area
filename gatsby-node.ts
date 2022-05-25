import type { GatsbyNode } from "gatsby"

export const createPages: GatsbyNode["createPages"] = ({
  graphql,
  actions,
}) => {
  const { createRedirect } = actions //actions is collection of many actions - https://www.gatsbyjs.org/docs/actions
  createRedirect({
    fromPath: "/evictors-list",
    toPath: "/evictors-list/citywide",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/evictors-list/rtc",
    toPath: "/evictors-list/citywide",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/evictors-list/citywide",
    toPath: "/list",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/rights",
    toPath: "/#rights",
    isPermanent: true,
  })
}
