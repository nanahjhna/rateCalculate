import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            // '/api'로 시작하는 요청은 target 주소로 전달됩니다.
            '/api': {
                // 실제 API 서버 주소
                target: 'https://oapi.koreaexim.go.kr',
                // 출처(origin)를 바꾸는 것을 허용
                changeOrigin: true,
                // 요청 경로에서 '/api'를 제거합니다.
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
})