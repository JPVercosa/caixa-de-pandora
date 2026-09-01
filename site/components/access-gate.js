export function renderAccessGate(root, { onSubmit, onSuccess }) {
  root.innerHTML = `
    <section class="gate card" aria-labelledby="gate-title">
      <div class="eyebrow">ARQUIVO RESTRITO · 01</div>
      <h1 id="gate-title">Caixa de Pandora</h1>
      <p class="lead">Existe uma sequência de entregas esperando o momento certo.</p>
      <form id="access-form" class="stack" novalidate>
        <label for="access-password">Senha de acesso</label>
        <div class="input-row">
          <input id="access-password" name="password" type="password" autocomplete="off" required />
          <button class="button primary" type="submit">Abrir</button>
        </div>
        <p id="access-error" class="form-message" role="alert" hidden></p>
      </form>
    </section>`;

  const form = root.querySelector('#access-form');
  const input = root.querySelector('#access-password');
  const error = root.querySelector('#access-error');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    error.hidden = true;
    try {
      const valid = await onSubmit(input.value);
      if (valid) {
        onSuccess?.();
        return;
      }
      error.textContent = 'A senha não abriu este arquivo.';
      error.hidden = false;
      input.select();
    } catch {
      error.textContent = 'A senha não abriu este arquivo.';
      error.hidden = false;
      input.select();
    }
  });
  input.focus();
}
