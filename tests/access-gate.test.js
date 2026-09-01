import test from 'node:test';
import assert from 'node:assert/strict';
import { renderAccessGate } from '../site/components/access-gate.js';

function createRoot() {
  const form = {
    listeners: {},
    addEventListener(type, handler) {
      this.listeners[type] = handler;
    }
  };
  const input = {
    value: '',
    focused: false,
    selected: false,
    focus() {
      this.focused = true;
    },
    select() {
      this.selected = true;
    }
  };
  const error = { hidden: true, textContent: '' };

  return {
    innerHTML: '',
    querySelector(selector) {
      if (selector === '#access-form') return form;
      if (selector === '#access-password') return input;
      if (selector === '#access-error') return error;
      return null;
    },
    form,
    input,
    error
  };
}

test('abre a tela no sucesso e mostra erro na falha', async () => {
  const root = createRoot();
  let successCount = 0;

  renderAccessGate(root, {
    onSubmit: async (password) => password === 'ok',
    onSuccess: () => {
      successCount += 1;
    }
  });

  root.input.value = 'ok';
  await root.form.listeners.submit({ preventDefault() {} });
  assert.equal(successCount, 1);
  assert.equal(root.error.hidden, true);

  root.input.value = 'errada';
  root.input.selected = false;
  await root.form.listeners.submit({ preventDefault() {} });
  assert.equal(successCount, 1);
  assert.equal(root.error.hidden, false);
  assert.equal(root.error.textContent, 'A senha não abriu este arquivo.');
  assert.equal(root.input.selected, true);
});