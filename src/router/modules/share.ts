const Share = () => import("@/views/share/index.vue");

export default {
  path: "/share",
  name: "Share",
  component: Share,
  meta: {
    icon: "material-symbols:smb-share-outline",
    title: "图片分享",
    rank: 3
  }
} satisfies RouteConfigsTable;
