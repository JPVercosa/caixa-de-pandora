const PREFIX = 'pandora.state.';

export function createStateStore(storage) {
  function read(id) {
    try {
      return JSON.parse(storage.getItem(`${PREFIX}${id}`) ?? '{}');
    } catch {
      return {};
    }
  }

  function write(id, value) {
    storage.setItem(`${PREFIX}${id}`, JSON.stringify(value));
  }

  return {
    read,
    write,
    clear(id) {
      storage.removeItem(`${PREFIX}${id}`);
    },
    reset() {
      const keys = [];
      for (let index = 0; index < storage.length; index += 1) {
        const key = storage.key(index);
        if (key?.startsWith(PREFIX)) keys.push(key);
      }
      keys.forEach((key) => storage.removeItem(key));
    }
  };
}
