// vite.config.ts
import { defineApplicationConfig } from "file:///workspaces/task-admin/web/internal/vite-config/dist/index.mjs";
var vite_config_default = defineApplicationConfig({
  overrides: {
    optimizeDeps: {
      include: [
        "echarts/core",
        "echarts/charts",
        "echarts/components",
        "echarts/renderers",
        "qrcode",
        "@iconify/iconify",
        "ant-design-vue/es/locale/zh_CN",
        "ant-design-vue/es/locale/en_US"
      ]
    },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:8000",
          changeOrigin: true,
          ws: true
          // rewrite: (path) => path.replace(new RegExp(`^/api`), ''),
          // only https
          // secure: false
        },
        "/basic-api": {
          target: "http://localhost:3000",
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/basic-api`), "")
          // only https
          // secure: false
        },
        "/upload": {
          target: "http://localhost:3300/upload",
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/upload`), "")
        }
      },
      warmup: {
        clientFiles: ["./index.html", "./src/{views,components}/*"]
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvd29ya3NwYWNlcy90YXNrLWFkbWluL3dlYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3dvcmtzcGFjZXMvdGFzay1hZG1pbi93ZWIvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL3dvcmtzcGFjZXMvdGFzay1hZG1pbi93ZWIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVBcHBsaWNhdGlvbkNvbmZpZyB9IGZyb20gJ0B2YmVuL3ZpdGUtY29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQXBwbGljYXRpb25Db25maWcoe1xuICBvdmVycmlkZXM6IHtcbiAgICBvcHRpbWl6ZURlcHM6IHtcbiAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgJ2VjaGFydHMvY29yZScsXG4gICAgICAgICdlY2hhcnRzL2NoYXJ0cycsXG4gICAgICAgICdlY2hhcnRzL2NvbXBvbmVudHMnLFxuICAgICAgICAnZWNoYXJ0cy9yZW5kZXJlcnMnLFxuICAgICAgICAncXJjb2RlJyxcbiAgICAgICAgJ0BpY29uaWZ5L2ljb25pZnknLFxuICAgICAgICAnYW50LWRlc2lnbi12dWUvZXMvbG9jYWxlL3poX0NOJyxcbiAgICAgICAgJ2FudC1kZXNpZ24tdnVlL2VzL2xvY2FsZS9lbl9VUycsXG4gICAgICBdLFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBwcm94eToge1xuICAgICAgICAnL2FwaSc6IHtcbiAgICAgICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjgwMDAnLFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICB3czogdHJ1ZSxcbiAgICAgICAgICAvLyByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4vYXBpYCksICcnKSxcbiAgICAgICAgICAvLyBvbmx5IGh0dHBzXG4gICAgICAgICAgLy8gc2VjdXJlOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICAnL2Jhc2ljLWFwaSc6IHtcbiAgICAgICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnLFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICB3czogdHJ1ZSxcbiAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4vYmFzaWMtYXBpYCksICcnKSxcbiAgICAgICAgICAvLyBvbmx5IGh0dHBzXG4gICAgICAgICAgLy8gc2VjdXJlOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICAnL3VwbG9hZCc6IHtcbiAgICAgICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjMzMDAvdXBsb2FkJyxcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgICAgd3M6IHRydWUsXG4gICAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZShuZXcgUmVnRXhwKGBeL3VwbG9hZGApLCAnJyksXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgd2FybXVwOiB7XG4gICAgICAgIGNsaWVudEZpbGVzOiBbJy4vaW5kZXguaHRtbCcsICcuL3NyYy97dmlld3MsY29tcG9uZW50c30vKiddLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdRLFNBQVMsK0JBQStCO0FBRXhTLElBQU8sc0JBQVEsd0JBQXdCO0FBQUEsRUFDckMsV0FBVztBQUFBLElBQ1QsY0FBYztBQUFBLE1BQ1osU0FBUztBQUFBLFFBQ1A7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMLFFBQVE7QUFBQSxVQUNOLFFBQVE7QUFBQSxVQUNSLGNBQWM7QUFBQSxVQUNkLElBQUk7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUlOO0FBQUEsUUFDQSxjQUFjO0FBQUEsVUFDWixRQUFRO0FBQUEsVUFDUixjQUFjO0FBQUEsVUFDZCxJQUFJO0FBQUEsVUFDSixTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsSUFBSSxPQUFPLGFBQWEsR0FBRyxFQUFFO0FBQUE7QUFBQTtBQUFBLFFBRy9EO0FBQUEsUUFDQSxXQUFXO0FBQUEsVUFDVCxRQUFRO0FBQUEsVUFDUixjQUFjO0FBQUEsVUFDZCxJQUFJO0FBQUEsVUFDSixTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsSUFBSSxPQUFPLFVBQVUsR0FBRyxFQUFFO0FBQUEsUUFDNUQ7QUFBQSxNQUNGO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixhQUFhLENBQUMsZ0JBQWdCLDRCQUE0QjtBQUFBLE1BQzVEO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
