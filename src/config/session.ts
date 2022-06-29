export const sessionStore = () => {
  return sessionMemoryStore();
};

// 단순 목킹, 로컬에서는 따로 세션 캐쉬를 하지 않는다.
const sessionMemoryStore = () => {
  const get = async (key: string) => {
    return undefined;
  };

  const set = async (key: string, value: any) => {};

  const del = async (key: string) => {};

  return { get, set, del };
};

export default sessionStore;
