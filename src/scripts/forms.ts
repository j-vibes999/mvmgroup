// Forms: prefill from links (?service=, ?brand=, ?type=, ?tour=), validation
// messages in the page language, and a double-submit guard.
export function bindForms(root: ParentNode = document) {
  const params = new URLSearchParams(location.search);
  root.querySelectorAll<HTMLFormElement>('form[data-form]').forEach((form) => {
    if (form.dataset.bound) return;
    form.dataset.bound = '1';
    const msgs = {
      required: form.dataset.msgRequired || '',
      email: form.dataset.msgEmail || '',
      choice: form.dataset.msgChoice || '',
      consent: form.dataset.msgConsent || '',
    };

    for (const key of ['service', 'brand', 'type', 'interest']) {
      const value = params.get(key);
      if (!value) continue;
      form.querySelectorAll<HTMLInputElement | HTMLSelectElement>(`[data-prefill="${key}"]`).forEach((input) => {
        if (input instanceof HTMLSelectElement) {
          if ([...input.options].some((o) => o.value === value)) input.value = value;
        } else if (input.value === value) input.checked = true;
      });
    }
    const tour = params.get('tour');
    const box = form.querySelector<HTMLTextAreaElement>('textarea[name="details"], textarea[name="message"]');
    if (tour && box && !box.value) box.value = `${tour}\n`;
    const pageField = form.querySelector<HTMLInputElement>('input[name="page"]');
    if (pageField) pageField.value = location.href;

    const setError = (field: Element | null, message: string) => {
      if (!field) return;
      field.classList.toggle('has-error', !!message);
      let err = field.querySelector<HTMLElement>('.field__error');
      if (!err && message) {
        err = document.createElement('p');
        err.className = 'field__error';
        err.id = `err-${Math.random().toString(36).slice(2, 8)}`;
        field.appendChild(err);
      }
      if (!err) return;
      err.textContent = message;
      err.hidden = !message;
      const control = field.querySelector('input, select, textarea');
      if (control) {
        if (message) {
          control.setAttribute('aria-invalid', 'true');
          control.setAttribute('aria-describedby', err.id);
        } else control.removeAttribute('aria-invalid');
      }
    };

    const validate = () => {
      let first: HTMLElement | null = null;
      form.querySelectorAll('.field').forEach((field) => {
        const control = field.querySelector<HTMLInputElement>('input:not([type=checkbox]):not([type=radio]), select, textarea');
        if (!control) return;
        const value = (control.value || '').trim();
        let message = '';
        if (control.required && !value) message = msgs.required;
        else if (control.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = msgs.email;
        setError(field, message);
        if (message && !first) first = control;
      });
      form.querySelectorAll('[data-required-group]').forEach((group) => {
        const checked = group.querySelectorAll('input:checked').length > 0;
        setError(group, checked ? '' : msgs.choice);
        if (!checked && !first) first = group.querySelector('input');
      });
      form.querySelectorAll('[data-consent]').forEach((wrap) => {
        const cb = wrap.querySelector<HTMLInputElement>('input');
        const ok = !!cb?.checked;
        setError(wrap, ok ? '' : msgs.consent);
        if (!ok && !first) first = cb;
      });
      return first as HTMLElement | null;
    };

    form.setAttribute('novalidate', '');
    form.addEventListener('submit', (e) => {
      const invalid = validate();
      if (invalid) {
        e.preventDefault();
        e.stopImmediatePropagation();
        invalid.focus();
        return;
      }
      const button = form.querySelector<HTMLButtonElement>('button[type=submit]');
      if (button) {
        button.disabled = true;
        button.textContent = form.dataset.msgSending || button.textContent;
      }
    });
    form.addEventListener('change', (e) => {
      const field = (e.target as Element).closest('.field, [data-required-group], [data-consent]');
      if (field?.classList.contains('has-error')) validate();
    });
  });
}
