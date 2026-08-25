import meta from "../../../pages/_meta.ts";
import cases_meta from "../../../pages/cases/_meta.ts";
export const pageMap = [{
  data: meta
}, {
  name: "Approach",
  route: "/Approach",
  frontMatter: {
    "sidebarTitle": "Approach"
  }
}, {
  name: "cases",
  route: "/cases",
  children: [{
    data: cases_meta
  }, {
    name: "dbcjdx",
    route: "/cases/dbcjdx",
    frontMatter: {
      "sidebarTitle": "Dbcjdx"
    }
  }, {
    name: "dslr",
    route: "/cases/dslr",
    frontMatter: {
      "sidebarTitle": "Dslr"
    }
  }, {
    name: "nysb",
    route: "/cases/nysb",
    frontMatter: {
      "sidebarTitle": "Nysb"
    }
  }, {
    name: "szt",
    route: "/cases/szt",
    frontMatter: {
      "sidebarTitle": "Szt"
    }
  }, {
    name: "yyx",
    route: "/cases/yyx",
    frontMatter: {
      "sidebarTitle": "Yyx"
    }
  }, {
    name: "zgnd",
    route: "/cases/zgnd",
    frontMatter: {
      "sidebarTitle": "Zgnd"
    }
  }, {
    name: "zgtm",
    route: "/cases/zgtm",
    frontMatter: {
      "sidebarTitle": "Zgtm"
    }
  }]
}, {
  name: "Construction",
  route: "/Construction",
  frontMatter: {
    "sidebarTitle": "Construction"
  }
}, {
  name: "contact",
  route: "/contact",
  frontMatter: {
    "sidebarTitle": "Contact"
  }
}, {
  name: "Development",
  route: "/Development",
  frontMatter: {
    "sidebarTitle": "Development"
  }
}, {
  name: "Implementation",
  route: "/Implementation",
  frontMatter: {
    "sidebarTitle": "Implementation"
  }
}, {
  name: "index",
  route: "/",
  frontMatter: {
    "sidebarTitle": "Index"
  }
}, {
  name: "MaxKB",
  route: "/MaxKB",
  frontMatter: {
    "sidebarTitle": "Maxkb"
  }
}, {
  name: "Path",
  route: "/Path",
  frontMatter: {
    "sidebarTitle": "Path"
  }
}, {
  name: "Reference",
  route: "/Reference",
  frontMatter: {
    "sidebarTitle": "Reference"
  }
}, {
  name: "Role",
  route: "/Role",
  frontMatter: {
    "sidebarTitle": "Role"
  }
}, {
  name: "Scenario",
  route: "/Scenario",
  frontMatter: {
    "sidebarTitle": "Scenario"
  }
}, {
  name: "Technologies",
  route: "/Technologies",
  frontMatter: {
    "sidebarTitle": "Technologies"
  }
}, {
  name: "Value",
  route: "/Value",
  frontMatter: {
    "sidebarTitle": "Value"
  }
}];