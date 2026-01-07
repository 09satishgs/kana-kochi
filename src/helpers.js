export const updateAtPath = (obj, path, updater) => {
  const keys = path.split(".");
  const clone = structuredClone(obj);

  let ref = clone;
  for (let i = 0; i < keys.length - 1; i++) {
    ref[keys[i]] = ref[keys[i]] || {};
    ref = ref[keys[i]];
  }

  const lastKey = keys[keys.length - 1];
  ref[lastKey] = {
    ...(ref[lastKey] || {}),
    ...updater,
  };

  return clone;
};
export const setlocalStrorageItem = (key, value) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStrorageItem = (key) => {
  if (typeof window === "undefined") return null;
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};
