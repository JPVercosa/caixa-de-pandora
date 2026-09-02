import { RUNTIME } from './config/runtime-config.js';
import { authenticate, clearAuthentication, isAuthenticated } from './core/auth.js';
import { createStateStore } from './core/state.js';
import { isReleased } from './core/release.js';
import { renderAccessGate } from './components/access-gate.js';
import { renderHub } from './components/hub.js';
import { MISSIONS, getMission } from './challenges/registry.js';

const root = document.querySelector('#app-root');
const storage = window.localStorage;
const store = createStateStore(storage);

if (RUNTIME.reset) {
  store.reset();
  clearAuthentication(storage);
}

function openContact() {
  window.location.href = RUNTIME.creatorContactUrl;
}

function showHub() {
  renderHub(root, {
    missions: MISSIONS,
    timezone: RUNTIME.timezone,
    isReleased: (unlockAt) => isReleased(unlockAt, RUNTIME.now),
    store,
    assetFor: (id, done = false) => {
      const asset = RUNTIME.magnetAssets[id] ?? RUNTIME.magnetAssets.default;
      if (typeof asset === 'string') {
        return { src: asset, fullBackground: false };
      }
      return {
        src: done ? asset.done ?? asset.default : asset.default,
        fullBackground: asset.fullBackground === true
      };
    },
    showReset: RUNTIME.preview,
    onOpen: openMission,
    onLogout() {
      clearAuthentication(storage);
      showGate();
    },
    onReset() {
      if (window.confirm('Resetar somente o progresso deste dispositivo?')) {
        store.reset();
        showHub();
      }
    }
  });
}

function openMission(id) {
  const mission = getMission(id);
  if (!mission || !mission.implemented || !isReleased(mission.unlockAt, RUNTIME.now)) return;
  mission.mount(root, {
    mission,
    store,
    onBack: showHub,
    onComplete: () => {},
    onContact: openContact
  });
}

function showGate() {
  if (RUNTIME.preview && RUNTIME.skipPassword) {
    showHub();
    return;
  }
  if (isAuthenticated(storage)) {
    showHub();
    return;
  }
  renderAccessGate(root, {
    onSubmit: (password) => authenticate(password, RUNTIME.accessPasswordHash, storage),
    onSuccess: showHub
  });
}

showGate();
