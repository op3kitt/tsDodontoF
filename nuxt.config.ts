import Config from './class/Config';

export default {
  dev: true,
  server: Config.server,
  env: {
    firebase: Config.firebase,
    bcdiceUrl: Config.bcdiceUrl
  },
  plugins: [
    { src: "~/plugins/persistedstate.ts", ssr: false },
    { src: "~/plugins/firebase.js", ssr: false }
  ],
};