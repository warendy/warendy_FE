// src/setupTests.js
import { server } from "./mocks.js";

// Mock Service Worker 시작
beforeAll(() => server.listen());

// 각 테스트마다 추가한 런타임 요청 핸들러 리셋
afterEach(() => server.resetHandlers());

// 테스트가 끝난 후 정리
afterAll(() => server.close());
